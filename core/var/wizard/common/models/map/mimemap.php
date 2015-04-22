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

class MimeMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'MIME',
            'attributes' => array(
                'idMIME' => array('column' => 'idMIME','key' => 'primary','idgenerator' => 'seq_MIME','type' => 'integer'),
                'MIMEType' => array('column' => 'MIMEType','type' => 'string'),
                'extensao' => array('column' => 'Extensao','type' => 'string'),
            ),
            'associations' => array(
                'arquivos' => array('toClass' => 'common\models\arquivo', 'cardinality' => 'oneToMany' , 'keys' => 'idMIME:idMIME'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idMIME;
    /**
     * 
     * @var string 
     */
    protected $MIMEType;
    /**
     * 
     * @var string 
     */
    protected $extensao;

    /**
     * Associations
     */
    protected $arquivos;
    

    /**
     * Getters/Setters
     */
    public function getIdMIME() {
        return $this->idMIME;
    }

    public function setIdMIME($value) {
        $this->idMIME = $value;
    }

    public function getMIMEType() {
        return $this->MIMEType;
    }

    public function setMIMEType($value) {
        $this->MIMEType = $value;
    }

    public function getExtensao() {
        return $this->extensao;
    }

    public function setExtensao($value) {
        $this->extensao = $value;
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

    

}
// end - wizard

?>