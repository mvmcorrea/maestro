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

class FeriadoController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $feriado= new Feriado($this->data->id);
        $filter->idFeriado = $this->data->idFeriado;
        $this->data->query = $feriado->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/feriado/save';
        $this->render();
    }

    public function formObject() {
        $this->data->feriado = Feriado::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $feriado= new Feriado($this->data->id);
        $this->data->feriado = $feriado->getData();
        
        $this->data->action = '@common/feriado/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $feriado = new Feriado($this->data->id);
        $ok = '>common/feriado/delete/' . $feriado->getId();
        $cancelar = '>common/feriado/formObject/' . $feriado->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Feriado [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Feriado();
        $filter->idFeriado = $this->data->idFeriado;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $feriado = new Feriado($this->data->feriado);
            $feriado->save();
            $go = '>common/feriado/formObject/' . $feriado->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $feriado = new Feriado($this->data->id);
            $feriado->delete();
            $go = '>common/feriado/formFind';
            $this->renderPrompt('information',"Feriado [{$this->data->idFeriado}] removido.", $go);
    }

}