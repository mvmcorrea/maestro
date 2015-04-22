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

class EnderecoController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $endereco= new Endereco($this->data->id);
        $filter->idEndereco = $this->data->idEndereco;
        $this->data->query = $endereco->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/endereco/save';
        $this->render();
    }

    public function formObject() {
        $this->data->endereco = Endereco::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $endereco= new Endereco($this->data->id);
        $this->data->endereco = $endereco->getData();
        $this->data->endereco->idMunicipioDesc = $endereco->getMunicipio()->getDescription();
	
        $this->data->action = '@common/endereco/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $endereco = new Endereco($this->data->id);
        $ok = '>common/endereco/delete/' . $endereco->getId();
        $cancelar = '>common/endereco/formObject/' . $endereco->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Endereco [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Endereco();
        $filter->idEndereco = $this->data->idEndereco;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $endereco = new Endereco($this->data->endereco);
            $endereco->save();
            $go = '>common/endereco/formObject/' . $endereco->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $endereco = new Endereco($this->data->id);
            $endereco->delete();
            $go = '>common/endereco/formFind';
            $this->renderPrompt('information',"Endereco [{$this->data->idEndereco}] removido.", $go);
    }

}