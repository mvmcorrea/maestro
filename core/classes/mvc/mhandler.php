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

/**
 * Brief Class Description.
 * Complete Class Description.
 */
class MHandler extends MController {

    /** 
     * Define the constants to be used
     * to indicate the $formMode
     */
    const FORM_MODE_WHOLE_ROW  = 0;
    const FORM_MODE_SHOW_SIDE  = 1;
    const FORM_MODE_SHOW_ABOVE = 2;
    const FORM_MODE_SHOW_NBSP  = 3;    
    /**
     * Attribute Description.
     */
    protected $module;

    /**
     * Attribute Description.
     */
    protected $path;

    /**
     * Attribute Description.
     */
    protected $theme;
    protected $manager;
    protected $data;

    public function init(){
        $action = Manager::getContext()->getAction();
        Manager::checkLogin(($action != 'main'));
    }

    public function renderHandler() {
        $view = Manager::getView($this->getApplication(), $this->getModule(), 'handler', $this->getAction());
        $page = Manager::getPage();
        if ($go = $page->redirectTo) {
            //mdump('redirecting: ' . $go);
            $this->setResult(new MRedirect($view, $go));
        } else if ($window = $page->window) {
            $this->setResult(new MBrowserWindow());
        } else if ($binary = $page->binary) {
            //mdump('binary: ' . $binary);
            $this->setResult(new MRenderBinary($binary));
        } else if ($download = $page->download) {
            //mdump('download: ' . $download);
            $this->setResult(new MRenderBinary($download, false));
        } else if ($prompt = $page->prompt) {
            $page->clearContent();
            parent::renderPrompt($prompt);
        } else {
            if (Manager::isAjaxCall()) {
                //mdump('mhandler:: renderjson');
                $render = new MRenderJSON();
                if (!$this->getResult()){
                    $this->setResult($render);
                }
            } else {
                //mdump('mhandler:: renderpage');
                $render = new MRenderPage();
                if (!$this->getResult()){
                    $this->setResult($render);
                }
            }
        }
    }

    public function dispatch($handler, $data) {
        //mdump("Handler:dispatch: [$handler]");
        $this->theme = new MTheme();
        $this->manager = Manager::getInstance();
        $module = Manager::getModule();
        //mdump("Handler:dispatch: [$module][$handler]");
        $this->invokeHandler($module, $handler);
        if (!$this->getResult()){
            $this->renderHandler();
        }    
    }

    public function invokeHandler($m, $handler) {
        global $context, $module, $action, $item, $session, $page, $auth, $perms, $navbar, $theme, $history, $self, $url;
        
        if ($handler == ''){
            return false;
        }

        //$this->data = $data;
        $this->action = $handler;

        $app = Manager::getApp();
        if (($m == '') || ($m == $app)) {
            $module = $app;
            $path = Manager::getAppPath() . '/controllers/';
        } else {
            $module = $m;
            $path = Manager::getModulePath($module, 'controllers/');
        }    
        //mdump("Handler:invokeHandler: [$module][$handler]");

        $context = Manager::getContext();
        $action = $context->getAction();
        $self = $context->getAction();
        $item = mrequest('item');
        $session = Manager::getSession();
        $navbar = new MNavigationBar();

        //$view = Manager::getView($module, 'handler', $action);

        $page = $this->theme;
        $url = Manager::getCurrentURL();
        $auth = Manager::getAuth();
        $perms = Manager::getPerms();
        $theme = $this->theme;

        $file = $path . $handler . '.inc.php';
        //mdump('Handler:invokeHandler: file : ' . $file);
        if ($return = file_exists($file)) {
            include ($file);
        }
        return $return;
    }

}

?>
