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

class BancoController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $banco= new Banco($this->data->id);
        $filter->idBanco = $this->data->idBanco;
        $this->data->query = $banco->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/banco/save';
        $this->render();
    }

    public function formObject() {
        $this->data->banco = Banco::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $banco= new Banco($this->data->id);
        $this->data->banco = $banco->getData();
        
        $this->data->action = '@common/banco/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $banco = new Banco($this->data->id);
        $ok = '>common/banco/delete/' . $banco->getId();
        $cancelar = '>common/banco/formObject/' . $banco->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Banco [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Banco();
        $filter->idBanco = $this->data->idBanco;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $banco = new Banco($this->data->banco);
            $banco->save();
            $go = '>common/banco/formObject/' . $banco->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $banco = new Banco($this->data->id);
            $banco->delete();
            $go = '>common/banco/formFind';
            $this->renderPrompt('information',"Banco [{$this->data->idBanco}] removido.", $go);
    }

}