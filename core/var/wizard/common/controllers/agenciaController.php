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

class AgenciaController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $agencia= new Agencia($this->data->id);
        $filter->idAgencia = $this->data->idAgencia;
        $this->data->query = $agencia->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/agencia/save';
        $this->render();
    }

    public function formObject() {
        $this->data->agencia = Agencia::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $agencia= new Agencia($this->data->id);
        $this->data->agencia = $agencia->getData();
        $this->data->agencia->idBancoDesc = $agencia->getBanco()->getDescription();
	
        $this->data->action = '@common/agencia/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $agencia = new Agencia($this->data->id);
        $ok = '>common/agencia/delete/' . $agencia->getId();
        $cancelar = '>common/agencia/formObject/' . $agencia->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Agencia [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Agencia();
        $filter->idAgencia = $this->data->idAgencia;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $agencia = new Agencia($this->data->agencia);
            $agencia->save();
            $go = '>common/agencia/formObject/' . $agencia->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $agencia = new Agencia($this->data->id);
            $agencia->delete();
            $go = '>common/agencia/formFind';
            $this->renderPrompt('information',"Agencia [{$this->data->idAgencia}] removido.", $go);
    }

}