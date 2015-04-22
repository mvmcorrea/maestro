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

class AcessoController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $acesso= new Acesso($this->data->id);
        $filter->idAcesso = $this->data->idAcesso;
        $this->data->query = $acesso->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/acesso/save';
        $this->render();
    }

    public function formObject() {
        $this->data->acesso = Acesso::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $acesso= new Acesso($this->data->id);
        $this->data->acesso = $acesso->getData();
        $this->data->acesso->idTransacaoDesc = $acesso->getTransacao()->getDescription();
	$this->data->acesso->idGrupoDesc = $acesso->getGrupo()->getDescription();
	
        $this->data->action = '@common/acesso/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $acesso = new Acesso($this->data->id);
        $ok = '>common/acesso/delete/' . $acesso->getId();
        $cancelar = '>common/acesso/formObject/' . $acesso->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Acesso [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Acesso();
        $filter->idAcesso = $this->data->idAcesso;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $acesso = new Acesso($this->data->acesso);
            $acesso->save();
            $go = '>common/acesso/formObject/' . $acesso->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $acesso = new Acesso($this->data->id);
            $acesso->delete();
            $go = '>common/acesso/formFind';
            $this->renderPrompt('information',"Acesso [{$this->data->idAcesso}] removido.", $go);
    }

}