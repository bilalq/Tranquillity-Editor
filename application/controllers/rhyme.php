<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Rhyme extends MY_Controller {
  
  public function getRhyme($word) {
    echo json_encode($word);
  }

}
