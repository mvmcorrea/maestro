<?php

class MainMenu extends MTree {

    public function __construct(){
        parent::__construct('wizardMainMenu');
        
        $array = array(
            array(0, 'Menu', 'wizard/main', 'root'),
            array(1, 'XMI >> Script', 'main/formXMIScript', 0),
            array(2, 'MySql >> Script', 'main/formScript', 0),
            array(3, 'Script >> App', 'main/formScript', 0),

        );

        $this->setItemsFromArray($array);

    }
}
?>
