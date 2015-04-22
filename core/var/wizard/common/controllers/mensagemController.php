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

class MensagemController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $mensagem= new Mensagem($this->data->id);
        $filter->idMensagem = $this->data->idMensagem;
        $this->data->query = $mensagem->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/mensagem/save';
        $this->render();
    }

    public function formObject() {
        $this->data->mensagem = Mensagem::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $mensagem= new Mensagem($this->data->id);
        $this->data->mensagem = $mensagem->getData();
        
        $this->data->action = '@common/mensagem/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $mensagem = new Mensagem($this->data->id);
        $ok = '>common/mensagem/delete/' . $mensagem->getId();
        $cancelar = '>common/mensagem/formObject/' . $mensagem->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Mensagem [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Mensagem();
        $filter->idMensagem = $this->data->idMensagem;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $mensagem = new Mensagem($this->data->mensagem);
            $mensagem->save();
            $go = '>common/mensagem/formObject/' . $mensagem->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $mensagem = new Mensagem($this->data->id);
            $mensagem->delete();
            $go = '>common/mensagem/formFind';
            $this->renderPrompt('information',"Mensagem [{$this->data->idMensagem}] removido.", $go);
    }

}