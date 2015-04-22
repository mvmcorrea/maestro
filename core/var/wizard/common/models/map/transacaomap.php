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

class TransacaoMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Transacao',
            'attributes' => array(
                'idTransacao' => array('column' => 'idTransacao','key' => 'primary','idgenerator' => 'seq_Transacao','type' => 'integer'),
                'transacao' => array('column' => 'Transacao','type' => 'string'),
                'descricao' => array('column' => 'Descricao','type' => 'string'),
                'idModulo' => array('column' => 'idModulo','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'acessos' => array('toClass' => 'common\models\acesso', 'cardinality' => 'oneToMany' , 'keys' => 'idTransacao:idTransacao'), 
                'modulo' => array('toClass' => 'common\models\modulo', 'cardinality' => 'oneToOne' , 'keys' => 'idModulo:idModulo'), 
                'grupos' => array('toClass' => 'common\models\grupo', 'cardinality' => 'manyToMany' , 'associative' => 'Acesso'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idTransacao;
    /**
     * 
     * @var string 
     */
    protected $transacao;
    /**
     * 
     * @var string 
     */
    protected $descricao;
    /**
     * 
     * @var integer 
     */
    protected $idModulo;

    /**
     * Associations
     */
    protected $acessos;
    protected $modulo;
    protected $grupos;
    

    /**
     * Getters/Setters
     */
    public function getIdTransacao() {
        return $this->idTransacao;
    }

    public function setIdTransacao($value) {
        $this->idTransacao = $value;
    }

    public function getTransacao() {
        return $this->transacao;
    }

    public function setTransacao($value) {
        $this->transacao = $value;
    }

    public function getDescricao() {
        return $this->descricao;
    }

    public function setDescricao($value) {
        $this->descricao = $value;
    }

    public function getIdModulo() {
        return $this->idModulo;
    }

    public function setIdModulo($value) {
        $this->idModulo = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAcessos() {
        if (is_null($this->acessos)){
            $this->retrieveAssociation("acessos");
        }
        return  $this->acessos;
    }
    /**
     *
     * @param Association $value
     */
    public function setAcessos($value) {
        $this->acessos = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationAcessos() {
        $this->retrieveAssociation("acessos");
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
    public function getGrupos() {
        if (is_null($this->grupos)){
            $this->retrieveAssociation("grupos");
        }
        return  $this->grupos;
    }
    /**
     *
     * @param Association $value
     */
    public function setGrupos($value) {
        $this->grupos = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationGrupos() {
        $this->retrieveAssociation("grupos");
    }

    

}
// end - wizard

?>