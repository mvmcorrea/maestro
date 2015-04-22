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

class BancoMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Banco',
            'attributes' => array(
                'idBanco' => array('column' => 'idBanco','key' => 'primary','idgenerator' => 'seq_Banco','type' => 'integer'),
                'numero' => array('column' => 'Numero','type' => 'string'),
                'nome' => array('column' => 'Nome','type' => 'string'),
                'ativo' => array('column' => 'Ativo','type' => 'boolean'),
            ),
            'associations' => array(
                'agencias' => array('toClass' => 'common\models\agencia', 'cardinality' => 'oneToMany' , 'keys' => 'idBanco:idBanco'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idBanco;
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
     * @var boolean 
     */
    protected $ativo;

    /**
     * Associations
     */
    protected $agencias;
    

    /**
     * Getters/Setters
     */
    public function getIdBanco() {
        return $this->idBanco;
    }

    public function setIdBanco($value) {
        $this->idBanco = $value;
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

    public function getAtivo() {
        return $this->ativo;
    }

    public function setAtivo($value) {
        $value = (($value != '0') && ($value != 0) && ($value != '')) ? '1' : '0';
        $this->ativo = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAgencias() {
        if (is_null($this->agencias)){
            $this->retrieveAssociation("agencias");
        }
        return  $this->agencias;
    }
    /**
     *
     * @param Association $value
     */
    public function setAgencias($value) {
        $this->agencias = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationAgencias() {
        $this->retrieveAssociation("agencias");
    }

    

}
// end - wizard

?>