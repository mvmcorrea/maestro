<?php

class MainController extends MController {

    public function main() {
        $this->render();
    }

    public function lookupControl() {
        $file = Manager::getAppPath('public/files/controles.txt');
        $this->data->ini = parse_ini_file($file, true);
        $filter->lookupControl = $this->data->filter0;
        $array = array();
        $filter0 = strtolower(trim($this->data->filter0));
        $n = strlen($filter0);
        foreach ($this->data->ini as $class => $a) {
            if (strtolower(substr($class, 0, $n)) == $filter0) {
                $array[][0] = $class;
            }
        }
        $this->data->array = $array;
        $this->render();
    }

    public function show() {
        $file = Manager::getAppPath('public/files/controles.txt');
        $this->data->ini = parse_ini_file($file, true);
        $this->data->class = $this->data->lookupControl;
        $this->data->description = $this->data->ini[$this->data->class]['description'];
        $this->data->extends = $this->data->ini[$this->data->class]['extends'];
        $this->data->attributes = array();
        $attributes = $this->data->ini[$this->data->class]['attributes'];
        if (is_array($attributes)) {
            foreach ($attributes as $name => $description) {
                $this->data->attributes[$name]['name'] = $name;
                $this->data->attributes[$name]['class'] = $this->data->class;
                $this->data->attributes[$name]['description'] = $description;
            }
        }
        $header = $this->data->ini[$this->data->class];
        $extends = $header['extends'];
        while ($extends) {
            $parent = $this->data->ini[$extends];
            $attributes = $parent['attributes'];
            if (is_array($attributes)) {
                foreach ($attributes as $name => $description) {
                    $this->data->attributes[$name]['name'] = $name;
                    $this->data->attributes[$name]['class'] = $extends;
                    $this->data->attributes[$name]['description'] = $description;
                }
            }
            $extends = $parent['extends'];
        }
        ksort($this->data->attributes);
        $codeXML = Manager::getAppPath('public/files/code/' . strtolower($this->data->class) . '.xml' );
        $this->data->code = highlight_file($codeXML, true);//htmlentities(file_get_contents($codeXML));
        mdump($codeXML);
        mdump($this->data->code);
        $this->render();
    }

}