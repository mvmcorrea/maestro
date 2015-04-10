<?php

/* Copyright [2011, 2012, 2013] da Universidade Federal de Juiz de Fora
 * Este arquivo é parte do programa Framework Maestro.
 * O Framework Maestro é um software livre; você pode redistribuí-lo e/ou 
 * modificá-lo dentro dos termos da Licença Pública Geral GNU como publicada 
 * pela Fundação do Software Livre (FSF); na versão 2 da Licença.
 * Este programa é distribuído na esperança que possa ser  útil, 
 * mas SEM NENHUMA GARANTIA; sem uma garantia implícita de ADEQUAÇÃO a qualquer
 * MERCADO ou APLICAÇÃO EM PARTICULAR. Veja a Licença Pública Geral GNU/GPL 
 * em português para maiores detalhes.
 * Você deve ter recebido uma cópia da Licença Pública Geral GNU, sob o título
 * "LICENCA.txt", junto com este programa, se não, acesse o Portal do Software
 * Público Brasileiro no endereço www.softwarepublico.gov.br ou escreva para a 
 * Fundação do Software Livre(FSF) Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301, USA.
 */

class MAjax extends MComponent {

    public $version = '1.0';
    public $responseType;
    public $baseNode;
    public $arguments;
    public $response = NULL;

    public function __construct() {
        parent::__construct();
        // initialize properties
        $this->baseNode = new MAjaxNode();
        $this->baseNode->setName('ajaxResponse');
        $this->baseNode->setAttribute('id', '');
        $this->baseNode->setEncoding('UTF-8');
        $this->response = new stdClass();
        // determine response type
        $this->setResponseType($_REQUEST['ajaxResponseType'] ? : 'TEXT');
    }

    public function initialize($inputEncoding = 'UTF-8') {
        $this->baseNode->setEncoding($inputEncoding);
    }

    public function returnData() {
        switch ($this->responseType) {

            case 'TEXT':
                header('Content-type: text/plain; charset=' . MAjaxTransformer::findOutputCharset($this->baseNode->getEncoding()));
                $data = MAjaxTransformer::toString($this->baseNode);
                return $data;
                break;

            case 'JSON':
            case 'OBJECT':
                $data = MAjaxTransformer::toJSON($this->baseNode);
                $header = 'Content-type: text/plain; ';
                if (Manager::getPage()->fileUpload) {
                    $newdata = "{\"base64\":\"" . base64_encode($data) . "\"}";
                    $data = "<html><body><textarea>$newdata</textarea></body></html>";
                    $header = 'Content-type: text/html; ';
                }
                header($header . 'charset=' . MAjaxTransformer::findOutputCharset($this->baseNode->getEncoding()));
                return $data;
                break;

            case 'E4X':
            case 'XML':
                header('Content-type:  text/xml; charset=' . MAjaxTransformer::findOutputCharset($this->baseNode->getEncoding()));
                $data = '<?xml version="1.0" encoding="' . MAjaxTransformer::find_output_charset($this->baseNode->getEncoding()) . '"?>'
                        . MAjaxTransformer::toXML($this->baseNode);
                return $data;
                break;

            default:
                return 'ERROR: invalid response type \'' . $this->responseType . '\'';
        }
    }

    public function returnJSON() {
        $data = $this->baseNode->getData();
        $header = 'Content-type: application/json; ';
        header($header . 'charset=UTF-8');
        return $data;
    }

    public function addNode($nodeName, $id = '') {
        return $this->baseNode->addNode($nodeName, $id);
    }

    public function setData($data) {
        $this->baseNode->setData($data);
    }

    public function getData() {
        return $this->baseNode->getData();
    }

    public function setId($id) {
        $this->baseNode->setAttribute('id', $id);
    }

    public function getId() {
        return $this->baseNode->getAttribute('id');
    }

    public function setType($type) {
        $this->baseNode->setAttribute('type', $type);
    }

    public function getType() {
        return $this->baseNode->getAttribute('type');
    }

    public function setAttribute($name, $value) {
        $this->baseNode->setAttribute($name, $value);
    }

    public function getAttribute($name) {
        return $this->baseNode->getAttributes($name);
    }

    public function setName($name) {
        $this->baseNode->setName($name);
    }

    public function getName() {
        return $this->baseNode->getName();
    }

    public function getResponseType() {
        return $this->responseType;
    }

    public function setResponseType($value) {
        if (isset($value)) {
            $this->responseType = htmlentities(strip_tags(strtoupper((string) $value)));
        }
    }

    public function isEmpty() {
        return (count($this->baseNode->composites) == 0) && ($this->getData() == '');
    }

    public function setNode($name, $value) {
        $this->baseNode->setNode($name, $value);
    }

}

class MAjaxNode {

    public $composites;
    public $attributes;
    public $nodeName;
    public $data;
    public $inputEncoding;
    public $nodes;

    public function __construct() {
        // initialize properties
        $this->composites = array();
        $this->attributes = array();
        $this->nodes = new stdClass;
        $this->data = '';

        $this->setEncoding('UTF-8');
        $this->setName('');
        $this->setAttribute('id', '');
    }

    public function addNode($nodename, $id = '') {
        $composites = count($this->composites);

        // create new node
        $this->composites[$composites] = new MAjaxNode();
        $this->composites[$composites]->setName($nodename);
        $this->composites[$composites]->setAttribute('id', $id);
        $this->composites[$composites]->setEncoding($this->inputEncoding);

        return $this->composites[$composites];
    }

    public function setNode($nodename, $value = '') {
        $this->nodes->$nodename = $value;
    }

    public function setData($data) {
        $this->nodes->data = $data;
    }

    public function getData() {
        return $this->nodes->data;
    }

