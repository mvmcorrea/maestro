<?php

class MainController extends MController {

    public function main() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/starter-template/starter-template.css";
        $this->render();
    }
}