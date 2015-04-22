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

class OrganogramaController extends MController {

    public function main() {
        $this->render("formBase");
    }

    public function formFind() {
        $organograma= new Organograma($this->data->id);
        $filter->idOrganograma = $this->data->idOrganograma;
        $this->data->query = $organograma->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formNew() {
        $this->data->action = '@common/organograma/save';
        $this->render();
    }

    public function formObject() {
        $this->data->organograma = Organograma::create($this->data->id)->getData();
        $this->render();
    }

    public function formUpdate() {
        $organograma= new Organograma($this->data->id);
        $this->data->organograma = $organograma->getData();
        
        $this->data->action = '@common/organograma/save/' .  $this->data->id;
        $this->render();
    }

    public function formDelete() {
        $organograma = new Organograma($this->data->id);
        $ok = '>common/organograma/delete/' . $organograma->getId();
        $cancelar = '>common/organograma/formObject/' . $organograma->getId();
        $this->renderPrompt('confirmation', "Confirma remoção do Organograma [{$model->getDescription()}] ?", $ok, $cancelar);
    }

    public function lookup() {
        $model = new Organograma();
        $filter->idOrganograma = $this->data->idOrganograma;
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function save() {
            $organograma = new Organograma($this->data->organograma);
            $organograma->save();
            $go = '>common/organograma/formObject/' . $organograma->getId();
            $this->renderPrompt('information','OK',$go);
    }

    public function delete() {
            $organograma = new Organograma($this->data->id);
            $organograma->delete();
            $go = '>common/organograma/formFind';
            $this->renderPrompt('information',"Organograma [{$this->data->idOrganograma}] removido.", $go);
    }

}