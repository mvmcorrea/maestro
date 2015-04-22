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

class ModuloMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Modulo',
            'attributes' => array(
                'idModulo' => array('column' => 'idModulo','key' => 'primary','idgenerator' => 'seq_Modulo','type' => 'integer'),
                'nome' => array('column' => 'Nome','type' => 'string'),
                'versaoAtual' => array('column' => 'VersaoAtual','type' => 'string'),
                'moduloSIGA' => array('column' => 'ModuloSIGA','type' => 'string'),
                'prefixoBD' => array('column' => 'PrefixoBD','type' => 'string'),
                'idPessoa' => array('column' => 'idPessoa','key' => 'foreign','type' => 'integer'),
                'idPessoa2' => array('column' => 'idPessoa2','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'funcionalidade' => array('toClass' => 'common\models\funcionalidade', 'cardinality' => 'oneToMany' , 'keys' => 'idModulo:idModulo'), 
                'transacoes' => array('toClass' => 'common\models\transacao', 'cardinality' => 'oneToMany' , 'keys' => 'idModulo:idModulo'), 
                'responsavel' => array('toClass' => 'common\models\pessoa', 'cardinality' => 'oneToOne' , 'keys' => 'idPessoa:idPessoa'), 
                'responsavel2' => array('toClass' => 'common\models\pessoa', 'cardinality' => 'oneToOne' , 'keys' => 'idPessoa2:idPessoa'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idModulo;
    /**
     * 
     * @var string 
     */
    protected $nome;
    /**
     * 
     * @var string 
     */
    protected $versaoAtual;
    /**
     * 
     * @var string 
     */
    protected $moduloSIGA;
    /**
     * 
     * @var string 
     */
    protected $prefixoBD;
    /**
     * 
     * @var integer 
     */
    protected $idPessoa;
    /**
     * 
     * @var integer 
     */
    protected $idPessoa2;

    /**
     * Associations
     */
    protected $funcionalidade;
    protected $transacoes;
    protected $responsavel;
    protected $responsavel2;
    

    /**
     * Getters/Setters
     */
    public function getIdModulo() {
        return $this->idModulo;
    }

    public function setIdModulo($value) {
        $this->idModulo = $value;
    }

    public function getNome() {
        return $this->nome;
    }

    public function setNome($value) {
        $this->nome = $value;
    }

    public function getVersaoAtual() {
        return $this->versaoAtual;
    }

    public function setVersaoAtual($value) {
        $this->versaoAtual = $value;
    }

    public function getModuloSIGA() {
        return $this->moduloSIGA;
    }

    public function setModuloSIGA($value) {
        $this->moduloSIGA = $value;
    }

    public function getPrefixoBD() {
        return $this->prefixoBD;
    }

    public function setPrefixoBD($value) {
        $this->prefixoBD = $value;
    }

    public function getIdPessoa() {
        return $this->idPessoa;
    }

    public function setIdPessoa($value) {
        $this->idPessoa = $value;
    }

    public function getIdPessoa2() {
        return $this->idPessoa2;
    }

    public function setIdPessoa2($value) {
        $this->idPessoa2 = $value;
    }
    /**
     *
     * @return Association
     */
    public function getFuncionalidade() {
        if (is_null($this->funcionalidade)){
            $this->retrieveAssociation("funcionalidade");
        }
        return  $this->funcionalidade;
    }
    /**
     *
     * @param Association $value
     */
    public function setFuncionalidade($value) {
        $this->funcionalidade = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationFuncionalidade() {
        $this->retrieveAssociation("funcionalidade");
    }
    /**
     *
     * @return Association
     */
    public function getTransacoes() {
        if (is_null($this->transacoes)){
            $this->retrieveAssociation("transacoes");
        }
        return  $this->transacoes;
    }
    /**
     *
     * @param Association $value
     */
    public function setTransacoes($value) {
        $this->transacoes = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationTransacoes() {
        $this->retrieveAssociation("transacoes");
    }
    /**
     *
     * @return Association
     */
    public function getResponsavel() {
        if (is_null($this->responsavel)){
            $this->retrieveAssociation("responsavel");
        }
        return  $this->responsavel;
    }
    /**
     *
     * @param Association $value
     */
    public function setResponsavel($value) {
        $this->responsavel = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationResponsavel() {
        $this->retrieveAssociation("responsavel");
    }
    /**
     *
     * @return Association
     */
    public function getResponsavel2() {
        if (is_null($this->responsavel2)){
            $this->retrieveAssociation("responsavel2");
        }
        return  $this->responsavel2;
    }
    /**
     *
     * @param Association $value
     */
    public function setResponsavel2($value) {
        $this->responsavel2 = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationResponsavel2() {
        $this->retrieveAssociation("responsavel2");
    }

    

}
// end - wizard

?>