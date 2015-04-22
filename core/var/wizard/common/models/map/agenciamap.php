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

class AgenciaMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Agencia',
            'attributes' => array(
                'idAgencia' => array('column' => 'idAgencia','key' => 'primary','idgenerator' => 'seq_Agencia','type' => 'integer'),
                'numero' => array('column' => 'Numero','type' => 'string'),
                'nome' => array('column' => 'Nome','type' => 'string'),
                'idBanco' => array('column' => 'idBanco','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'banco' => array('toClass' => 'common\models\banco', 'cardinality' => 'oneToOne' , 'keys' => 'idBanco:idBanco'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idAgencia;
    /**
     * 
     * @var string 
     */
    protected $numero;
    /**
     * 
     * @var string 
     */
    protected $nome;
    /**
     * 
     * @var integer 
     */
    protected $idBanco;

    /**
     * Associations
     */
    protected $banco;
    

    /**
     * Getters/Setters
     */
    public function getIdAgencia() {
        return $this->idAgencia;
    }

    public function setIdAgencia($value) {
        $this->idAgencia = $value;
    }

    public function getNumero() {
        return $this->numero;
    }

    public function setNumero($value) {
        $this->numero = $value;
    }

    public function getNome() {
        return $this->nome;
    }

    public function setNome($value) {
        $this->nome = $value;
    }

    public function getIdBanco() {
        return $this->idBanco;
    }

    public function setIdBanco($value) {
        $this->idBanco = $value;
    }
    /**
     *
     * @return Association
     */
    public function getBanco() {
        if (is_null($this->banco)){
            $this->retrieveAssociation("banco");
        }
        return  $this->banco;
    }
    /**
     *
     * @param Association $value
     */
    public function setBanco($value) {
        $this->banco = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationBanco() {
        $this->retrieveAssociation("banco");
    }

    

}
// end - wizard

?>