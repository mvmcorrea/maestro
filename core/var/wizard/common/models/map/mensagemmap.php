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

class MensagemMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Mensagem',
            'attributes' => array(
                'idMensagem' => array('column' => 'idMensagem','key' => 'primary','idgenerator' => 'seq_Mensagem','type' => 'integer'),
                'titulo' => array('column' => 'Titulo','type' => 'string'),
                'mensagem' => array('column' => 'Mensagem','type' => 'string'),
            ),
            'associations' => array(
                'grupos' => array('toClass' => 'common\models\grupo', 'cardinality' => 'manyToMany' , 'associative' => 'Grupo_Mensagem'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idMensagem;
    /**
     * 
     * @var string 
     */
    protected $titulo;
    /**
     * 
     * @var string 
     */
    protected $mensagem;

    /**
     * Associations
     */
    protected $grupos;
    

    /**
     * Getters/Setters
     */
    public function getIdMensagem() {
        return $this->idMensagem;
    }

    public function setIdMensagem($value) {
        $this->idMensagem = $value;
    }

    public function getTitulo() {
        return $this->titulo;
    }

    public function setTitulo($value) {
        $this->titulo = $value;
    }

    public function getMensagem() {
        return $this->mensagem;
    }

    public function setMensagem($value) {
        $this->mensagem = $value;
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