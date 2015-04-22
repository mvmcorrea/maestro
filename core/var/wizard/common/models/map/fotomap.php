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

class FotoMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Foto',
            'attributes' => array(
                'idFoto' => array('column' => 'idFoto','key' => 'primary','idgenerator' => 'seq_Foto','type' => 'integer'),
                'foto' => array('column' => 'Foto','type' => 'blob'),
                'idMIME' => array('column' => 'idMIME','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'pessoa' => array('toClass' => 'common\models\pessoa', 'cardinality' => 'oneToMany' , 'keys' => 'idFoto:idFoto'), 
                'mimeType' => array('toClass' => 'common\models\mime', 'cardinality' => 'oneToOne' , 'keys' => 'idMIME:idMIME'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idFoto;
    /**
     * 
     * @var blob 
     */
    protected $foto;
    /**
     * 
     * @var integer 
     */
    protected $idMIME;

    /**
     * Associations
     */
    protected $pessoa;
    protected $mimeType;
    

    /**
     * Getters/Setters
     */
    public function getIdFoto() {
        return $this->idFoto;
    }

    public function setIdFoto($value) {
        $this->idFoto = $value;
    }

    public function getFoto() {
        return $this->foto;
    }

    public function setFoto($value) {
        $this->foto = $value;
    }

    public function getIdMIME() {
        return $this->idMIME;
    }

    public function setIdMIME($value) {
        $this->idMIME = $value;
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
    public function getMimeType() {
        if (is_null($this->mimeType)){
            $this->retrieveAssociation("mimeType");
        }
        return  $this->mimeType;
    }
    /**
     *
     * @param Association $value
     */
    public function setMimeType($value) {
        $this->mimeType = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationMimeType() {
        $this->retrieveAssociation("mimeType");
    }

    

}
// end - wizard

?>