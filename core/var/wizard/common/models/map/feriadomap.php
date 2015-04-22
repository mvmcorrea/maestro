<?php
/**
 * @category   Maestro
 * @package    UFJF
 * @subpackage common
 * @copyright  Copyright (c) 2003-2013 UFJF (http://www.ufjf.br)
 * @license    http://siga.ufjf.br/license
 * @version
 * @since
 */

// wizard - code section created by Wizard Module

namespace common\models\map;

class FeriadoMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Feriado',
            'attributes' => array(
                'idFeriado' => array('column' => 'idFeriado','key' => 'primary','idgenerator' => 'seq_Feriado','type' => 'integer'),
                'dataFeriado' => array('column' => 'DataFeriado','type' => 'date'),
                'descricao' => array('column' => 'Descricao','type' => 'string'),
                'abrangencia' => array('column' => 'Abrangencia','type' => 'string'),
            ),
            'associations' => array(
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idFeriado;
    /**
     * 
     * @var date 
     */
    protected $dataFeriado;
    /**
     * 
     * @var string 
     */
    protected $descricao;
    /**
     * 
     * @var string 
     */
    protected $abrangencia;

    /**
     * Associations
     */
    

    /**
     * Getters/Setters
     */
    public function getIdFeriado() {
        return $this->idFeriado;
    }

    public function setIdFeriado($value) {
        $this->idFeriado = $value;
    }

    public function getDataFeriado() {
        return $this->dataFeriado;
    }

    public function setDataFeriado($value) {
        if (!($value instanceof \MDate)) {
            $value = new \MDate($value);
        }
        $this->dataFeriado = $value;
    }

    public function getDescricao() {
        return $this->descricao;
    }

    public function setDescricao($value) {
        $this->descricao = $value;
    }

    public function getAbrangencia() {
        return $this->abrangencia;
    }

    public function setAbrangencia($value) {
        $this->abrangencia = $value;
    }

    

}
// end - wizard

?>