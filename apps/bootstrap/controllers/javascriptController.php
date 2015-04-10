<?php

class JavascriptController extends MController {

    public function main() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/starter-template/starter-template.css";
        $this->render();
    }

    public function modal() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/theme/theme.css";
        $this->render();
    }

    public function scrollspy() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/theme/theme.css";
        $this->render();
    }

    public function tooltips() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/theme/theme.css";
        $this->render();
    }
    
    public function popover() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/theme/theme.css";
        $this->render();
    }
    
    public function alerts() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/theme/theme.css";
        $this->render();
    }
    
    public function collapse() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/theme/theme.css";
        $this->render();
    }

    public function carousel() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/theme/theme.css";
        $this->data->jsFile = Manager::getThemeURL() . "scripts/vendor/holder.js";
        $this->render();
    }

}