<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Poem_model extends CI_Model {

  var $title   = '';
  var $body = '';
  var $scheme    = '';

  function __construct()
  {
    parent::__construct();
  }

  function get_poem($poem_id){
    return $this->db->select('*')
      ->from('poem')
      ->where('`id` =', '1', false)
      ->get()
      ->result();
  }

  function get_poems($poem_id){
    return $this->db->get('poem')->result();;
  }

  function insert_poem()
  {
    $this->title   = $this->input->post('title');
    $this->body = $this->input->post('body');
    $this->scheme = $this->input->post('scheme');

    $this->db->insert('poem', $this);
  }

  function update_poem()
  {
    $title = $this->input->post('title');
    $body = $this->input->post('body');
    $scheme = $this->input->post('scheme');

    $this->title  = isset($title) ? $title : $this->$title;
    $this->body = isset($body) ? $body : $this->$body;
    $this->scheme =  isset($scheme) ? $scheme : $this->$scheme;
    $this->db->update('poem', $this, array('id' => $this->input->post('id')));
  }

}
