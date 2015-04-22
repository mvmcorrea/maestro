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

class EnderecoMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Endereco',
            'attributes' => array(
                'idEndereco' => array('column' => 'idEndereco','key' => 'primary','idgenerator' => 'seq_Endereco','type' => 'integer'),
                'endereco' => array('column' => 'Endereco','type' => 'string'),
                'bairro' => array('column' => 'Bairro','type' => 'string'),
                'CEP' => array('column' => 'CEP','type' => 'string'),
                'idMunicipio' => array('column' => 'idMunicipio','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'municipio' => array('toClass' => 'common\models\municipio', 'cardinality' => 'oneToOne' , 'keys' => 'idMunicipio:idMunicipio'), 
                'pessoas' => array('toClass' => 'common\models\pessoa', 'cardinality' => 'oneToMany' , 'keys' => 'idEndereco:idEndereco'), 
                'instituicao' => array('toClass' => 'common\models\instituicao', 'cardinality' => 'oneToMany' , 'keys' => 'idEndereco:idEndereco'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idEndereco;
    /**
     * 
     * @var string 
     */
    protected $endereco;
    /**
     * 
     * @var string 
     */
    protected $bairro;
    /**
     * 
     * @var string 
     */
    protected $CEP;
    /**
     * 
     * @var integer 
     */
    protected $idMunicipio;

    /**
     * Associations
     */
    protected $municipio;
    protected $pessoas;
    protected $instituicao;
    

    /**
     * Getters/Setters
     */
    public function getIdEndereco() {
        return $this->idEndereco;
    }

    public function setIdEndereco($value) {
        $this->idEndereco = $value;
    }

    public function getEndereco() {
        return $this->endereco;
    }

    public function setEndereco($value) {
        $this->endereco = $value;
    }

    public function getBairro() {
        return $this->bairro;
    }

    public function setBairro($value) {
        $this->bairro = $value;
    }

    public function getCEP() {
        return $this->CEP;
    }

    public function setCEP($value) {
        $this->CEP = $value;
    }

    public function getIdMunicipio() {
        return $this->idMunicipio;
    }

    public function setIdMunicipio($value) {
        $this->idMunicipio = $value;
    }
    /**
     *
     * @return Association
     */
    public function getMunicipio() {
        if (is_null($this->municipio)){
            $this->retrieveAssociation("municipio");
        }
        return  $this->municipio;
    }
    /**
     *
     * @param Association $value
     */
    public function setMunicipio($value) {
        $this->municipio = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationMunicipio() {
        $this->retrieveAssociation("municipio");
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
    public function getInstituicao() {
        if (is_null($this->instituicao)){
            $this->retrieveAssociation("instituicao");
        }
        return  $this->instituicao;
    }
    /**
     *
     * @param Association $value
     */
    public function setInstituicao($value) {
        $this->instituicao = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationInstituicao() {
        $this->retrieveAssociation("instituicao");
    }

    

}
// end - wizard

?>