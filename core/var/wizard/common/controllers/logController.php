<?php
/**
 * $_comment
 *
 * @category   Maestro
 * @package    UFJF
 * @subpackage $_package
 * @copyright  Copyright (c) 2003-2012 UFJF (http://www.ufjf.br)
 * @license    http://siga.ufjf.br/license
 * @version    
 * @since      
 */

Manager::import("common\models\*");

class LogController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $log= new Log($this->data->id);
        $filter->idLog = $this->data->idLog;
        $this->data->query = $log->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/log/save';
        $this->render();
    }

    public function formObject() {
        $this->data->log = Log::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $log= new Log($this->data->id);
        $this->data->log = $log->getData();
        $this->data->log->idModuloDesc = $log->getModulo()->getDescription();
	$this->data->log->idUsuarioDesc = $log->getUsuario()->getDescription();
	
        $this->data->action = '@common/log/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $log = new Log($this->data->id);
        $ok = '>common/log/delete/' . $log->getId();
        $cancelar = '>common/log/formObject/' . $log->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Log [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Log();
        $filter->idLog = $this->data->idLog;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $log = new Log($this->data->log);
            $log->save();
            $go = '>common/log/formObject/' . $log->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $log = new Log($this->data->id);
            $log->delete();
            $go = '>common/log/formFind';
            $this->renderPrompt('information',"Log [{$this->data->idLog}] removido.", $go);
    }

}