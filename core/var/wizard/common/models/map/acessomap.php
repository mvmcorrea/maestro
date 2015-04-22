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

class AcessoMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Acesso',
            'attributes' => array(
                'idAcesso' => array('column' => 'idAcesso','key' => 'primary','idgenerator' => 'seq_Acesso','type' => 'integer'),
                'direito' => array('column' => 'direito','type' => 'EnumDireito'),
                'idTransacao' => array('column' => 'idTransacao','key' => 'foreign','type' => 'integer'),
                'idGrupo' => array('column' => 'idGrupo','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idAcesso;
    /**
     * 
     * @var EnumDireito 
     */
    protected $direito;
    /**
     * 
     * @var integer 
     */
    protected $idTransacao;
    /**
     * 
     * @var integer 
     */
    protected $idGrupo;

    /**
     * Associations
     */
    

    /**
     * Getters/Setters
     */
    public function getIdAcesso() {
        return $this->idAcesso;
    }

    public function setIdAcesso($value) {
        $this->idAcesso = $value;
    }

    public function getDireito() {
        return $this->direito;
    }

    public function setDireito($value) {
        $valid = false;
        if (empty($value)) {
            $config = $this->config();
            $valid = !array_search('notnull',$config['validators']['direito']);
        }
        if (!($valid || EnumDireitoMap::isValid($value))) {
            throw new \EModelException('Valor inválido para a Enumeração EnumDireito');
        }
        $this->direito = $value;
    }

    public function getIdTransacao() {
        return $this->idTransacao;
    }

    public function setIdTransacao($value) {
        $this->idTransacao = $value;
    }

    public function getIdGrupo() {
        return $this->idGrupo;
    }

    public function setIdGrupo($value) {
        $this->idGrupo = $value;
    }

    

}
// end - wizard

?>