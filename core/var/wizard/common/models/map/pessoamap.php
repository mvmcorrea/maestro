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

class PessoaMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'common',
            'table' => 'Pessoa',
            'attributes' => array(
                'idPessoa' => array('column' => 'idPessoa','key' => 'primary','idgenerator' => 'seq_Pessoa','type' => 'integer'),
                'nome' => array('column' => 'Nome','type' => 'string'),
                'CPF' => array('column' => 'CPF','type' => 'cpf'),
                'dataNascimento' => array('column' => 'DataNascimento','type' => 'date'),
                'nomePai' => array('column' => 'NomePai','type' => 'string'),
                'nomeMae' => array('column' => 'NomeMae','type' => 'string'),
                'sexo' => array('column' => 'Sexo','type' => 'string'),
                'estadoCivil' => array('column' => 'EstadoCivil','type' => 'string'),
                'telefone' => array('column' => 'Telefone','type' => 'string'),
                'celular' => array('column' => 'Celular','type' => 'string'),
                'email' => array('column' => 'Email','type' => 'string'),
                'anoChegadaBrasil' => array('column' => 'AnoChegadaBrasil','type' => 'string'),
                'grupoSanguineo' => array('column' => 'GrupoSanguineo','type' => 'string'),
                'fax' => array('column' => 'Fax','type' => 'string'),
                'site' => array('column' => 'Site','type' => 'string'),
                'dataAlteracao' => array('column' => 'DataAlteracao','type' => 'date'),
                'codigoNecessidadeEspecial' => array('column' => 'CodigoNecessidadeEspecial','type' => 'string'),
                'idFoto' => array('column' => 'idFoto','key' => 'foreign','type' => 'integer'),
                'idEndereco' => array('column' => 'idEndereco','key' => 'foreign','type' => 'integer'),
                'idDocumentacao' => array('column' => 'idDocumentacao','key' => 'foreign','type' => 'integer'),
                'idContaCorrente' => array('column' => 'idContaCorrente','key' => 'foreign','type' => 'integer'),
                'idMunicipioNascimento' => array('column' => 'idMunicipioNascimento','key' => 'foreign','type' => 'integer'),
                'idPaisNacionalidade' => array('column' => 'idPaisNacionalidade','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'foto' => array('toClass' => 'common\models\foto', 'cardinality' => 'oneToOne' , 'keys' => 'idFoto:idFoto'), 
                'usuarios' => array('toClass' => 'common\models\usuario', 'cardinality' => 'oneToMany' , 'keys' => 'idPessoa:idPessoa'), 
                'endereco' => array('toClass' => 'common\models\endereco', 'cardinality' => 'oneToOne' , 'keys' => 'idEndereco:idEndereco'), 
                'documentacao' => array('toClass' => 'common\models\documentacao', 'cardinality' => 'oneToOne' , 'keys' => 'idDocumentacao:idDocumentacao'), 
                'contasCorrentes' => array('toClass' => 'common\models\contacorrente', 'cardinality' => 'manyToMany' , 'associative' => 'Pessoa_ContaCorrente'), 
                'contaCorrenteAtiva' => array('toClass' => 'common\models\contacorrente', 'cardinality' => 'oneToOne' , 'keys' => 'idContaCorrente:idContaCorrente'), 
                'municipioNascimento' => array('toClass' => 'common\models\municipio', 'cardinality' => 'oneToOne' , 'keys' => 'idMunicipioNascimento:idMunicipio'), 
                'paisNacionalidade' => array('toClass' => 'common\models\pais', 'cardinality' => 'oneToOne' , 'keys' => 'idPaisNacionalidade:idPais'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idPessoa;
    /**
     * 
     * @var string 
     */
    protected $nome;
    /**
     * 
     * @var cpf 
     */
    protected $CPF;
    /**
     * 
     * @var date 
     */
    protected $dataNascimento;
    /**
     * 
     * @var string 
     */
    protected $nomePai;
    /**
     * 
     * @var string 
     */
    protected $nomeMae;
    /**
     * 
     * @var string 
     */
    protected $sexo;
    /**
     * 
     * @var string 
     */
    protected $estadoCivil;
    /**
     * 
     * @var string 
     */
    protected $telefone;
    /**
     * 
     * @var string 
     */
    protected $celular;
    /**
     * 
     * @var string 
     */
    protected $email;
    /**
     * 
     * @var string 
     */
    protected $anoChegadaBrasil;
    /**
     * 
     * @var string 
     */
    protected $grupoSanguineo;
    /**
     * 
     * @var string 
     */
    protected $fax;
    /**
     * 
     * @var string 
     */
    protected $site;
    /**
     * 
     * @var date 
     */
    protected $dataAlteracao;
    /**
     * 
     * @var string 
     */
    protected $codigoNecessidadeEspecial;
    /**
     * 
     * @var integer 
     */
    protected $idFoto;
    /**
     * 
     * @var integer 
     */
    protected $idEndereco;
    /**
     * 
     * @var integer 
     */
    protected $idDocumentacao;
    /**
     * 
     * @var integer 
     */
    protected $idContaCorrente;
    /**
     * 
     * @var integer 
     */
    protected $idMunicipioNascimento;
    /**
     * 
     * @var integer 
     */
    protected $idPaisNacionalidade;

    /**
     * Associations
     */
    protected $foto;
    protected $usuarios;
    protected $endereco;
    protected $documentacao;
    protected $contasCorrentes;
    protected $contaCorrenteAtiva;
    protected $municipioNascimento;
    protected $paisNacionalidade;
    

    /**
     * Getters/Setters
     */
    public function getIdPessoa() {
        return $this->idPessoa;
    }

    public function setIdPessoa($value) {
        $this->idPessoa = $value;
    }

    public function getNome() {
        return $this->nome;
    }

    public function setNome($value) {
        $this->nome = $value;
    }

    public function getCPF() {
        return $this->CPF;
    }

    public function setCPF($value) {
        if (!($value instanceof \MCPF)) {
            $value = new \MCPF($value);
        }
        $this->CPF = $value;
    }

    public function getDataNascimento() {
        return $this->dataNascimento;
    }

    public function setDataNascimento($value) {
        if (!($value instanceof \MDate)) {
            $value = new \MDate($value);
        }
        $this->dataNascimento = $value;
    }

    public function getNomePai() {
        return $this->nomePai;
    }

    public function setNomePai($value) {
        $this->nomePai = $value;
    }

    public function getNomeMae() {
        return $this->nomeMae;
    }

    public function setNomeMae($value) {
        $this->nomeMae = $value;
    }

    public function getSexo() {
        return $this->sexo;
    }

    public function setSexo($value) {
        $this->sexo = $value;
    }

    public function getEstadoCivil() {
        return $this->estadoCivil;
    }

    public function setEstadoCivil($value) {
        $this->estadoCivil = $value;
    }

    public function getTelefone() {
        return $this->telefone;
    }

    public function setTelefone($value) {
        $this->telefone = $value;
    }

    public function getCelular() {
        return $this->celular;
    }

    public function setCelular($value) {
        $this->celular = $value;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($value) {
        $this->email = $value;
    }

    public function getAnoChegadaBrasil() {
        return $this->anoChegadaBrasil;
    }

    public function setAnoChegadaBrasil($value) {
        $this->anoChegadaBrasil = $value;
    }

    public function getGrupoSanguineo() {
        return $this->grupoSanguineo;
    }

    public function setGrupoSanguineo($value) {
        $this->grupoSanguineo = $value;
    }

    public function getFax() {
        return $this->fax;
    }

    public function setFax($value) {
        $this->fax = $value;
    }

    public function getSite() {
        return $this->site;
    }

    public function setSite($value) {
        $this->site = $value;
    }

    public function getDataAlteracao() {
        return $this->dataAlteracao;
    }

    public function setDataAlteracao($value) {
        if (!($value instanceof \MDate)) {
            $value = new \MDate($value);
        }
        $this->dataAlteracao = $value;
    }

    public function getCodigoNecessidadeEspecial() {
        return $this->codigoNecessidadeEspecial;
    }

    public function setCodigoNecessidadeEspecial($value) {
        $this->codigoNecessidadeEspecial = $value;
    }

    public function getIdFoto() {
        return $this->idFoto;
    }

    public function setIdFoto($value) {
        $this->idFoto = $value;
    }

    public function getIdEndereco() {
        return $this->idEndereco;
    }

    public function setIdEndereco($value) {
        $this->idEndereco = $value;
    }

    public function getIdDocumentacao() {
        return $this->idDocumentacao;
    }

    public function setIdDocumentacao($value) {
        $this->idDocumentacao = $value;
    }

    public function getIdContaCorrente() {
        return $this->idContaCorrente;
    }

    public function setIdContaCorrente($value) {
        $this->idContaCorrente = $value;
    }

    public function getIdMunicipioNascimento() {
        return $this->idMunicipioNascimento;
    }

    public function setIdMunicipioNascimento($value) {
        $this->idMunicipioNascimento = $value;
    }

    public function getIdPaisNacionalidade() {
        return $this->idPaisNacionalidade;
    }

    public function setIdPaisNacionalidade($value) {
        $this->idPaisNacionalidade = $value;
    }
    /**
     *
     * @return Association
     */
    public function getFoto() {
        if (is_null($this->foto)){
            $this->retrieveAssociation("foto");
        }
        return  $this->foto;
    }
    /**
     *
     * @param Association $value
     */
    public function setFoto($value) {
        $this->foto = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationFoto() {
        $this->retrieveAssociation("foto");
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
    public function getEndereco() {
        if (is_null($this->endereco)){
            $this->retrieveAssociation("endereco");
        }
        return  $this->endereco;
    }
    /**
     *
     * @param Association $value
     */
    public function setEndereco($value) {
        $this->endereco = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationEndereco() {
        $this->retrieveAssociation("endereco");
    }
    /**
     *
     * @return Association
     */
    public function getDocumentacao() {
        if (is_null($this->documentacao)){
            $this->retrieveAssociation("documentacao");
        }
        return  $this->documentacao;
    }
    /**
     *
     * @param Association $value
     */
    public function setDocumentacao($value) {
        $this->documentacao = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationDocumentacao() {
        $this->retrieveAssociation("documentacao");
    }
    /**
     *
     * @return Association
     */
    public function getContasCorrentes() {
        if (is_null($this->contasCorrentes)){
            $this->retrieveAssociation("contasCorrentes");
        }
        return  $this->contasCorrentes;
    }
    /**
     *
     * @param Association $value
     */
    public function setContasCorrentes($value) {
        $this->contasCorrentes = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationContasCorrentes() {
        $this->retrieveAssociation("contasCorrentes");
    }
    /**
     *
     * @return Association
     */
    public function getContaCorrenteAtiva() {
        if (is_null($this->contaCorrenteAtiva)){
            $this->retrieveAssociation("contaCorrenteAtiva");
        }
        return  $this->contaCorrenteAtiva;
    }
    /**
     *
     * @param Association $value
     */
    public function setContaCorrenteAtiva($value) {
        $this->contaCorrenteAtiva = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationContaCorrenteAtiva() {
        $this->retrieveAssociation("contaCorrenteAtiva");
    }
    /**
     *
     * @return Association
     */
    public function getMunicipioNascimento() {
        if (is_null($this->municipioNascimento)){
            $this->retrieveAssociation("municipioNascimento");
        }
        return  $this->municipioNascimento;
    }
    /**
     *
     * @param Association $value
     */
    public function setMunicipioNascimento($value) {
        $this->municipioNascimento = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationMunicipioNascimento() {
        $this->retrieveAssociation("municipioNascimento");
    }
    /**
     *
     * @return Association
     */
    public function getPaisNacionalidade() {
        if (is_null($this->paisNacionalidade)){
            $this->retrieveAssociation("paisNacionalidade");
        }
        return  $this->paisNacionalidade;
    }
    /**
     *
     * @param Association $value
     */
    public function setPaisNacionalidade($value) {
        $this->paisNacionalidade = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationPaisNacionalidade() {
        $this->retrieveAssociation("paisNacionalidade");
    }

    

}
// end - wizard

?>