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

class TabelageralController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $tabelageral= new Tabelageral($this->data->id);
        $filter->idTabelaGeral = $this->data->idTabelaGeral;
        $this->data->query = $tabelageral->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/tabelageral/save';
        $this->render();
    }

    public function formObject() {
        $this->data->tabelageral = Tabelageral::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $tabelageral= new Tabelageral($this->data->id);
        $this->data->tabelageral = $tabelageral->getData();
        
        $this->data->action = '@common/tabelageral/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $tabelageral = new Tabelageral($this->data->id);
        $ok = '>common/tabelageral/delete/' . $tabelageral->getId();
        $cancelar = '>common/tabelageral/formObject/' . $tabelageral->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Tabelageral [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Tabelageral();
        $filter->idTabelaGeral = $this->data->idTabelaGeral;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $tabelageral = new Tabelageral($this->data->tabelageral);
            $tabelageral->save();
            $go = '>common/tabelageral/formObject/' . $tabelageral->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $tabelageral = new Tabelageral($this->data->id);
            $tabelageral->delete();
            $go = '>common/tabelageral/formFind';
            $this->renderPrompt('information',"Tabelageral [{$this->data->idTabelaGeral}] removido.", $go);
    }

}