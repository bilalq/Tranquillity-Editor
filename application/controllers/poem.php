<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Poem extends MY_Controller {

  function __construct()
  {
      parent::__construct();
      $this->load->model('Poem_model');
  }

  public function index($poem_id) {
    $response = $this->Poem_model->get_poem($poem_id);
    var_dump($response);
  }

  public function list_all() {
    $response = $this->Poem_model->get_poems();
    var_dump($response);
  }

  public function create() {
    if ($this->input->post()) {
      $success = $this->Poem_model->insert_poem();
    }
  }

  public function update() {
    if ($this->input->post()) {
      $success = $this->Poem_model->update_poem();
    }
  }
}
