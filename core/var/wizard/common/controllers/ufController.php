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

class UfController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $uf= new Uf($this->data->id);
        $filter->idUF = $this->data->idUF;
        $this->data->query = $uf->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/uf/save';
        $this->render();
    }

    public function formObject() {
        $this->data->uf = Uf::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $uf= new Uf($this->data->id);
        $this->data->uf = $uf->getData();
        
        $this->data->action = '@common/uf/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $uf = new Uf($this->data->id);
        $ok = '>common/uf/delete/' . $uf->getId();
        $cancelar = '>common/uf/formObject/' . $uf->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Uf [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Uf();
        $filter->idUF = $this->data->idUF;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $uf = new Uf($this->data->uf);
            $uf->save();
            $go = '>common/uf/formObject/' . $uf->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $uf = new Uf($this->data->id);
            $uf->delete();
            $go = '>common/uf/formFind';
            $this->renderPrompt('information',"Uf [{$this->data->idUF}] removido.", $go);
    }

}