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

class ContacorrenteMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'ContaCorrente',
            'attributes' => array(
                'idContaCorrente' => array('column' => 'idContaCorrente','key' => 'primary','idgenerator' => 'seq_ContaCorrente','type' => 'integer'),
                'conta' => array('column' => 'Conta','type' => 'string'),
                'idAgencia' => array('column' => 'idAgencia','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'pessoas' => array('toClass' => 'common\models\pessoa', 'cardinality' => 'manyToMany' , 'associative' => 'Pessoa_ContaCorrente'), 
                'instituicoes' => array('toClass' => 'common\models\instituicao', 'cardinality' => 'manyToMany' , 'associative' => 'Instituicao_ContaCorrente'), 
                'agencia' => array('toClass' => 'common\models\agencia', 'cardinality' => 'oneToOne' , 'keys' => 'idAgencia:idAgencia'), 
                'pessoa' => array('toClass' => 'common\models\pessoa', 'cardinality' => 'oneToMany' , 'keys' => 'idContaCorrente:idContaCorrente'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idContaCorrente;
    /**
     * 
     * @var string 
     */
    protected $conta;
    /**
     * 
     * @var integer 
     */
    protected $idAgencia;

    /**
     * Associations
     */
    protected $pessoas;
    protected $instituicoes;
    protected $agencia;
    protected $pessoa;
    

    /**
     * Getters/Setters
     */
    public function getIdContaCorrente() {
        return $this->idContaCorrente;
    }

    public function setIdContaCorrente($value) {
        $this->idContaCorrente = $value;
    }

    public function getConta() {
        return $this->conta;
    }

    public function setConta($value) {
        $this->conta = $value;
    }

    public function getIdAgencia() {
        return $this->idAgencia;
    }

    public function setIdAgencia($value) {
        $this->idAgencia = $value;
    }
    /**
     *
     * @return Association
     */
    public function getPessoas() {
        if (is_null($this->pessoas)){
            $this->retrieveAssociation("pessoas");
        }
        return  $this->pessoas;
    }
    /**
     *
     * @param Association $value
     */
    public function setPessoas($value) {
        $this->pessoas = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationPessoas() {
        $this->retrieveAssociation("pessoas");
    }
    /**
     *
     * @return Association
     */
    public function getInstituicoes() {
        if (is_null($this->instituicoes)){
            $this->retrieveAssociation("instituicoes");
        }
        return  $this->instituicoes;
    }
    /**
     *
     * @param Association $value
     */
    public function setInstituicoes($value) {
        $this->instituicoes = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationInstituicoes() {
        $this->retrieveAssociation("instituicoes");
    }
    /**
     *
     * @return Association
     */
    public function getAgencia() {
        if (is_null($this->agencia)){
            $this->retrieveAssociation("agencia");
        }
        return  $this->agencia;
    }
    /**
     *
     * @param Association $value
     */
    public function setAgencia($value) {
        $this->agencia = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationAgencia() {
        $this->retrieveAssociation("agencia");
    }
    /**
     *
     * @return Association
     */
    public function getPessoa() {
        if (is_null($this->pessoa)){
            $this->retrieveAssociation("pessoa");
        }
        return  $this->pessoa;
    }
    /**
     *
     * @param Association $value
     */
    public function setPessoa($value) {
        $this->pessoa = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationPessoa() {
        $this->retrieveAssociation("pessoa");
    }

    

}
// end - wizard

?>