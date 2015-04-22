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

class InstituicaoMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Instituicao',
            'attributes' => array(
                'idInstituicao' => array('column' => 'idInstituicao','key' => 'primary','idgenerator' => 'seq_Instituicao','type' => 'integer'),
                'instituicao' => array('column' => 'Instituicao','type' => 'string'),
                'nome' => array('column' => 'Nome','type' => 'string'),
                'telefone' => array('column' => 'Telefone','type' => 'string'),
                'email' => array('column' => 'Email','type' => 'string'),
                'fax' => array('column' => 'Fax','type' => 'string'),
                'caixaPostal' => array('column' => 'CaixaPostal','type' => 'string'),
                'CNPJ' => array('column' => 'CNPJ','type' => 'string'),
                'celular' => array('column' => 'Celular','type' => 'string'),
                'dataAtualizacao' => array('column' => 'DataAtualizacao','type' => 'date'),
                'idPessoa' => array('column' => 'idPessoa','key' => 'foreign','type' => 'integer'),
                'idEndereco' => array('column' => 'idEndereco','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'pessoa' => array('toClass' => 'common\models\pessoa', 'cardinality' => 'oneToOne' , 'keys' => 'idPessoa:idPessoa'), 
                'endereco' => array('toClass' => 'common\models\endereco', 'cardinality' => 'oneToOne' , 'keys' => 'idEndereco:idEndereco'), 
                'contaCorrente' => array('toClass' => 'common\models\contacorrente', 'cardinality' => 'manyToMany' , 'associative' => 'Instituicao_ContaCorrente'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idInstituicao;
    /**
     * 
     * @var string 
     */
    protected $instituicao;
    /**
     * 
     * @var string 
     */
    protected $nome;
    /**
     * 
     * @var string 
     */
    protected $telefone;
    /**
     * 
     * @var string 
     */
    protected $email;
    /**
     * 
     * @var string 
     */
    protected $fax;
    /**
     * 
     * @var string 
     */
    protected $caixaPostal;
    /**
     * 
     * @var string 
     */
    protected $CNPJ;
    /**
     * 
     * @var string 
     */
    protected $celular;
    /**
     * 
     * @var date 
     */
    protected $dataAtualizacao;
    /**
     * 
     * @var integer 
     */
    protected $idPessoa;
    /**
     * 
     * @var integer 
     */
    protected $idEndereco;

    /**
     * Associations
     */
    protected $pessoa;
    protected $endereco;
    protected $contaCorrente;
    

    /**
     * Getters/Setters
     */
    public function getIdInstituicao() {
        return $this->idInstituicao;
    }

    public function setIdInstituicao($value) {
        $this->idInstituicao = $value;
    }

    public function getInstituicao() {
        return $this->instituicao;
    }

    public function setInstituicao($value) {
        $this->instituicao = $value;
    }

    public function getNome() {
        return $this->nome;
    }

    public function setNome($value) {
        $this->nome = $value;
    }

    public function getTelefone() {
        return $this->telefone;
    }

    public function setTelefone($value) {
        $this->telefone = $value;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($value) {
        $this->email = $value;
    }

    public function getFax() {
        return $this->fax;
    }

    public function setFax($value) {
        $this->fax = $value;
    }

    public function getCaixaPostal() {
        return $this->caixaPostal;
    }

    public function setCaixaPostal($value) {
        $this->caixaPostal = $value;
    }

    public function getCNPJ() {
        return $this->CNPJ;
    }

    public function setCNPJ($value) {
        $this->CNPJ = $value;
    }

    public function getCelular() {
        return $this->celular;
    }

    public function setCelular($value) {
        $this->celular = $value;
    }

    public function getDataAtualizacao() {
        return $this->dataAtualizacao;
    }

    public function setDataAtualizacao($value) {
        if (!($value instanceof \MDate)) {
            $value = new \MDate($value);
        }
        $this->dataAtualizacao = $value;
    }

    public function getIdPessoa() {
        return $this->idPessoa;
    }

    public function setIdPessoa($value) {
        $this->idPessoa = $value;
    }

    public function getIdEndereco() {
        return $this->idEndereco;
    }

    public function setIdEndereco($value) {
        $this->idEndereco = $value;
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
    /**
     *
     * @return Association
     */
    public function getEndereco() {
        if (is_null($this->endereco)){
            $this->retrieveAssociation("endereco");
        }
        return  $this->endereco;
    }
    /**
     *
     * @param Association $value
     */
    public function setEndereco($value) {
        $this->endereco = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationEndereco() {
        $this->retrieveAssociation("endereco");
    }
    /**
     *
     * @return Association
     */
    public function getContaCorrente() {
        if (is_null($this->contaCorrente)){
            $this->retrieveAssociation("contaCorrente");
        }
        return  $this->contaCorrente;
    }
    /**
     *
     * @param Association $value
     */
    public function setContaCorrente($value) {
        $this->contaCorrente = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationContaCorrente() {
        $this->retrieveAssociation("contaCorrente");
    }

    

}
// end - wizard

?>