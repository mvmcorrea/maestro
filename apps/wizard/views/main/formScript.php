<?php

class formScript extends MFormBase {

    public function __construct(){
        parent::__construct('Script Wizard', '>wizard/main');
    }

    public function createFields() {

        $fields = array(
            new MTextField('script', '', 'Script File', '30', 'inside files/scripts'),
        );
        $this->setFields($fields);

        $buttons = array(
           new MButton('btnPost','Generate','@wizard/main/createScript')
        );
        $this->setButtons($buttons);

    }
   
}
?>
