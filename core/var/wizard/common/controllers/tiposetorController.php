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

class TiposetorController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $tiposetor= new Tiposetor($this->data->id);
        $filter->idTipoSetor = $this->data->idTipoSetor;
        $this->data->query = $tiposetor->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/tiposetor/save';
        $this->render();
    }

    public function formObject() {
        $this->data->tiposetor = Tiposetor::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $tiposetor= new Tiposetor($this->data->id);
        $this->data->tiposetor = $tiposetor->getData();
        
        $this->data->action = '@common/tiposetor/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $tiposetor = new Tiposetor($this->data->id);
        $ok = '>common/tiposetor/delete/' . $tiposetor->getId();
        $cancelar = '>common/tiposetor/formObject/' . $tiposetor->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Tiposetor [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Tiposetor();
        $filter->idTipoSetor = $this->data->idTipoSetor;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $tiposetor = new Tiposetor($this->data->tiposetor);
            $tiposetor->save();
            $go = '>common/tiposetor/formObject/' . $tiposetor->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $tiposetor = new Tiposetor($this->data->id);
            $tiposetor->delete();
            $go = '>common/tiposetor/formFind';
            $this->renderPrompt('information',"Tiposetor [{$this->data->idTipoSetor}] removido.", $go);
    }

}