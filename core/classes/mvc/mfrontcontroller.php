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
class MFrontController {

    static private $instance = NULL;
    public $context;
    public $response;
    public $dumpping;
    public $conf;
    public $startup;
    public $forward;
    public $result;
    public $canCallHandler;
    public $controller;
    public $controllerAction;
    public $filters;

    public function __construct() {
        Manager::logMessage('[RESET_LOG_MESSAGES]');
        Manager::logMessage('[FrontController::construct]');
        $this->request = new MRequest();
        $this->response = new MResponse();
        $this->result = NULL;
        $this->conf = Manager::$conf;
    }

    public static function getInstance() {
        if (self::$instance == NULL) {
            self::$instance = new MFrontController();
        }
        return self::$instance;
    }

    public function handlerRequest($data = NULL) {
        try {
            $this->context = new MContext($this->request);
            Manager::getInstance()->baseURL = $this->request->getBaseURL(false);
            $app = $this->context->app;
            Manager::getInstance()->app = $app;
            $appPath = $this->context->isCore ? Manager::getInstance()->coreAppsPath : Manager::getInstance()->appsPath;
            Manager::getInstance()->appPath = $appPath . '/' . $app;
            $this->removeInputSlashes();
            $this->setData($data ? : $_REQUEST);
            mtrace('DTO Data:');
            mtrace($this->getData());
            $this->loadExtensions();
            $this->init();
            do {
                $this->prepare();
                $this->handler();
            } while ($this->forward != '');
            $this->terminate();
        } catch (ENotFoundException $e) {
            $this->result = new MNotFound($e->getMessage());
        } catch (ESecurityException $e) {
            $this->result = new MInternalError($e);
        } catch (ETimeOutException $e) {
            $this->result = new MInternalError($e);
        } catch (ERuntimeException $e) {
            $this->result = new MRunTimeError($e);
        } catch (EMException $e) {
            $this->result = new MInternalError($e);
        } catch (Exception $e) {
            $this->result = new MInternalError($e);
        }
    }

    public function handlerResponse($return = false) {
        Manager::getSession()->freeze();
        return $this->response->sendResponse($this->result, $return);
    }

    public function setData($value) {
        $data = new stdClass();
        // se for o $_REQUEST, converte para objeto
        $valid = (is_object($value)) || (is_array($value) && count($value));
        if ($valid) {
            foreach ($value as $name => $value) {
                if (strpos($name, '::') !== false) {
                    list($obj, $name) = explode('::', $name);
                    $data->{$obj}->{$name} = $value;
                } else {
                    $data->{$name} = $value;
                }
                if (strpos($name, '__VIEWSTATE') !== false) {
                    $var = str_replace('__VIEWSTATE', '', $name);
                    $state = new MState($var);
                    $state->loadViewState();
                }
            }
        }
        Manager::setData($data);
    }

    public function getData() {
        return Manager::getData();
    }

    public function setResult($result) {
        $this->result = $result;
    }

    public function getResult() {
        return $this->result;
    }

    public function getContext() {
        return $this->context;
    }

    public function getController() {
        return $this->controller;
    }

    public function getAction() {
        return str_replace('.', '/', $this->controllerAction);
    }

    public function setForward($action) {
        $this->forward = $action;
    }

    public function init() {
        $this->dumpping = Manager::getOptions('dump');
        // if it is a AJAX call, initialize MAjax
        if (Manager::isAjaxCall()) {
            Manager::$ajax = new MAjax();
            Manager::$ajax->initialize(Manager::getOptions('charset'));
        }
        $this->addApplicationConf();
        $this->addApplicationActions();
        $this->addApplicationMessages();
        Manager::getPage();
        $this->controllerAction = '';
        $this->forward = '';
    }

    public function prepare() {
        Manager::registerAutoloader(Manager::getApp(), Manager::getAppPath() . '/..');
        Manager::addAutoloadPath(Manager::getAppPath() . '/components');
        // register MAD module, if it exists...
        $mad = Manager::getMAD();
        if ($mad != '') {
            Manager::registerAutoloader($mad, Manager::getAppPath() . '/modules/');
        }
        // registra os modulos indicados em conf.php
        $registerModules = Manager::getConf('import.modules');
        if (is_array($registerModules)) {
            foreach ($registerModules as $module) {
                Manager::registerAutoloader($module, Manager::getAppPath() . '/modules/');
                Manager::addAutoloadPath(Manager::getAppPath() . "/modules/{$module}/components");
            }
        }
        // registra a existencia de filtros
        $registerFilters = Manager::getConf('filters');
        if (is_array($registerFilters)) {
            Manager::addAutoloadPath(Manager::getAppPath() . "/filters");
        }
        $module = $this->context->getModule();
        if ($module != '') {
            // getting the module conf.php
            $this->addModuleConf($module);
            // getting the modules's messages
            $this->addModuleMessages($module);
            Manager::registerAutoloader($module, Manager::getAppPath() . '/modules/');
            Manager::addAutoloadPath(Manager::getAppPath() . "/modules/{$module}/components");
        }
        $this->controllerAction = $this->forward ? : '';
        $this->forward = '';
        $this->canCallHandler(true);
    }

