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

class GrupoController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $grupo= new Grupo($this->data->id);
        $filter->idGrupo = $this->data->idGrupo;
        $this->data->query = $grupo->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/grupo/save';
        $this->render();
    }

    public function formObject() {
        $this->data->grupo = Grupo::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $grupo= new Grupo($this->data->id);
        $this->data->grupo = $grupo->getData();
        $this->data->grupo->idGrupoPaiDesc = $grupo->getGrupoPai()->getDescription();
	
        $this->data->action = '@common/grupo/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $grupo = new Grupo($this->data->id);
        $ok = '>common/grupo/delete/' . $grupo->getId();
        $cancelar = '>common/grupo/formObject/' . $grupo->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Grupo [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Grupo();
        $filter->idGrupo = $this->data->idGrupo;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $grupo = new Grupo($this->data->grupo);
            $grupo->save();
            $go = '>common/grupo/formObject/' . $grupo->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $grupo = new Grupo($this->data->id);
            $grupo->delete();
            $go = '>common/grupo/formFind';
            $this->renderPrompt('information',"Grupo [{$this->data->idGrupo}] removido.", $go);
    }

}