<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Poem_model extends CI_Model {

    var $title   = '';
    var $body = '';
    var $scheme    = '';

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
    
    function get_poem($poem_id){
      return $this->db->get_where('poem', array('id', $poem_id));
    }

    function get_poems($poem_id){
      return $this->db->get('poem');
    }
    //function get_last_ten_entries()
    //{
        //$query = $this->db->get('entries', 10);
        //return $query->result();
    //}

    //function insert_entry()
    //{
        //$this->title   = $_POST['title']; // please read the below note
        //$this->content = $_POST['content'];
        //$this->date    = time();

        //$this->db->insert('entries', $this);
    //}

    //function update_entry()
    //{
        //$this->title   = $_POST['title'];
        //$this->content = $_POST['content'];
        //$this->date    = time();

        //$this->db->update('entries', $this, array('id' => $_POST['id']));
    //}

}
