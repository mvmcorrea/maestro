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

class DocumentacaoController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $documentacao= new Documentacao($this->data->id);
        $filter->idDocumentacao = $this->data->idDocumentacao;
        $this->data->query = $documentacao->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/documentacao/save';
        $this->render();
    }

    public function formObject() {
        $this->data->documentacao = Documentacao::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $documentacao= new Documentacao($this->data->id);
        $this->data->documentacao = $documentacao->getData();
        $this->data->documentacao->idBancoPISPASEPDesc = $documentacao->getBancoPISPASEP()->getDescription();
	
        $this->data->action = '@common/documentacao/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $documentacao = new Documentacao($this->data->id);
        $ok = '>common/documentacao/delete/' . $documentacao->getId();
        $cancelar = '>common/documentacao/formObject/' . $documentacao->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Documentacao [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Documentacao();
        $filter->idDocumentacao = $this->data->idDocumentacao;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $documentacao = new Documentacao($this->data->documentacao);
            $documentacao->save();
            $go = '>common/documentacao/formObject/' . $documentacao->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $documentacao = new Documentacao($this->data->id);
            $documentacao->delete();
            $go = '>common/documentacao/formFind';
            $this->renderPrompt('information',"Documentacao [{$this->data->idDocumentacao}] removido.", $go);
    }

}