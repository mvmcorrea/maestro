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

class ArquivoMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Arquivo',
            'attributes' => array(
                'idArquivo' => array('column' => 'idArquivo','key' => 'primary','idgenerator' => 'seq_Arquivo','type' => 'integer'),
                'md5' => array('column' => 'Md5','type' => 'string'),
                'nome' => array('column' => 'Nome','type' => 'string'),
                'caminho' => array('column' => 'Caminho','type' => 'string'),
                'tamanho' => array('column' => 'Tamanho','type' => 'integer'),
                'dataGravacao' => array('column' => 'DataGravacao','type' => 'date'),
                'arquivo' => array('column' => 'Arquivo','type' => 'blob'),
                'idMIME' => array('column' => 'idMIME','key' => 'foreign','type' => 'integer'),
                'idUsuario' => array('column' => 'idUsuario','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'MIME' => array('toClass' => 'common\models\mime', 'cardinality' => 'oneToOne' , 'keys' => 'idMIME:idMIME'), 
                'usuario' => array('toClass' => 'common\models\usuario', 'cardinality' => 'oneToOne' , 'keys' => 'idUsuario:idUsuario'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idArquivo;
    /**
     * 
     * @var string 
     */
    protected $md5;
    /**
     * 
     * @var string 
     */
    protected $nome;
    /**
     * 
     * @var string 
     */
    protected $caminho;
    /**
     * 
     * @var integer 
     */
    protected $tamanho;
    /**
     * 
     * @var date 
     */
    protected $dataGravacao;
    /**
     * 
     * @var blob 
     */
    protected $arquivo;
    /**
     * 
     * @var integer 
     */
    protected $idMIME;
    /**
     * 
     * @var integer 
     */
    protected $idUsuario;

    /**
     * Associations
     */
    protected $MIME;
    protected $usuario;
    

    /**
     * Getters/Setters
     */
    public function getIdArquivo() {
        return $this->idArquivo;
    }

    public function setIdArquivo($value) {
        $this->idArquivo = $value;
    }

    public function getMd5() {
        return $this->md5;
    }

    public function setMd5($value) {
        $this->md5 = $value;
    }

    public function getNome() {
        return $this->nome;
    }

    public function setNome($value) {
        $this->nome = $value;
    }

    public function getCaminho() {
        return $this->caminho;
    }

    public function setCaminho($value) {
        $this->caminho = $value;
    }

    public function getTamanho() {
        return $this->tamanho;
    }

    public function setTamanho($value) {
        $this->tamanho = $value;
    }

    public function getDataGravacao() {
        return $this->dataGravacao;
    }

    public function setDataGravacao($value) {
        if (!($value instanceof \MDate)) {
            $value = new \MDate($value);
        }
        $this->dataGravacao = $value;
    }

    public function getArquivo() {
        return $this->arquivo;
    }

    public function setArquivo($value) {
        $this->arquivo = $value;
    }

    public function getIdMIME() {
        return $this->idMIME;
    }

    public function setIdMIME($value) {
        $this->idMIME = $value;
    }

    public function getIdUsuario() {
        return $this->idUsuario;
    }

    public function setIdUsuario($value) {
        $this->idUsuario = $value;
    }
    /**
     *
     * @return Association
     */
    public function getMIME() {
        if (is_null($this->MIME)){
            $this->retrieveAssociation("MIME");
        }
        return  $this->MIME;
    }
    /**
     *
     * @param Association $value
     */
    public function setMIME($value) {
        $this->MIME = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationMIME() {
        $this->retrieveAssociation("MIME");
    }
    /**
     *
     * @return Association
     */
    public function getUsuario() {
        if (is_null($this->usuario)){
            $this->retrieveAssociation("usuario");
        }
        return  $this->usuario;
    }
    /**
     *
     * @param Association $value
     */
    public function setUsuario($value) {
        $this->usuario = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationUsuario() {
        $this->retrieveAssociation("usuario");
    }

    

}
// end - wizard

?>