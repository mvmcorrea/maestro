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

class TabelageralMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'TabelaGeral',
            'attributes' => array(
                'idTabelaGeral' => array('column' => 'idTabelaGeral','key' => 'primary','idgenerator' => 'seq_TabelaGeral','type' => 'integer'),
                'tabela' => array('column' => 'Tabela','type' => 'string'),
                'item1' => array('column' => 'Item1','type' => 'string'),
                'item2' => array('column' => 'Item2','type' => 'string'),
                'item3' => array('column' => 'Item3','type' => 'string'),
            ),
            'associations' => array(
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idTabelaGeral;
    /**
     * 
     * @var string 
     */
    protected $tabela;
    /**
     * 
     * @var string 
     */
    protected $item1;
    /**
     * 
     * @var string 
     */
    protected $item2;
    /**
     * 
     * @var string 
     */
    protected $item3;

    /**
     * Associations
     */
    

    /**
     * Getters/Setters
     */
    public function getIdTabelaGeral() {
        return $this->idTabelaGeral;
    }

    public function setIdTabelaGeral($value) {
        $this->idTabelaGeral = $value;
    }

    public function getTabela() {
        return $this->tabela;
    }

    public function setTabela($value) {
        $this->tabela = $value;
    }

    public function getItem1() {
        return $this->item1;
    }

    public function setItem1($value) {
        $this->item1 = $value;
    }

    public function getItem2() {
        return $this->item2;
    }

    public function setItem2($value) {
        $this->item2 = $value;
    }

    public function getItem3() {
        return $this->item3;
    }

    public function setItem3($value) {
        $this->item3 = $value;
    }

    

}
// end - wizard

?>