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

class SetorController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $setor= new Setor($this->data->id);
        $filter->idSetor = $this->data->idSetor;
        $this->data->query = $setor->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/setor/save';
        $this->render();
    }

    public function formObject() {
        $this->data->setor = Setor::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $setor= new Setor($this->data->id);
        $this->data->setor = $setor->getData();
        $this->data->setor->idTipoSetorDesc = $setor->getTipoSetor()->getDescription();
	
        $this->data->action = '@common/setor/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $setor = new Setor($this->data->id);
        $ok = '>common/setor/delete/' . $setor->getId();
        $cancelar = '>common/setor/formObject/' . $setor->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Setor [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Setor();
        $filter->idSetor = $this->data->idSetor;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $setor = new Setor($this->data->setor);
            $setor->save();
            $go = '>common/setor/formObject/' . $setor->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $setor = new Setor($this->data->id);
            $setor->delete();
            $go = '>common/setor/formFind';
            $this->renderPrompt('information',"Setor [{$this->data->idSetor}] removido.", $go);
    }

}