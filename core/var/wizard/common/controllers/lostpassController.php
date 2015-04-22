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

class LostpassController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $lostpass= new Lostpass($this->data->id);
        $filter->idPass = $this->data->idPass;
        $this->data->query = $lostpass->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/lostpass/save';
        $this->render();
    }

    public function formObject() {
        $this->data->lostpass = Lostpass::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $lostpass= new Lostpass($this->data->id);
        $this->data->lostpass = $lostpass->getData();
        $this->data->lostpass->idUsuarioDesc = $lostpass->getUsuario()->getDescription();
	
        $this->data->action = '@common/lostpass/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $lostpass = new Lostpass($this->data->id);
        $ok = '>common/lostpass/delete/' . $lostpass->getId();
        $cancelar = '>common/lostpass/formObject/' . $lostpass->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Lostpass [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Lostpass();
        $filter->idPass = $this->data->idPass;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $lostpass = new Lostpass($this->data->lostpass);
            $lostpass->save();
            $go = '>common/lostpass/formObject/' . $lostpass->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $lostpass = new Lostpass($this->data->id);
            $lostpass->delete();
            $go = '>common/lostpass/formFind';
            $this->renderPrompt('information',"Lostpass [{$this->data->idPass}] removido.", $go);
    }

}