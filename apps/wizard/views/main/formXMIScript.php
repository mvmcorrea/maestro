<?php

class formXMIScript extends MFormBase {

    public function __construct() {
        parent::__construct('XMI Script Wizard', '>wizard/main');
    }

    public function createFields() {

        $fields = array(
            new MTextField('xmi', '', 'XMI File', '30', 'inside files/xmi'),
            new MTextField('app', '', 'App', '30','A app que o script pertence (abaixo do maestro/apps)'),
            new MTextField('module', '', 'Module', '30','O módulo da app (abaixo de maestro/apps/nomedaapp/modules)'),
            new MTextField('database', '', 'Database', '30','O nome do banco de dados'),
            new MTextField('package', '', 'Package', '30','O Package que você deseja gerar o Script. Algo como "Bolsa_Classes", "Adm_Classes", etc '),
        );
        $this->setFields($fields);

        $buttons = array(
            new MButton('btnPost', 'Generate', '@wizard/main/createXMIScript')
        );
        $this->setButtons($buttons);
    }

}

?>
