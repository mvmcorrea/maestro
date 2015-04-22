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

class MimeController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $mime= new Mime($this->data->id);
        $filter->idMIME = $this->data->idMIME;
        $this->data->query = $mime->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/mime/save';
        $this->render();
    }

    public function formObject() {
        $this->data->mime = Mime::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $mime= new Mime($this->data->id);
        $this->data->mime = $mime->getData();
        
        $this->data->action = '@common/mime/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $mime = new Mime($this->data->id);
        $ok = '>common/mime/delete/' . $mime->getId();
        $cancelar = '>common/mime/formObject/' . $mime->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Mime [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Mime();
        $filter->idMIME = $this->data->idMIME;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $mime = new Mime($this->data->mime);
            $mime->save();
            $go = '>common/mime/formObject/' . $mime->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $mime = new Mime($this->data->id);
            $mime->delete();
            $go = '>common/mime/formFind';
            $this->renderPrompt('information',"Mime [{$this->data->idMIME}] removido.", $go);
    }

}