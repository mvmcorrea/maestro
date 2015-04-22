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

class SetorMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Setor',
            'attributes' => array(
                'idSetor' => array('column' => 'idSetor','key' => 'primary','idgenerator' => 'seq_Setor','type' => 'integer'),
                'sigla' => array('column' => 'Sigla','type' => 'string'),
                'nome' => array('column' => 'Nome','type' => 'string'),
                'dataInicio' => array('column' => 'DataInicio','type' => 'date'),
                'dataFim' => array('column' => 'DataFim','type' => 'date'),
                'telefone' => array('column' => 'Telefone','type' => 'string'),
                'fax' => array('column' => 'Fax','type' => 'string'),
                'localizacao' => array('column' => 'Localizacao','type' => 'string'),
                'idTipoSetor' => array('column' => 'idTipoSetor','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'usuarios' => array('toClass' => 'common\models\usuario', 'cardinality' => 'oneToMany' , 'keys' => 'idSetor:idSetor'), 
                'setorAcessoPai' => array('toClass' => 'common\models\setoracesso', 'cardinality' => 'oneToMany' , 'keys' => 'idSetor:idSetorPai'), 
                'setorOrganogramaPai' => array('toClass' => 'common\models\setororganograma', 'cardinality' => 'oneToMany' , 'keys' => 'idSetor:idSetorFilho'), 
                'setorOrganogramaFilho' => array('toClass' => 'common\models\setororganograma', 'cardinality' => 'oneToMany' , 'keys' => 'idSetor:idSetorPai'), 
                'equivalentes' => array('toClass' => 'common\models\setor', 'cardinality' => 'manyToMany' , 'associative' => 'Setor_Setor'), 
                'setorAcessoFilho' => array('toClass' => 'common\models\setoracesso', 'cardinality' => 'oneToMany' , 'keys' => 'idSetor:idSetorFilho'), 
                'dependencia' => array('toClass' => 'common\models\dependencia', 'cardinality' => 'oneToMany' , 'keys' => 'idSetor:idSetor'), 
                'tipoSetor' => array('toClass' => 'common\models\tiposetor', 'cardinality' => 'oneToOne' , 'keys' => 'idTipoSetor:idTipoSetor'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idSetor;
    /**
     * 
     * @var string 
     */
    protected $sigla;
    /**
     * 
     * @var string 
     */
    protected $nome;
    /**
     * 
     * @var date 
     */
    protected $dataInicio;
    /**
     * 
     * @var date 
     */
    protected $dataFim;
    /**
     * 
     * @var string 
     */
    protected $telefone;
    /**
     * 
     * @var string 
     */
    protected $fax;
    /**
     * 
     * @var string 
     */
    protected $localizacao;
    /**
     * 
     * @var integer 
     */
    protected $idTipoSetor;

    /**
     * Associations
     */
    protected $usuarios;
    protected $setorAcessoPai;
    protected $setorOrganogramaPai;
    protected $setorOrganogramaFilho;
    protected $equivalentes;
    protected $setorAcessoFilho;
    protected $dependencia;
    protected $tipoSetor;
    

    /**
     * Getters/Setters
     */
    public function getIdSetor() {
        return $this->idSetor;
    }

    public function setIdSetor($value) {
        $this->idSetor = $value;
    }

    public function getSigla() {
        return $this->sigla;
    }

    public function setSigla($value) {
        $this->sigla = $value;
    }

    public function getNome() {
        return $this->nome;
    }

    public function setNome($value) {
        $this->nome = $value;
    }

    public function getDataInicio() {
        return $this->dataInicio;
    }

    public function setDataInicio($value) {
        if (!($value instanceof \MDate)) {
            $value = new \MDate($value);
        }
        $this->dataInicio = $value;
    }

    public function getDataFim() {
        return $this->dataFim;
    }

    public function setDataFim($value) {
        if (!($value instanceof \MDate)) {
            $value = new \MDate($value);
        }
        $this->dataFim = $value;
    }

    public function getTelefone() {
        return $this->telefone;
    }

    public function setTelefone($value) {
        $this->telefone = $value;
    }

    public function getFax() {
        return $this->fax;
    }

    public function setFax($value) {
        $this->fax = $value;
    }

    public function getLocalizacao() {
        return $this->localizacao;
    }

    public function setLocalizacao($value) {
        $this->localizacao = $value;
    }

    public function getIdTipoSetor() {
        return $this->idTipoSetor;
    }

    public function setIdTipoSetor($value) {
        $this->idTipoSetor = $value;
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
    public function getSetorAcessoPai() {
        if (is_null($this->setorAcessoPai)){
            $this->retrieveAssociation("setorAcessoPai");
        }
        return  $this->setorAcessoPai;
    }
    /**
     *
     * @param Association $value
     */
    public function setSetorAcessoPai($value) {
        $this->setorAcessoPai = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationSetorAcessoPai() {
        $this->retrieveAssociation("setorAcessoPai");
    }
    /**
     *
     * @return Association
     */
    public function getSetorOrganogramaPai() {
        if (is_null($this->setorOrganogramaPai)){
            $this->retrieveAssociation("setorOrganogramaPai");
        }
        return  $this->setorOrganogramaPai;
    }
    /**
     *
     * @param Association $value
     */
    public function setSetorOrganogramaPai($value) {
        $this->setorOrganogramaPai = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationSetorOrganogramaPai() {
        $this->retrieveAssociation("setorOrganogramaPai");
    }
    /**
     *
     * @return Association
     */
    public function getSetorOrganogramaFilho() {
        if (is_null($this->setorOrganogramaFilho)){
            $this->retrieveAssociation("setorOrganogramaFilho");
        }
        return  $this->setorOrganogramaFilho;
    }
    /**
     *
     * @param Association $value
     */
    public function setSetorOrganogramaFilho($value) {
        $this->setorOrganogramaFilho = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationSetorOrganogramaFilho() {
        $this->retrieveAssociation("setorOrganogramaFilho");
    }
    /**
     *
     * @return Association
     */
    public function getEquivalentes() {
        if (is_null($this->equivalentes)){
            $this->retrieveAssociation("equivalentes");
        }
        return  $this->equivalentes;
    }
    /**
     *
     * @param Association $value
     */
    public function setEquivalentes($value) {
        $this->equivalentes = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationEquivalentes() {
        $this->retrieveAssociation("equivalentes");
    }
    /**
     *
     * @return Association
     */
    public function getSetorAcessoFilho() {
        if (is_null($this->setorAcessoFilho)){
            $this->retrieveAssociation("setorAcessoFilho");
        }
        return  $this->setorAcessoFilho;
    }
    /**
     *
     * @param Association $value
     */
    public function setSetorAcessoFilho($value) {
        $this->setorAcessoFilho = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationSetorAcessoFilho() {
        $this->retrieveAssociation("setorAcessoFilho");
    }
    /**
     *
     * @return Association
     */
    public function getDependencia() {
        if (is_null($this->dependencia)){
            $this->retrieveAssociation("dependencia");
        }
        return  $this->dependencia;
    }
    /**
     *
     * @param Association $value
     */
    public function setDependencia($value) {
        $this->dependencia = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationDependencia() {
        $this->retrieveAssociation("dependencia");
    }
    /**
     *
     * @return Association
     */
    public function getTipoSetor() {
        if (is_null($this->tipoSetor)){
            $this->retrieveAssociation("tipoSetor");
        }
        return  $this->tipoSetor;
    }
    /**
     *
     * @param Association $value
     */
    public function setTipoSetor($value) {
        $this->tipoSetor = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationTipoSetor() {
        $this->retrieveAssociation("tipoSetor");
    }

    

}
// end - wizard

?>