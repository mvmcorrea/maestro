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

class LogMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Log',
            'attributes' => array(
                'idLog' => array('column' => 'idLog','key' => 'primary','idgenerator' => 'seq_Log','type' => 'integer'),
                'ts' => array('column' => 'Ts','type' => 'timestamp'),
                'descricao' => array('column' => 'Descricao','type' => 'string'),
                'operacao' => array('column' => 'Operacao','type' => 'string'),
                'classe' => array('column' => 'Classe','type' => 'string'),
                'idModel' => array('column' => 'IdModel','type' => 'integer'),
                'idModulo' => array('column' => 'idModulo','key' => 'foreign','type' => 'integer'),
                'idUsuario' => array('column' => 'idUsuario','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'modulo' => array('toClass' => 'common\models\modulo', 'cardinality' => 'oneToOne' , 'keys' => 'idModulo:idModulo'), 
                'usuario' => array('toClass' => 'common\models\usuario', 'cardinality' => 'oneToOne' , 'keys' => 'idUsuario:idUsuario'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idLog;
    /**
     * 
     * @var timestamp 
     */
    protected $ts;
    /**
     * 
     * @var string 
     */
    protected $descricao;
    /**
     * 
     * @var string 
     */
    protected $operacao;
    /**
     * 
     * @var string 
     */
    protected $classe;
    /**
     * 
     * @var integer 
     */
    protected $idModel;
    /**
     * 
     * @var integer 
     */
    protected $idModulo;
    /**
     * 
     * @var integer 
     */
    protected $idUsuario;

    /**
     * Associations
     */
    protected $modulo;
    protected $usuario;
    

    /**
     * Getters/Setters
     */
    public function getIdLog() {
        return $this->idLog;
    }

    public function setIdLog($value) {
        $this->idLog = $value;
    }

    public function getTs() {
        return $this->ts;
    }

    public function setTs($value) {
        if (!($value instanceof \MTimeStamp)) {
            $value = new \MTimeStamp($value);
        }
        $this->ts = $value;
    }

    public function getDescricao() {
        return $this->descricao;
    }

    public function setDescricao($value) {
        $this->descricao = $value;
    }

    public function getOperacao() {
        return $this->operacao;
    }

    public function setOperacao($value) {
        $this->operacao = $value;
    }

    public function getClasse() {
        return $this->classe;
    }

    public function setClasse($value) {
        $this->classe = $value;
    }

    public function getIdModel() {
        return $this->idModel;
    }

    public function setIdModel($value) {
        $this->idModel = $value;
    }

    public function getIdModulo() {
        return $this->idModulo;
    }

    public function setIdModulo($value) {
        $this->idModulo = $value;
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
    public function getModulo() {
        if (is_null($this->modulo)){
            $this->retrieveAssociation("modulo");
        }
        return  $this->modulo;
    }
    /**
     *
     * @param Association $value
     */
    public function setModulo($value) {
        $this->modulo = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationModulo() {
        $this->retrieveAssociation("modulo");
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