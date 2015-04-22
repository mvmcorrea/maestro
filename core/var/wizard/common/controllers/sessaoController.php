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

class SessaoController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $sessao= new Sessao($this->data->id);
        $filter->idSessao = $this->data->idSessao;
        $this->data->query = $sessao->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/sessao/save';
        $this->render();
    }

    public function formObject() {
        $this->data->sessao = Sessao::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $sessao= new Sessao($this->data->id);
        $this->data->sessao = $sessao->getData();
        $this->data->sessao->idUsuarioDesc = $sessao->getUsuario()->getDescription();
	
        $this->data->action = '@common/sessao/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $sessao = new Sessao($this->data->id);
        $ok = '>common/sessao/delete/' . $sessao->getId();
        $cancelar = '>common/sessao/formObject/' . $sessao->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Sessao [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Sessao();
        $filter->idSessao = $this->data->idSessao;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $sessao = new Sessao($this->data->sessao);
            $sessao->save();
            $go = '>common/sessao/formObject/' . $sessao->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $sessao = new Sessao($this->data->id);
            $sessao->delete();
            $go = '>common/sessao/formFind';
            $this->renderPrompt('information',"Sessao [{$this->data->idSessao}] removido.", $go);
    }

}