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

class LostpassMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'LostPass',
            'attributes' => array(
                'idPass' => array('column' => 'idLostPass','key' => 'primary','idgenerator' => 'seq_LostPass','type' => 'integer'),
                'code' => array('column' => 'Code','type' => 'string'),
                'ipAddress' => array('column' => 'IpAddress','type' => 'string'),
                'tsRegistro' => array('column' => 'TsRegistro','type' => 'timestamp'),
                'ipAddressResposta' => array('column' => 'IpAddressResposta','type' => 'string'),
                'tsResposta' => array('column' => 'TsResposta','type' => 'timestamp'),
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
    protected $idPass;
    /**
     * 
     * @var string 
     */
    protected $code;
    /**
     * 
     * @var string 
     */
    protected $ipAddress;
    /**
     * 
     * @var timestamp 
     */
    protected $tsRegistro;
    /**
     * 
     * @var string 
     */
    protected $ipAddressResposta;
    /**
     * 
     * @var timestamp 
     */
    protected $tsResposta;
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
    public function getIdPass() {
        return $this->idPass;
    }

    public function setIdPass($value) {
        $this->idPass = $value;
    }

    public function getCode() {
        return $this->code;
    }

    public function setCode($value) {
        $this->code = $value;
    }

    public function getIpAddress() {
        return $this->ipAddress;
    }

    public function setIpAddress($value) {
        $this->ipAddress = $value;
    }

    public function getTsRegistro() {
        return $this->tsRegistro;
    }

    public function setTsRegistro($value) {
        if (!($value instanceof \MTimeStamp)) {
            $value = new \MTimeStamp($value);
        }
        $this->tsRegistro = $value;
    }

    public function getIpAddressResposta() {
        return $this->ipAddressResposta;
    }

    public function setIpAddressResposta($value) {
        $this->ipAddressResposta = $value;
    }

    public function getTsResposta() {
        return $this->tsResposta;
    }

    public function setTsResposta($value) {
        if (!($value instanceof \MTimeStamp)) {
            $value = new \MTimeStamp($value);
        }
        $this->tsResposta = $value;
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