    public function canCallHandler($status = true) {
        if (func_num_args()) {
            $this->canCallHandler = $status;
        } else {
            return $this->canCallHandler;
        }
    }

    public function handler() {
        $confFilters = Manager::getConf('filters');
        $this->filters = array();
        if (is_array($confFilters)) {
            foreach ($confFilters as $filter) {
                $filterClass = $filter . 'Filter';
                $this->filters[$filterClass] = new $filterClass($this);
                $this->filters[$filterClass]->preProcess();
            }
        }
        if ($this->canCallHandler()) {
            // chama o handler adequado de acordo com o tipo de URL (controller, service ou component)
            $handler = 'handler' . $this->context->getType();
            $this->$handler();
        }
        // executa o pos-processamento dos filtros indicados em conf.php
        foreach ($this->filters as $filter) {
            $filter->postProcess();
        }
    }

    // Controller

    public function handlerController() {
        if ($this->controllerAction == '') {
            $this->controllerAction = $this->context->getControllerAction();
        }
        mtrace('handler controllerAction=' . $this->controllerAction);
        $this->invokeController(Manager::getApp(), Manager::getModule(), $this->controllerAction);
    }

    public function invokeController($app, $module, $controllerAction) {
        Manager::logMessage("[FrontController::invokeController {$app}:{$module}:$controllerAction]");
        list($class, $action) = explode('.', $controllerAction);
        $this->controller = $controller = Manager::getController($app, $module, $class);
        $controller->setParams($this->getData());
        $controller->setData();
        $controller->init();
        $controller->dispatch($action);
    }

    // Service

    public function handlerService() {
        if ($this->controllerAction == '') {
            $this->controllerAction = $this->context->getService() . '.' . $this->context->getAction();
        }
        mtrace('handler serviceAction=' . $this->controllerAction);
        $this->invokeService(Manager::getApp(), Manager::getModule(), $this->controllerAction);
    }

    public function invokeService($app, $module, $controllerAction) {
        Manager::logMessage("[FrontController::invokeService {$app}:{$module}:$controllerAction]");
        list($class, $action) = explode('.', $controllerAction);
        $this->controller = $controller = Manager::getService($app, $module, $class);
        $controller->setParams($this->getData());
        $controller->setData();
        $controller->init();
        $controller->dispatch($action);
    }

    // Component

    public function handlerComponent() {
        $module = $this->context->getModule();
        $component = $this->context->getComponent();
        mtrace('handler component=' . $component);
        $fileName = $component . '.php';
        $file = Manager::getAppPath('components/' . $fileName, $module);
        $mlabelTemporario = new MFieldLabel(); // remover esta linha
        if (file_exists($file)) {
            include_once($file);
            $control = new $component;
            $action = $this->context->getAction();
            if ($action) {
                $content = $control->$action();
            } else {
                $content = $control->generate();
            }
            Manager::getPage()->setContent($content);
            if (Manager::isAjaxCall()) {
                $this->setResult(new MRenderJSON());
            } else {
                $this->setResult(new MRenderPage());
            }
        } else {
            throw new ERunTimeException(_M("App: [{$this->context->app}], Module: [{$this->context->module}], Component: [{$component}] not found!"));
        }
    }

    //

    public function terminate() {
        $controllers = Manager::getControllers();
        if (count($controllers)) {
            foreach ($controllers as $controller) {
                //$controller->finally();
            }
        }
    }

    public function addApplicationConf() {
        $configFile = Manager::getAppPath('conf/conf.php');
        Manager::loadConf($configFile);
    }

    public function addApplicationMessages() {
        $msgDir = Manager::getAppPath('conf/');
        Manager::$msg->addMessages($msgDir);
    }

    public function addApplicationActions() {
        $actionsFile = Manager::getAppPath('conf/actions.php');
        Manager::loadActions($actionsFile);
    }

    public function addModuleConf($module) {
        $configFile = Manager::getModulePath($module, 'conf/conf.php');
        Manager::loadConf($configFile);
    }

    public function addModuleMessages($module) {
        $msgDir = Manager::getModulePath($module, 'conf/');
        Manager::$msg->addMessages($msgDir);
    }

    public function loadExtensions() {
        $dir = Manager::getHome() . '/extensions/';
        $extensions = Manager::$conf['extensions'];
        for ($i = 0; $i < count($extensions); $i++) {
            $register = $dir . '/' . $extensions[$i] . '/manager_register.php';
            include_once($register);
        }
    }

    public static function removeInputSlashesValue($value) {
        if (is_array($value)) {
            return array_map(array('MFrontController', 'removeInputSlashesValue'), $value);
        }
        return stripslashes($value);
    }

    public function removeInputSlashes() {
        if (get_magic_quotes_gpc()) { // Yes? Strip the added slashes
            $_REQUEST = array_map(array('MFrontController', 'removeInputSlashesValue'), $_REQUEST);
        }
    }

}

?>