    public function setId($id) {
        if ($id != '') {
            $this->setAttribute('id', $id);
        }
    }

    public function getId() {
        return $this->getAttribute('id');
    }

    public function setType($type = '') {
        if ($type != '') {
            $this->setAttribute('type', $type);
        }
    }

    public function getType() {
        return $this->getAttribute('type');
    }

    public function setAttribute($name, $value) {
        $this->attributes[$name] = (string) $value;
    }

    public function getAttribute($name) {
        return $this->attributes[$name];
    }

    public function setName($name) {
        $this->nodeName = (string) $name;
    }

    public function getName() {
        return $this->nodeName;
    }

    public function setEncoding($encoding) {
        $this->inputEncoding = strtoupper((string) $encoding);
    }

    public function getEncoding() {
        return $this->inputEncoding;
    }

}

class MAjaxTransformer {

    public function toString(&$node) {
        $returnValue = '';
        foreach ($node->composites as $composite) {
            $returnValue .= MAjaxTransformer::toString($composite);
        }
        $returnValue .= MAjaxTransformer::encode($node->getData(), $node->getEncoding());
        return $returnValue;
    }

    public function toXML(&$node) {
        $returnValue = '<' . $node->getName();
        // handle attributes
        foreach ($node->attributes as $name => $value) {
            if ($value != '') {
                $returnValue .= ' ' . $name . '="' . $node->getAttribute($name) . '"';
            }
        } // end: foreach

        $returnValue .= '>';

        // handle subnodes
        foreach ($node->composites as $composite) {
            $returnValue .= MAjaxTransformer::toXML($composite);
        }

        $returnValue .= MAjaxTransformer::encode($node->getData(), $node->getEncoding())
                . '</' . $node->get_name() . '>';

        return $returnValue;
    }

    public function toJSON($node) {
        $returnValue = '';
        $JSON_node = new stdClass();
        // handle subnodes
        foreach ($node->composites as $composite) {
            if (!is_array($JSON_node->{$composite->nodeName})) {
                $JSON_node->{$composite->nodeName} = array();
            }
            $JSON_node->{$composite->nodeName}[] = $composite->nodes;
        }
        if ($id = $node->getId()) {
            $JSON_node->id = $id;
        }
        if ($type = $node->getType()) {
            $JSON_node->type = $type;
        }
        // handle nodes
        foreach ($node->nodes as $name => $value) {
            $JSON_node->{$name} = $value;
        }
        $returnValue = MJSON::encode($JSON_node);
        //$returnValue = json_encode($JSON_node);
        return $returnValue;
    }

    public function detectUTF8($string) {
        return preg_match('%(?:
        [\xC2-\xDF][\x80-\xBF]        # non-overlong 2-byte
        |\xE0[\xA0-\xBF][\x80-\xBF]               # excluding overlongs
        |[\xE1-\xEC\xEE\xEF][\x80-\xBF]{2}      # straight 3-byte
        |\xED[\x80-\x9F][\x80-\xBF]               # excluding surrogates
        |\xF0[\x90-\xBF][\x80-\xBF]{2}    # planes 1-3
        |[\xF1-\xF3][\x80-\xBF]{3}                  # planes 4-15
        |\xF4[\x80-\x8F][\x80-\xBF]{2}    # plane 16
        )+%xs', $string);
    }

    public function encode($data, $encoding) {
        if (MAjaxTransformer::detectUTF8($data)) {
            // if UTF-8 data was supplied everything is fine!
            $returnValue = $data;
        } elseif (function_exists('iconv')) {
            // iconv is by far the most flexible approach, try this first
            $returnValue = iconv($encoding, 'UTF-8', $data);
        } elseif ($encoding == 'ISO-8859-1') {
            // for ISO-8859-1 we can use utf8-encode()
            $returnValue = utf8_encode($data);
        } else {
            // give up. if UTF-8 data was supplied everything is fine!
            $returnValue = $data;
        } /* end: if */

        return $returnValue;
    }

    public function decode($data, $encoding) {
        // convert string

        if (is_string($data)) {
            if (!MAjaxTransformer::detectUTF8($data)) {
                $returnValue = $data;
            } elseif (function_exists('iconv')) {
                // iconv is by far the most flexible approach, try this first
                $returnValue = iconv('UTF-8', $encoding, $data);
            } elseif ($encoding == 'ISO-8859-1') {
                // for ISO-8859-1 we can use utf8-decode()
                $returnValue = utf8_decode($data);
            } else {
                // give up. if data was supplied in the correct format everything is fine!
                $returnValue = $data;
            } // end: if
        } else {
            // non-string value
            $returnValue = $data;
        } // end: if

        return $returnValue;
    }

    /**
     * decodes a (nested) array of data from UTF-8 into the configured character set
     *
     * @access   public
     * @param    array     $data         data to convert
     * @param    string    $encoding     character encoding
     * @return   array
     */
    public function decodeArray($data, $encoding) {
        $returnValue = array();

        foreach ($data as $key => $value) {

            if (!is_array($value)) {
                $returnValue[$key] = MAjaxTransformer::decode($value, $encoding);
            } else {
                $returnValue[$key] = MAjaxTransformer::decode_array($value, $encoding);
            }
        }

        return $returnValue;
    }

    /**
     * determines the output character set
     * based on input character set
     *
     * @access   public
     * @param    string    $encoding     character encoding
     * @return   string
     */
    public function findOutputCharset($encoding) {
        $returnValue = 'UTF-8';

        if (function_exists('iconv') || $encoding == 'UTF-8' || $encoding == 'ISO-8859-1') {

            $returnValue = 'UTF-8';
        } else {
            $returnValue = $encoding;
        } // end: if

        return $returnValue;
    }

}

?>