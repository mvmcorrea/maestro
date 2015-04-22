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

class FotoController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $foto= new Foto($this->data->id);
        $filter->idFoto = $this->data->idFoto;
        $this->data->query = $foto->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/foto/save';
        $this->render();
    }

    public function formObject() {
        $this->data->foto = Foto::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $foto= new Foto($this->data->id);
        $this->data->foto = $foto->getData();
        $this->data->foto->idMIMEDesc = $foto->getMIME()->getDescription();
	
        $this->data->action = '@common/foto/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $foto = new Foto($this->data->id);
        $ok = '>common/foto/delete/' . $foto->getId();
        $cancelar = '>common/foto/formObject/' . $foto->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Foto [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Foto();
        $filter->idFoto = $this->data->idFoto;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $foto = new Foto($this->data->foto);
            $foto->save();
            $go = '>common/foto/formObject/' . $foto->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $foto = new Foto($this->data->id);
            $foto->delete();
            $go = '>common/foto/formFind';
            $this->renderPrompt('information',"Foto [{$this->data->idFoto}] removido.", $go);
    }

}