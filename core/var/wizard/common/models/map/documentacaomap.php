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

class DocumentacaoMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Documentacao',
            'attributes' => array(
                'idDocumentacao' => array('column' => 'idDocumentacao','key' => 'primary','idgenerator' => 'seq_Documentacao','type' => 'integer'),
                'numeroRG' => array('column' => 'NumeroRG','type' => 'string'),
                'tipoRG' => array('column' => 'TipoRG','type' => 'string'),
                'dataRG' => array('column' => 'DataRG','type' => 'date'),
                'orgaoRG' => array('column' => 'OrgaoRG','type' => 'string'),
                'UFRG' => array('column' => 'UFRG','type' => 'string'),
                'numeroCarteiraProfissional' => array('column' => 'NumeroCarteiraProfissional','type' => 'string'),
                'serieCarteiraProfissional' => array('column' => 'SerieCarteiraProfissional','type' => 'string'),
                'UFCarteiraProfissional' => array('column' => 'UFCarteiraProfissional','type' => 'string'),
                'tituloEleitor' => array('column' => 'TituloEleitor','type' => 'string'),
                'zonaTitulo' => array('column' => 'ZonaTitulo','type' => 'string'),
                'secaoTitulo' => array('column' => 'SecaoTitulo','type' => 'string'),
                'UFTitulo' => array('column' => 'UFTitulo','type' => 'string'),
                'numeroDocumentoMilitar' => array('column' => 'NumeroDocumentoMilitar','type' => 'string'),
                'serieDocumentoMilitar' => array('column' => 'SerieDocumentoMilitar','type' => 'string'),
                'categoriaDocumentoMilitar' => array('column' => 'CategoriaDocumentoMilitar','type' => 'string'),
                'tipoDocumentoMilitar' => array('column' => 'TipoDocumentoMilitar','type' => 'string'),
                'orgaoExpedidorDocumentoMilitar' => array('column' => 'OrgaoExpedidorDocumentoMilitar','type' => 'string'),
                'numeroCertidao' => array('column' => 'NumeroCertidao','type' => 'string'),
                'livroCertidao' => array('column' => 'LivroCertidao','type' => 'string'),
                'folhaCertidao' => array('column' => 'FolhaCertidao','type' => 'string'),
                'cartorio' => array('column' => 'Cartorio','type' => 'string'),
                'PISPASEP' => array('column' => 'PISPASEP','type' => 'string'),
                'dataPISPASEP' => array('column' => 'DataPISPASEP','type' => 'date'),
                'identidadeProfissional' => array('column' => 'IdentidadeProfissional','type' => 'string'),
                'tipoIdentidadeProfissional' => array('column' => 'TipoIdentidadeProfissional','type' => 'string'),
                'dataCarteiraEstudante' => array('column' => 'DataCarteiraEstudante','type' => 'date'),
                'passaporte' => array('column' => 'Passaporte','type' => 'string'),
                'idBancoPISPASEP' => array('column' => 'idBancoPISPASEP','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'bancoPISPASEP' => array('toClass' => 'common\models\banco', 'cardinality' => 'oneToOne' , 'keys' => 'idBancoPISPASEP:idBanco'), 
                'pessoa' => array('toClass' => 'common\models\pessoa', 'cardinality' => 'oneToOne' , 'keys' => 'idDocumentacao:idDocumentacao'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idDocumentacao;
    /**
     * 
     * @var string 
     */
    protected $numeroRG;
    /**
     * 
     * @var string 
     */
    protected $tipoRG;
    /**
     * 
     * @var date 
     */
    protected $dataRG;
    /**
     * 
     * @var string 
     */
    protected $orgaoRG;
    /**
     * 
     * @var string 
     */
    protected $UFRG;
    /**
     * 
     * @var string 
     */
    protected $numeroCarteiraProfissional;
    /**
     * 
     * @var string 
     */
    protected $serieCarteiraProfissional;
    /**
     * 
     * @var string 
     */
    protected $UFCarteiraProfissional;
    /**
     * 
     * @var string 
     */
    protected $tituloEleitor;
    /**
     * 
     * @var string 
     */
    protected $zonaTitulo;
    /**
     * 
     * @var string 
     */
    protected $secaoTitulo;
    /**
     * 
     * @var string 
     */
    protected $UFTitulo;
    /**
     * 
     * @var string 
     */
    protected $numeroDocumentoMilitar;
    /**
     * 
     * @var string 
     */
    protected $serieDocumentoMilitar;
    /**
     * 
     * @var string 
     */
    protected $categoriaDocumentoMilitar;
    /**
     * 
     * @var string 
     */
    protected $tipoDocumentoMilitar;
    /**
     * 
     * @var string 
     */
    protected $orgaoExpedidorDocumentoMilitar;
    /**
     * 
     * @var string 
     */
    protected $numeroCertidao;
    /**
     * 
     * @var string 
     */
    protected $livroCertidao;
    /**
     * 
     * @var string 
     */
    protected $folhaCertidao;
    /**
     * 
     * @var string 
     */
    protected $cartorio;
    /**
     * 
     * @var string 
     */
    protected $PISPASEP;
    /**
     * 
     * @var date 
     */
    protected $dataPISPASEP;
    /**
     * 
     * @var string 
     */
    protected $identidadeProfissional;
    /**
     * 
     * @var string 
     */
    protected $tipoIdentidadeProfissional;
    /**
     * 
     * @var date 
     */
    protected $dataCarteiraEstudante;
    /**
     * 
     * @var string 
     */
    protected $passaporte;
    /**
     * 
     * @var integer 
     */
    protected $idBancoPISPASEP;

    /**
     * Associations
     */
    protected $bancoPISPASEP;
    protected $pessoa;
    

    /**
     * Getters/Setters
     */
    public function getIdDocumentacao() {
        return $this->idDocumentacao;
    }

    public function setIdDocumentacao($value) {
        $this->idDocumentacao = $value;
    }

    public function getNumeroRG() {
        return $this->numeroRG;
    }

    public function setNumeroRG($value) {
        $this->numeroRG = $value;
    }

    public function getTipoRG() {
        return $this->tipoRG;
    }

    public function setTipoRG($value) {
        $this->tipoRG = $value;
    }

    public function getDataRG() {
        return $this->dataRG;
    }

    public function setDataRG($value) {
        if (!($value instanceof \MDate)) {
            $value = new \MDate($value);
        }
        $this->dataRG = $value;
    }

    public function getOrgaoRG() {
        return $this->orgaoRG;
    }

    public function setOrgaoRG($value) {
        $this->orgaoRG = $value;
    }

    public function getUFRG() {
        return $this->UFRG;
    }

    public function setUFRG($value) {
        $this->UFRG = $value;
    }

    public function getNumeroCarteiraProfissional() {
        return $this->numeroCarteiraProfissional;
    }

    public function setNumeroCarteiraProfissional($value) {
        $this->numeroCarteiraProfissional = $value;
    }

    public function getSerieCarteiraProfissional() {
        return $this->serieCarteiraProfissional;
    }

    public function setSerieCarteiraProfissional($value) {
        $this->serieCarteiraProfissional = $value;
    }

    public function getUFCarteiraProfissional() {
        return $this->UFCarteiraProfissional;
    }

    public function setUFCarteiraProfissional($value) {
        $this->UFCarteiraProfissional = $value;
    }

    public function getTituloEleitor() {
        return $this->tituloEleitor;
    }

    public function setTituloEleitor($value) {
        $this->tituloEleitor = $value;
    }

    public function getZonaTitulo() {
        return $this->zonaTitulo;
    }

    public function setZonaTitulo($value) {
        $this->zonaTitulo = $value;
    }

    public function getSecaoTitulo() {
        return $this->secaoTitulo;
    }

    public function setSecaoTitulo($value) {
        $this->secaoTitulo = $value;
    }

    public function getUFTitulo() {
        return $this->UFTitulo;
    }

    public function setUFTitulo($value) {
        $this->UFTitulo = $value;
    }

    public function getNumeroDocumentoMilitar() {
        return $this->numeroDocumentoMilitar;
    }

    public function setNumeroDocumentoMilitar($value) {
        $this->numeroDocumentoMilitar = $value;
    }

    public function getSerieDocumentoMilitar() {
        return $this->serieDocumentoMilitar;
    }

    public function setSerieDocumentoMilitar($value) {
        $this->serieDocumentoMilitar = $value;
    }

    public function getCategoriaDocumentoMilitar() {
        return $this->categoriaDocumentoMilitar;
    }

    public function setCategoriaDocumentoMilitar($value) {
        $this->categoriaDocumentoMilitar = $value;
    }

    public function getTipoDocumentoMilitar() {
        return $this->tipoDocumentoMilitar;
    }

    public function setTipoDocumentoMilitar($value) {
        $this->tipoDocumentoMilitar = $value;
    }

    public function getOrgaoExpedidorDocumentoMilitar() {
        return $this->orgaoExpedidorDocumentoMilitar;
    }

    public function setOrgaoExpedidorDocumentoMilitar($value) {
        $this->orgaoExpedidorDocumentoMilitar = $value;
    }

    public function getNumeroCertidao() {
        return $this->numeroCertidao;
    }

    public function setNumeroCertidao($value) {
        $this->numeroCertidao = $value;
    }

    public function getLivroCertidao() {
        return $this->livroCertidao;
    }

    public function setLivroCertidao($value) {
        $this->livroCertidao = $value;
    }

    public function getFolhaCertidao() {
        return $this->folhaCertidao;
    }

    public function setFolhaCertidao($value) {
        $this->folhaCertidao = $value;
    }

    public function getCartorio() {
        return $this->cartorio;
    }

    public function setCartorio($value) {
        $this->cartorio = $value;
    }

    public function getPISPASEP() {
        return $this->PISPASEP;
    }

    public function setPISPASEP($value) {
        $this->PISPASEP = $value;
    }

    public function getDataPISPASEP() {
        return $this->dataPISPASEP;
    }

    public function setDataPISPASEP($value) {
        if (!($value instanceof \MDate)) {
            $value = new \MDate($value);
        }
        $this->dataPISPASEP = $value;
    }

    public function getIdentidadeProfissional() {
        return $this->identidadeProfissional;
    }

    public function setIdentidadeProfissional($value) {
        $this->identidadeProfissional = $value;
    }

    public function getTipoIdentidadeProfissional() {
        return $this->tipoIdentidadeProfissional;
    }

    public function setTipoIdentidadeProfissional($value) {
        $this->tipoIdentidadeProfissional = $value;
    }

    public function getDataCarteiraEstudante() {
        return $this->dataCarteiraEstudante;
    }

    public function setDataCarteiraEstudante($value) {
        if (!($value instanceof \MDate)) {
            $value = new \MDate($value);
        }
        $this->dataCarteiraEstudante = $value;
    }

    public function getPassaporte() {
        return $this->passaporte;
    }

    public function setPassaporte($value) {
        $this->passaporte = $value;
    }

    public function getIdBancoPISPASEP() {
        return $this->idBancoPISPASEP;
    }

    public function setIdBancoPISPASEP($value) {
        $this->idBancoPISPASEP = $value;
    }
    /**
     *
     * @return Association
     */
    public function getBancoPISPASEP() {
        if (is_null($this->bancoPISPASEP)){
            $this->retrieveAssociation("bancoPISPASEP");
        }
        return  $this->bancoPISPASEP;
    }
    /**
     *
     * @param Association $value
     */
    public function setBancoPISPASEP($value) {
        $this->bancoPISPASEP = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationBancoPISPASEP() {
        $this->retrieveAssociation("bancoPISPASEP");
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

    

}
// end - wizard

?>