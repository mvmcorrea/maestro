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

class DependenciaController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $dependencia= new Dependencia($this->data->id);
        $filter->idDependencia = $this->data->idDependencia;
        $this->data->query = $dependencia->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/dependencia/save';
        $this->render();
    }

    public function formObject() {
        $this->data->dependencia = Dependencia::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $dependencia= new Dependencia($this->data->id);
        $this->data->dependencia = $dependencia->getData();
        $this->data->dependencia->idTipoDependenciaDesc = $dependencia->getTipoDependencia()->getDescription();
	$this->data->dependencia->idSetorDesc = $dependencia->getSetor()->getDescription();
	
        $this->data->action = '@common/dependencia/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $dependencia = new Dependencia($this->data->id);
        $ok = '>common/dependencia/delete/' . $dependencia->getId();
        $cancelar = '>common/dependencia/formObject/' . $dependencia->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Dependencia [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Dependencia();
        $filter->idDependencia = $this->data->idDependencia;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $dependencia = new Dependencia($this->data->dependencia);
            $dependencia->save();
            $go = '>common/dependencia/formObject/' . $dependencia->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $dependencia = new Dependencia($this->data->id);
            $dependencia->delete();
            $go = '>common/dependencia/formFind';
            $this->renderPrompt('information',"Dependencia [{$this->data->idDependencia}] removido.", $go);
    }

}