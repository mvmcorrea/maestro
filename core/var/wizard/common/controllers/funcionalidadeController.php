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

class FuncionalidadeController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $funcionalidade= new Funcionalidade($this->data->id);
        $filter->idFuncionalidade = $this->data->idFuncionalidade;
        $this->data->query = $funcionalidade->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/funcionalidade/save';
        $this->render();
    }

    public function formObject() {
        $this->data->funcionalidade = Funcionalidade::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $funcionalidade= new Funcionalidade($this->data->id);
        $this->data->funcionalidade = $funcionalidade->getData();
        $this->data->funcionalidade->idModuloDesc = $funcionalidade->getModulo()->getDescription();
	
        $this->data->action = '@common/funcionalidade/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $funcionalidade = new Funcionalidade($this->data->id);
        $ok = '>common/funcionalidade/delete/' . $funcionalidade->getId();
        $cancelar = '>common/funcionalidade/formObject/' . $funcionalidade->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Funcionalidade [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Funcionalidade();
        $filter->idFuncionalidade = $this->data->idFuncionalidade;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $funcionalidade = new Funcionalidade($this->data->funcionalidade);
            $funcionalidade->save();
            $go = '>common/funcionalidade/formObject/' . $funcionalidade->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $funcionalidade = new Funcionalidade($this->data->id);
            $funcionalidade->delete();
            $go = '>common/funcionalidade/formFind';
            $this->renderPrompt('information',"Funcionalidade [{$this->data->idFuncionalidade}] removido.", $go);
    }

}