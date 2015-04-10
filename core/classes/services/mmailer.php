<?php

class MMailer extends MService
{


    /**
     * 
     * @param stdClass $params
     * @return \PHPMailer
     */
    public static function getMailer($params = null)
    {
        $mailer = new \PHPMailer();

        $mailer->IsSMTP(); // telling the class to use SMTP
        $mailer->Host = \Manager::getConf('mailer.smtpServer'); // SMTP server
        $mailer->From = \Manager::getConf('mailer.smtpFrom');
        $mailer->FromName = \Manager::getConf('mailer.smtpFromName');
        $mailer->CharSet = 'utf-8';
        $mailer->WordWrap = 100;


        // Caso não esteja no servidor de produção ou não exista destinatário, 
        // o destinatário passa a ser o email configurado no conf
        if (!\Manager::PROD() || !self::hasReceivers($params))
        {
            $params->to = $params->cc = $params->bcc = \Manager::getConf('mailer.smtpTo');
        }


        // Preenche os parametros do mailer. Ver atributos publicos da classe PHPMailer
        self::copyPublicAttributes($params, $mailer);

        $mailer->isHTML($params->isHTML);

        self::__AddAddress($params->to, $mailer);
        self::__AddCC($params->cc, $mailer);
        self::__AddBCC($params->bcc, $mailer);
        self::__AddReplyTo($params->ReplyTo, $mailer);
        
        return $mailer;
    }

    // Preenche os destinatários
    protected static function __AddAddress($to, $mailer) {
        foreach (self::emailListToArray($to) as $address) {
            $mailer->AddAddress($address);
        }
    }

    // Preenche os destinatários com copia
    protected static function __AddCC($cc, $mailer) {
        foreach (self::emailListToArray($cc) as $address) {
            $mailer->AddCC($address);
        }
    }

    // Preenche os destinatários com copia oculta
    protected static function __AddBCC($bcc, $mailer) {
        foreach (self::emailListToArray($bcc) as $address) {
            $mailer->AddBCC($address);
        }
    }

    // Preenche os enderecos de resposta
    protected static function __AddReplyTo($ReplyTo, $mailer) {
        foreach (self::emailListToArray($ReplyTo) as $address) {
            $mailer->AddReplyTo($address);
        }
    }

    protected static function copyPublicAttributes($from, $to)
    {
        $publicFromAttributes = get_object_vars($from);
        $publicToAttributes = get_object_vars($to);

        $commonPublicAttributes = array_intersect_key($publicFromAttributes, $publicToAttributes);

        foreach ($commonPublicAttributes as $attributeName => $attributeValue)
        {
            $to->$attributeName = $attributeValue;
        }
    }


    protected static function hasReceivers($params)
    {
        return !(empty($params->to) && empty($params->cc) && empty($params->bcc));
    }


    protected static function emailListToArray($emailList)
    {
        return (is_array($emailList)) ? $emailList : explode(',', $emailList);
    }


    public static function send($params = null)
    {
        //Faz uma tentativa de envio do email
        $mailer = self::getMailer($params);

        return $mailer->send();
    }

}