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

class SessaoMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Sessao',
            'attributes' => array(
                'idSessao' => array('column' => 'idSessao','key' => 'primary','idgenerator' => 'seq_Sessao','type' => 'integer'),
                'tsIn' => array('column' => 'TsIn','type' => 'timestamp'),
                'tsOut' => array('column' => 'TsOut','type' => 'timestamp'),
                'name' => array('column' => 'Name','type' => 'string'),
                'sid' => array('column' => 'Sid','type' => 'string'),
                'forced' => array('column' => 'Forced','type' => 'boolean'),
                'remoteAddress' => array('column' => 'RemoteAddress','type' => 'string'),
                'serverAddress' => array('column' => 'ServerAddress','type' => 'string'),
                'tsAccess' => array('column' => 'TsAccess','type' => 'timestamp'),
                'idUsuario' => array('column' => 'idUsuario','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'usuario' => array('toClass' => 'common\models\usuario', 'cardinality' => 'oneToOne' , 'keys' => 'idUsuario:idUsuario'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idSessao;
    /**
     * 
     * @var timestamp 
     */
    protected $tsIn;
    /**
     * 
     * @var timestamp 
     */
    protected $tsOut;
    /**
     * 
     * @var string 
     */
    protected $name;
    /**
     * 
     * @var string 
     */
    protected $sid;
    /**
     * 
     * @var boolean 
     */
    protected $forced;
    /**
     * 
     * @var string 
     */
    protected $remoteAddress;
    /**
     * 
     * @var string 
     */
    protected $serverAddress;
    /**
     * 
     * @var timestamp 
     */
    protected $tsAccess;
    /**
     * 
     * @var integer 
     */
    protected $idUsuario;

    /**
     * Associations
     */
    protected $usuario;
    

    /**
     * Getters/Setters
     */
    public function getIdSessao() {
        return $this->idSessao;
    }

    public function setIdSessao($value) {
        $this->idSessao = $value;
    }

    public function getTsIn() {
        return $this->tsIn;
    }

    public function setTsIn($value) {
        if (!($value instanceof \MTimeStamp)) {
            $value = new \MTimeStamp($value);
        }
        $this->tsIn = $value;
    }

    public function getTsOut() {
        return $this->tsOut;
    }

    public function setTsOut($value) {
        if (!($value instanceof \MTimeStamp)) {
            $value = new \MTimeStamp($value);
        }
        $this->tsOut = $value;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($value) {
        $this->name = $value;
    }

    public function getSid() {
        return $this->sid;
    }

    public function setSid($value) {
        $this->sid = $value;
    }

    public function getForced() {
        return $this->forced;
    }

    public function setForced($value) {
        $value = (($value != '0') && ($value != 0) && ($value != '')) ? '1' : '0';
        $this->forced = $value;
    }

    public function getRemoteAddress() {
        return $this->remoteAddress;
    }

    public function setRemoteAddress($value) {
        $this->remoteAddress = $value;
    }

    public function getServerAddress() {
        return $this->serverAddress;
    }

    public function setServerAddress($value) {
        $this->serverAddress = $value;
    }

    public function getTsAccess() {
        return $this->tsAccess;
    }

    public function setTsAccess($value) {
        if (!($value instanceof \MTimeStamp)) {
            $value = new \MTimeStamp($value);
        }
        $this->tsAccess = $value;
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