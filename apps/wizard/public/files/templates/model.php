<?php
// $_time

namespace $_module\models;

class $_classC extends map\$_classCMap {

    public static function config() {
        return array(
            'log' => $_configLog
            'validators' => $_configValidators
            'converters' => $_configConverters
        );
    }
    
    public function getDescription(){
        return $this->get$_descriptionC();
    }

    public function listByFilter($filter){
        $criteria = $this->getCriteria()->select('*')->orderBy('$_description');
        if ($filter->$_description){
            $criteria->where("$_description LIKE '{$filter->$_description}%'");
        }
        return $criteria;
    }
}