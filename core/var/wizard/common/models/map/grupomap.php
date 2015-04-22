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

class GrupoMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Grupo',
            'attributes' => array(
                'idGrupo' => array('column' => 'idGrupo','key' => 'primary','idgenerator' => 'seq_Grupo','type' => 'integer'),
                'grupo' => array('column' => 'Grupo','type' => 'string'),
                'descricao' => array('column' => 'Descricao','type' => 'string'),
                'idGrupoPai' => array('column' => 'idGrupoPai','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'acessos' => array('toClass' => 'common\models\acesso', 'cardinality' => 'oneToMany' , 'keys' => 'idGrupo:idGrupo'), 
                'usuarios' => array('toClass' => 'common\models\usuario', 'cardinality' => 'manyToMany' , 'associative' => 'Usuario_Grupo'), 
                'mensagens' => array('toClass' => 'common\models\mensagem', 'cardinality' => 'manyToMany' , 'associative' => 'Grupo_Mensagem'), 
                'grupoPai' => array('toClass' => 'common\models\grupo', 'cardinality' => 'oneToOne' , 'keys' => 'idGrupoPai:idGrupo'), 
                'gruposFilhos' => array('toClass' => 'common\models\grupo', 'cardinality' => 'oneToMany' , 'keys' => 'idGrupo:idGrupoPai'), 
                'transacoes' => array('toClass' => 'common\models\transacao', 'cardinality' => 'manyToMany' , 'associative' => 'Acesso'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idGrupo;
    /**
     * 
     * @var string 
     */
    protected $grupo;
    /**
     * 
     * @var string 
     */
    protected $descricao;
    /**
     * 
     * @var integer 
     */
    protected $idGrupoPai;

    /**
     * Associations
     */
    protected $acessos;
    protected $usuarios;
    protected $mensagens;
    protected $grupoPai;
    protected $gruposFilhos;
    protected $transacoes;
    

    /**
     * Getters/Setters
     */
    public function getIdGrupo() {
        return $this->idGrupo;
    }

    public function setIdGrupo($value) {
        $this->idGrupo = $value;
    }

    public function getGrupo() {
        return $this->grupo;
    }

    public function setGrupo($value) {
        $this->grupo = $value;
    }

    public function getDescricao() {
        return $this->descricao;
    }

    public function setDescricao($value) {
        $this->descricao = $value;
    }

    public function getIdGrupoPai() {
        return $this->idGrupoPai;
    }

    public function setIdGrupoPai($value) {
        $this->idGrupoPai = $value;
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
    public function getUsuarios() {
        if (is_null($this->usuarios)){
            $this->retrieveAssociation("usuarios");
        }
        return  $this->usuarios;
    }
    /**
     *
     * @param Association $value
     */
    public function setUsuarios($value) {
        $this->usuarios = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationUsuarios() {
        $this->retrieveAssociation("usuarios");
    }
    /**
     *
     * @return Association
     */
    public function getMensagens() {
        if (is_null($this->mensagens)){
            $this->retrieveAssociation("mensagens");
        }
        return  $this->mensagens;
    }
    /**
     *
     * @param Association $value
     */
    public function setMensagens($value) {
        $this->mensagens = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationMensagens() {
        $this->retrieveAssociation("mensagens");
    }
    /**
     *
     * @return Association
     */
    public function getGrupoPai() {
        if (is_null($this->grupoPai)){
            $this->retrieveAssociation("grupoPai");
        }
        return  $this->grupoPai;
    }
    /**
     *
     * @param Association $value
     */
    public function setGrupoPai($value) {
        $this->grupoPai = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationGrupoPai() {
        $this->retrieveAssociation("grupoPai");
    }
    /**
     *
     * @return Association
     */
    public function getGruposFilhos() {
        if (is_null($this->gruposFilhos)){
            $this->retrieveAssociation("gruposFilhos");
        }
        return  $this->gruposFilhos;
    }
    /**
     *
     * @param Association $value
     */
    public function setGruposFilhos($value) {
        $this->gruposFilhos = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationGruposFilhos() {
        $this->retrieveAssociation("gruposFilhos");
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

    

}
// end - wizard

?>