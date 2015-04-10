<?php

class ExamplesController extends MController {
    
    public function main() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/starter-template/starter-template.css";
        $this->render();
    }
    
    public function startertemplate() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/starter-template/starter-template.css";
        $this->render();
    }

    public function grid() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/grid/grid.css";
        $this->render();
    }

    public function jumbotron() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/jumbotron/jumbotron.css";
        $this->render();
    }

    public function narrowjumbotron() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/jumbotron-narrow/jumbotron-narrow.css";
        $this->render();
    }

    public function navbar() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/navbar/navbar.css";
        $this->render();
    }

    public function navbarstatictop() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/navbar-static-top/navbar-static-top.css";
        $this->render();
    }

    public function navbarfixedtop() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/navbar-fixed-top/navbar-fixed-top.css";
        $this->render();
    }

    public function signin() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/signin/signin.css";
        $this->render();
    }

    public function stickyfooter() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/sticky-footer/sticky-footer.css";
        $this->render();
    }

    public function stickyfooternavbar() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/sticky-footer-navbar/sticky-footer-navbar.css";
        $this->render();
    }

    public function justifiednav() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/justified-nav/justified-nav.css";
        $this->render();
    }

    public function offcanvas() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/offcanvas/offcanvas.css";
        $this->render();
    }

    public function carousel() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/carousel/carousel.css";
        $this->data->jsFile = Manager::getThemeURL() . "scripts/vendor/holder.js";
        $this->render();
    }

    public function nonresponsive() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/non-responsive/non-responsive.css";
        $this->render();
    }
    public function theme() {
        $this->data->cssFile = Manager::getThemeURL() . "templates/bootstrap-3.0.3/theme/theme.css";
        $this->data->cssTheme = Manager::getThemeURL() . "css/bootstrap-theme.min.css";
        $this->render();
    }
    
}