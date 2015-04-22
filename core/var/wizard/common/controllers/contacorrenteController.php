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

class ContacorrenteController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $contacorrente= new Contacorrente($this->data->id);
        $filter->idContaCorrente = $this->data->idContaCorrente;
        $this->data->query = $contacorrente->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/contacorrente/save';
        $this->render();
    }

    public function formObject() {
        $this->data->contacorrente = Contacorrente::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $contacorrente= new Contacorrente($this->data->id);
        $this->data->contacorrente = $contacorrente->getData();
        $this->data->contacorrente->idAgenciaDesc = $contacorrente->getAgencia()->getDescription();
	
        $this->data->action = '@common/contacorrente/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $contacorrente = new Contacorrente($this->data->id);
        $ok = '>common/contacorrente/delete/' . $contacorrente->getId();
        $cancelar = '>common/contacorrente/formObject/' . $contacorrente->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Contacorrente [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Contacorrente();
        $filter->idContaCorrente = $this->data->idContaCorrente;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $contacorrente = new Contacorrente($this->data->contacorrente);
            $contacorrente->save();
            $go = '>common/contacorrente/formObject/' . $contacorrente->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $contacorrente = new Contacorrente($this->data->id);
            $contacorrente->delete();
            $go = '>common/contacorrente/formFind';
            $this->renderPrompt('information',"Contacorrente [{$this->data->idContaCorrente}] removido.", $go);
    }

}