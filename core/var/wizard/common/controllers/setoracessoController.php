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

class SetoracessoController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $setoracesso= new Setoracesso($this->data->id);
        $filter->idSetorAcesso = $this->data->idSetorAcesso;
        $this->data->query = $setoracesso->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/setoracesso/save';
        $this->render();
    }

    public function formObject() {
        $this->data->setoracesso = Setoracesso::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $setoracesso= new Setoracesso($this->data->id);
        $this->data->setoracesso = $setoracesso->getData();
        $this->data->setoracesso->idSetorPaiDesc = $setoracesso->getSetorPai()->getDescription();
	$this->data->setoracesso->idSetorFilhoDesc = $setoracesso->getSetorFilho()->getDescription();
	
        $this->data->action = '@common/setoracesso/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $setoracesso = new Setoracesso($this->data->id);
        $ok = '>common/setoracesso/delete/' . $setoracesso->getId();
        $cancelar = '>common/setoracesso/formObject/' . $setoracesso->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Setoracesso [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Setoracesso();
        $filter->idSetorAcesso = $this->data->idSetorAcesso;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $setoracesso = new Setoracesso($this->data->setoracesso);
            $setoracesso->save();
            $go = '>common/setoracesso/formObject/' . $setoracesso->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $setoracesso = new Setoracesso($this->data->id);
            $setoracesso->delete();
            $go = '>common/setoracesso/formFind';
            $this->renderPrompt('information',"Setoracesso [{$this->data->idSetorAcesso}] removido.", $go);
    }

}