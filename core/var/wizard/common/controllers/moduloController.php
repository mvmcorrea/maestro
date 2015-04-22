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

class ModuloController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $modulo= new Modulo($this->data->id);
        $filter->idModulo = $this->data->idModulo;
        $this->data->query = $modulo->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/modulo/save';
        $this->render();
    }

    public function formObject() {
        $this->data->modulo = Modulo::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $modulo= new Modulo($this->data->id);
        $this->data->modulo = $modulo->getData();
        $this->data->modulo->idPessoaDesc = $modulo->getPessoa()->getDescription();
	$this->data->modulo->idPessoa2Desc = $modulo->getPessoa2()->getDescription();
	
        $this->data->action = '@common/modulo/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $modulo = new Modulo($this->data->id);
        $ok = '>common/modulo/delete/' . $modulo->getId();
        $cancelar = '>common/modulo/formObject/' . $modulo->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Modulo [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Modulo();
        $filter->idModulo = $this->data->idModulo;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $modulo = new Modulo($this->data->modulo);
            $modulo->save();
            $go = '>common/modulo/formObject/' . $modulo->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $modulo = new Modulo($this->data->id);
            $modulo->delete();
            $go = '>common/modulo/formFind';
            $this->renderPrompt('information',"Modulo [{$this->data->idModulo}] removido.", $go);
    }

}