<?php

class main extends MActionPanel {

    public function __construct() {
        //teste
        parent::__construct('mainPanel','Wizard',NULL, '>main.main');
        $this->addAction('XMI -> Script', 'wizardIconWizard', 'wizard/main/formXMIScript',
              array('text'=>'A partir de um arquivo XMI cria o script referente a uma aplicação.'));
        $this->addAction('Script -> App', 'wizardIconWizard', 'wizard/main/formScript',
              array('text'=>'A partir do script, cria a estrutura básica de uma aplicação CRUD (models, controllers e views.'));
        $this->addAction('XMI -> Class/Map', 'wizardIconWizard', 'wizard/main/formORM',
              array('text'=>'A partir de um arquivo XMI cria os modelos da aplicação (classes e mapas).'));
    }
    
    public function addAction($label, $image, $action,$params = array()) {
        $id = md5($params['text']);
        $link = new MImageLinkLabelAction('', '', $action, $image, $this->iconType, $target);
        $link->addEvent('mouseenter',"manager.getElementById('{$id}_hlayout').style.backgroundColor='#EEE';");
        $link->addEvent('mouseout',"manager.getElementById('{$id}_hlayout').style.backgroundColor='white';");
        $bold = new MLabel($label,'black',true);
        $text = new MLabel($bold->generate() . ': ' . $params['text']);
        $control = new MHContainer($id,array($link,$text));
        $control->setShowLabel(false);
        $class = 'mPanelCell' . ucfirst($this->iconType);
        $link->setClass($class);
        $this->add($control, '', '', '');
    }  

}

