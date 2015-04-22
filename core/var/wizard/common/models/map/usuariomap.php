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

class UsuarioMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Usuario',
            'attributes' => array(
                'idUsuario' => array('column' => 'idUsuario','key' => 'primary','idgenerator' => 'seq_Usuario','type' => 'integer'),
                'login' => array('column' => 'Login','type' => 'string'),
                'password' => array('column' => 'Password','type' => 'string'),
                'nick' => array('column' => 'Nick','type' => 'string'),
                'passMD5' => array('column' => 'PassMD5','type' => 'string'),
                'ativo' => array('column' => 'Ativo','type' => 'boolean'),
                'profile' => array('column' => 'Profile','type' => 'string'),
                'profileAtivo' => array('column' => 'ProfileAtivo','type' => 'boolean'),
                'idSetor' => array('column' => 'idSetor','key' => 'foreign','type' => 'integer'),
                'idPessoa' => array('column' => 'idPessoa','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'setor' => array('toClass' => 'common\models\setor', 'cardinality' => 'oneToOne' , 'keys' => 'idSetor:idSetor'), 
                'pessoa' => array('toClass' => 'common\models\pessoa', 'cardinality' => 'oneToOne' , 'keys' => 'idPessoa:idPessoa'), 
                'grupos' => array('toClass' => 'common\models\grupo', 'cardinality' => 'manyToMany' , 'associative' => 'Usuario_Grupo'), 
                'arquivos' => array('toClass' => 'common\models\arquivo', 'cardinality' => 'oneToMany' , 'keys' => 'idUsuario:idUsuario'), 
                'log' => array('toClass' => 'common\models\log', 'cardinality' => 'oneToMany' , 'keys' => 'idUsuario:idUsuario'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idUsuario;
    /**
     * 
     * @var string 
     */
    protected $login;
    /**
     * 
     * @var string 
     */
    protected $password;
    /**
     * 
     * @var string 
     */
    protected $nick;
    /**
     * 
     * @var string 
     */
    protected $passMD5;
    /**
     * 
     * @var boolean 
     */
    protected $ativo;
    /**
     * 
     * @var string 
     */
    protected $profile;
    /**
     * 
     * @var boolean 
     */
    protected $profileAtivo;
    /**
     * 
     * @var integer 
     */
    protected $idSetor;
    /**
     * 
     * @var integer 
     */
    protected $idPessoa;

    /**
     * Associations
     */
    protected $setor;
    protected $pessoa;
    protected $grupos;
    protected $arquivos;
    protected $log;
    

    /**
     * Getters/Setters
     */
    public function getIdUsuario() {
        return $this->idUsuario;
    }

    public function setIdUsuario($value) {
        $this->idUsuario = $value;
    }

    public function getLogin() {
        return $this->login;
    }

    public function setLogin($value) {
        $this->login = $value;
    }

    public function getPassword() {
        return $this->password;
    }

    public function setPassword($value) {
        $this->password = $value;
    }

    public function getNick() {
        return $this->nick;
    }

    public function setNick($value) {
        $this->nick = $value;
    }

    public function getPassMD5() {
        return $this->passMD5;
    }

    public function setPassMD5($value) {
        $this->passMD5 = $value;
    }

    public function getAtivo() {
        return $this->ativo;
    }

    public function setAtivo($value) {
        $value = (($value != '0') && ($value != 0) && ($value != '')) ? '1' : '0';
        $this->ativo = $value;
    }

    public function getProfile() {
        return $this->profile;
    }

    public function setProfile($value) {
        $this->profile = $value;
    }

    public function getProfileAtivo() {
        return $this->profileAtivo;
    }

    public function setProfileAtivo($value) {
        $value = (($value != '0') && ($value != 0) && ($value != '')) ? '1' : '0';
        $this->profileAtivo = $value;
    }

    public function getIdSetor() {
        return $this->idSetor;
    }

    public function setIdSetor($value) {
        $this->idSetor = $value;
    }

    public function getIdPessoa() {
        return $this->idPessoa;
    }

    public function setIdPessoa($value) {
        $this->idPessoa = $value;
    }
    /**
     *
     * @return Association
     */
    public function getSetor() {
        if (is_null($this->setor)){
            $this->retrieveAssociation("setor");
        }
        return  $this->setor;
    }
    /**
     *
     * @param Association $value
     */
    public function setSetor($value) {
        $this->setor = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationSetor() {
        $this->retrieveAssociation("setor");
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
    /**
     *
     * @return Association
     */
    public function getArquivos() {
        if (is_null($this->arquivos)){
            $this->retrieveAssociation("arquivos");
        }
        return  $this->arquivos;
    }
    /**
     *
     * @param Association $value
     */
    public function setArquivos($value) {
        $this->arquivos = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationArquivos() {
        $this->retrieveAssociation("arquivos");
    }
    /**
     *
     * @return Association
     */
    public function getLog() {
        if (is_null($this->log)){
            $this->retrieveAssociation("log");
        }
        return  $this->log;
    }
    /**
     *
     * @param Association $value
     */
    public function setLog($value) {
        $this->log = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationLog() {
        $this->retrieveAssociation("log");
    }

    

}
// end - wizard

?>