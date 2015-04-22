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

class InstituicaoController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $instituicao= new Instituicao($this->data->id);
        $filter->idInstituicao = $this->data->idInstituicao;
        $this->data->query = $instituicao->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/instituicao/save';
        $this->render();
    }

    public function formObject() {
        $this->data->instituicao = Instituicao::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $instituicao= new Instituicao($this->data->id);
        $this->data->instituicao = $instituicao->getData();
        $this->data->instituicao->idPessoaDesc = $instituicao->getPessoa()->getDescription();
	$this->data->instituicao->idEnderecoDesc = $instituicao->getEndereco()->getDescription();
	
        $this->data->action = '@common/instituicao/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $instituicao = new Instituicao($this->data->id);
        $ok = '>common/instituicao/delete/' . $instituicao->getId();
        $cancelar = '>common/instituicao/formObject/' . $instituicao->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Instituicao [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Instituicao();
        $filter->idInstituicao = $this->data->idInstituicao;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $instituicao = new Instituicao($this->data->instituicao);
            $instituicao->save();
            $go = '>common/instituicao/formObject/' . $instituicao->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $instituicao = new Instituicao($this->data->id);
            $instituicao->delete();
            $go = '>common/instituicao/formFind';
            $this->renderPrompt('information',"Instituicao [{$this->data->idInstituicao}] removido.", $go);
    }

}