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

class SetororganogramaController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $setororganograma= new Setororganograma($this->data->id);
        $filter->idSetorOrganograma = $this->data->idSetorOrganograma;
        $this->data->query = $setororganograma->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/setororganograma/save';
        $this->render();
    }

    public function formObject() {
        $this->data->setororganograma = Setororganograma::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $setororganograma= new Setororganograma($this->data->id);
        $this->data->setororganograma = $setororganograma->getData();
        $this->data->setororganograma->idOrganogramaDesc = $setororganograma->getOrganograma()->getDescription();
	$this->data->setororganograma->idSetorFilhoDesc = $setororganograma->getSetorFilho()->getDescription();
	$this->data->setororganograma->idSetorPaiDesc = $setororganograma->getSetorPai()->getDescription();
	
        $this->data->action = '@common/setororganograma/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $setororganograma = new Setororganograma($this->data->id);
        $ok = '>common/setororganograma/delete/' . $setororganograma->getId();
        $cancelar = '>common/setororganograma/formObject/' . $setororganograma->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Setororganograma [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Setororganograma();
        $filter->idSetorOrganograma = $this->data->idSetorOrganograma;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $setororganograma = new Setororganograma($this->data->setororganograma);
            $setororganograma->save();
            $go = '>common/setororganograma/formObject/' . $setororganograma->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $setororganograma = new Setororganograma($this->data->id);
            $setororganograma->delete();
            $go = '>common/setororganograma/formFind';
            $this->renderPrompt('information',"Setororganograma [{$this->data->idSetorOrganograma}] removido.", $go);
    }

}