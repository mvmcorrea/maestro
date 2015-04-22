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

class PaisController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $pais= new Pais($this->data->id);
        $filter->idPais = $this->data->idPais;
        $this->data->query = $pais->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/pais/save';
        $this->render();
    }

    public function formObject() {
        $this->data->pais = Pais::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $pais= new Pais($this->data->id);
        $this->data->pais = $pais->getData();
        
        $this->data->action = '@common/pais/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $pais = new Pais($this->data->id);
        $ok = '>common/pais/delete/' . $pais->getId();
        $cancelar = '>common/pais/formObject/' . $pais->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Pais [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Pais();
        $filter->idPais = $this->data->idPais;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $pais = new Pais($this->data->pais);
            $pais->save();
            $go = '>common/pais/formObject/' . $pais->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $pais = new Pais($this->data->id);
            $pais->delete();
            $go = '>common/pais/formFind';
            $this->renderPrompt('information',"Pais [{$this->data->idPais}] removido.", $go);
    }

}