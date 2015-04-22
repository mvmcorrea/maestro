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

class MunicipioController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $municipio= new Municipio($this->data->id);
        $filter->idMunicipio = $this->data->idMunicipio;
        $this->data->query = $municipio->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/municipio/save';
        $this->render();
    }

    public function formObject() {
        $this->data->municipio = Municipio::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $municipio= new Municipio($this->data->id);
        $this->data->municipio = $municipio->getData();
        $this->data->municipio->idPaisDesc = $municipio->getPais()->getDescription();
	$this->data->municipio->idUFDesc = $municipio->getUF()->getDescription();
	
        $this->data->action = '@common/municipio/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $municipio = new Municipio($this->data->id);
        $ok = '>common/municipio/delete/' . $municipio->getId();
        $cancelar = '>common/municipio/formObject/' . $municipio->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Municipio [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Municipio();
        $filter->idMunicipio = $this->data->idMunicipio;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $municipio = new Municipio($this->data->municipio);
            $municipio->save();
            $go = '>common/municipio/formObject/' . $municipio->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $municipio = new Municipio($this->data->id);
            $municipio->delete();
            $go = '>common/municipio/formFind';
            $this->renderPrompt('information',"Municipio [{$this->data->idMunicipio}] removido.", $go);
    }

}