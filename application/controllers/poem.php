<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Poem extends MY_Controller {

  function __construct()
  {
      $this->load->model('Poem_model');
      parent::__construct();
  }

  public function index($poem_id) {
    $query = $this->Poem_model->get_poem($poem_id);    
  }

  public function list_all() {
    $query = $this->Poem_model->get_poems($poem_id);
    foreach ($query->result() as $row)
    {
      echo $row->title;
    }
  }
}
