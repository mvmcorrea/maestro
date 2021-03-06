<?php
/* Copyright [2011, 2012, 2013] da Universidade Federal de Juiz de Fora
 * Este arquivo é parte do programa Framework Maestro.
 * O Framework Maestro é um software livre; você pode redistribuí-lo e/ou 
 * modificá-lo dentro dos termos da Licença Pública Geral GNU como publicada 
 * pela Fundação do Software Livre (FSF); na versão 2 da Licença.
 * Este programa é distribuído na esperança que possa ser  útil, 
 * mas SEM NENHUMA GARANTIA; sem uma garantia implícita de ADEQUAÇÃO a qualquer
 * MERCADO ou APLICAÇÃO EM PARTICULAR. Veja a Licença Pública Geral GNU/GPL 
 * em português para maiores detalhes.
 * Você deve ter recebido uma cópia da Licença Pública Geral GNU, sob o título
 * "LICENCA.txt", junto com este programa, se não, acesse o Portal do Software
 * Público Brasileiro no endereço www.softwarepublico.gov.br ou escreva para a 
 * Fundação do Software Livre(FSF) Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301, USA.
 */

class MInternalError extends MResult {

    protected $exception;

    public function __construct($exception = NULL) {
        parent::__construct();
        $this->exception = $exception;
    }

    public function apply($request, $response) {
        $response->status = MStatusCode::INTERNAL_ERROR;
        $format = $request->format;
        $response->setContentType($response->getMimeType("xx." + format));
        $this->tracestack = str_replace('#', '<br>#', $this->exception->trace);
        $errorHtml = "Not found";
        try {
            $template = new MTemplate();
            $template->context('result', $this->exception);
            $language = Manager::getOptions('language');
            $errorHtml = $template->fetch("errors/{$language}/" . $response->status . "." . ($format == null ? "html" : $format));
            if ($request->isAjax() && ($format == "html")) {
                if ($this->ajax->isEmpty()) {
                    $this->ajax->setId('error');
                    $this->ajax->setType('page');
                    $this->ajax->setData($errorHtml);
                }
                $response->out = $this->ajax->returnData();
            } else {
                $response->out = $errorHtml;
            }
        } catch (Exception $e) {
            throw new EMException($e);
        }
    }

}

?>