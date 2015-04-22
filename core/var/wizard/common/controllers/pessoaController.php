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

class PessoaController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $pessoa= new Pessoa($this->data->id);
        $filter->idPessoa = $this->data->idPessoa;
        $this->data->query = $pessoa->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/pessoa/save';
        $this->render();
    }

    public function formObject() {
        $this->data->pessoa = Pessoa::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $pessoa= new Pessoa($this->data->id);
        $this->data->pessoa = $pessoa->getData();
        $this->data->pessoa->idFotoDesc = $pessoa->getFoto()->getDescription();
	$this->data->pessoa->idEnderecoDesc = $pessoa->getEndereco()->getDescription();
	$this->data->pessoa->idDocumentacaoDesc = $pessoa->getDocumentacao()->getDescription();
	$this->data->pessoa->idContaCorrenteDesc = $pessoa->getContaCorrente()->getDescription();
	$this->data->pessoa->idMunicipioNascimentoDesc = $pessoa->getMunicipioNascimento()->getDescription();
	$this->data->pessoa->idPaisNacionalidadeDesc = $pessoa->getPaisNacionalidade()->getDescription();
	
        $this->data->action = '@common/pessoa/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $pessoa = new Pessoa($this->data->id);
        $ok = '>common/pessoa/delete/' . $pessoa->getId();
        $cancelar = '>common/pessoa/formObject/' . $pessoa->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Pessoa [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Pessoa();
        $filter->idPessoa = $this->data->idPessoa;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $pessoa = new Pessoa($this->data->pessoa);
            $pessoa->save();
            $go = '>common/pessoa/formObject/' . $pessoa->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $pessoa = new Pessoa($this->data->id);
            $pessoa->delete();
            $go = '>common/pessoa/formFind';
            $this->renderPrompt('information',"Pessoa [{$this->data->idPessoa}] removido.", $go);
    }

}