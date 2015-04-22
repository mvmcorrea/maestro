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

class ArquivoController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $arquivo= new Arquivo($this->data->id);
        $filter->idArquivo = $this->data->idArquivo;
        $this->data->query = $arquivo->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/arquivo/save';
        $this->render();
    }

    public function formObject() {
        $this->data->arquivo = Arquivo::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $arquivo= new Arquivo($this->data->id);
        $this->data->arquivo = $arquivo->getData();
        $this->data->arquivo->idMIMEDesc = $arquivo->getMIME()->getDescription();
	$this->data->arquivo->idUsuarioDesc = $arquivo->getUsuario()->getDescription();
	
        $this->data->action = '@common/arquivo/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $arquivo = new Arquivo($this->data->id);
        $ok = '>common/arquivo/delete/' . $arquivo->getId();
        $cancelar = '>common/arquivo/formObject/' . $arquivo->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Arquivo [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Arquivo();
        $filter->idArquivo = $this->data->idArquivo;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $arquivo = new Arquivo($this->data->arquivo);
            $arquivo->save();
            $go = '>common/arquivo/formObject/' . $arquivo->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $arquivo = new Arquivo($this->data->id);
            $arquivo->delete();
            $go = '>common/arquivo/formFind';
            $this->renderPrompt('information',"Arquivo [{$this->data->idArquivo}] removido.", $go);
    }

}