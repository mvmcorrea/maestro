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

class TipodependenciaController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $tipodependencia= new Tipodependencia($this->data->id);
        $filter->idTipoDependencia = $this->data->idTipoDependencia;
        $this->data->query = $tipodependencia->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/tipodependencia/save';
        $this->render();
    }

    public function formObject() {
        $this->data->tipodependencia = Tipodependencia::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $tipodependencia= new Tipodependencia($this->data->id);
        $this->data->tipodependencia = $tipodependencia->getData();
        
        $this->data->action = '@common/tipodependencia/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $tipodependencia = new Tipodependencia($this->data->id);
        $ok = '>common/tipodependencia/delete/' . $tipodependencia->getId();
        $cancelar = '>common/tipodependencia/formObject/' . $tipodependencia->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Tipodependencia [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Tipodependencia();
        $filter->idTipoDependencia = $this->data->idTipoDependencia;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $tipodependencia = new Tipodependencia($this->data->tipodependencia);
            $tipodependencia->save();
            $go = '>common/tipodependencia/formObject/' . $tipodependencia->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $tipodependencia = new Tipodependencia($this->data->id);
            $tipodependencia->delete();
            $go = '>common/tipodependencia/formFind';
            $this->renderPrompt('information',"Tipodependencia [{$this->data->idTipoDependencia}] removido.", $go);
    }

}