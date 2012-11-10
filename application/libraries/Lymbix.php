<?php

class Lymbix {

  const API_BASE = 'https://gyrus.lymbix.com/';
  const TONALIZE_MULTIPLE = 'tonalize_multiple';
  const TONALIZE_DETAILED = 'tonalize_detailed';
  const TONALIZE = 'tonalize';
  const FLAG_RESPONSE = 'flag_response';

  private $authenticationKey = null;

  /**
  * @param  string  $authenticationKey  your Lymbix authentication key
  */
  public function Lymbix($authenticationKey) {
    if (empty($authenticationKey)) {
      throw new Exception('You must include your authentication key');
    }

    $this->authenticationKey = $authenticationKey;
  }

  /* utility functions */
  
  private static function Post($url, $data, $headers)
  {
    $dataString = http_build_query($data);

    $headerString = '';
    foreach ($headers as $headerKey => $headerValue) {
      $headerString .= "$headerKey: $headerValue\n";
    }

    $opts = array('http' =>
      array(
        'method' => 'POST',
        'header' => $headerString,
        'content' => $dataString
      )
    );

    $context = stream_context_create($opts);
    return file_get_contents($url, false, $context);
  }

  private function getHeaders()
  {
    $headers = array();
    $headers['Authentication'] = $this->authenticationKey;
    $headers['Accept'] = 'application/json';
    $headers['Version'] = '2.2';
    return $headers;
  }

  /* api methods */
  
  /**
  * tonalize multiple articles
  *
  * @param    array   $articles articles to tonalize
  * @param    array   $options  additional parameters (reference_ids and return_fields)
  * @return   object  see the api documentation for the format of this object
  */
  public function TonalizeMultiple($articles, $options = null) {
    if (empty($articles)) {
      throw new Exception('You must include articles to tonalize');
    }
    
    $url = self::API_BASE . self::TONALIZE_MULTIPLE;
    $articles = json_encode($articles);
    $data = array('articles' => $articles);

    if (isset($options)) {
      // return_fields & reference_ids
      foreach ($options as $key => $value) {
        $options[$key] = json_encode($value);
      }
      $data = array_merge($data, $options);
    }

    $headers = $this->getHeaders();
    $response = self::Post($url, $data, $headers);
    if (!$response) return false;
    return json_decode($response);
  }

  /**
  * tonalize an article
  *
  * @param    string  $article  article to tonalize
  * @param    array   $options  additional parameters (reference_id and return_fields)
  * @return   object  see the api documentation for the format of this object
  */
  public function TonalizeDetailed($article, $options = null) {
    if (empty($article)) {
      throw new Exception('You must include an article to tonalize');
    }
    
    $url = self::API_BASE . self::TONALIZE_DETAILED;
    $data = array('article' => $article);

    if (isset($options)) {
      // return_fields & reference_id
      foreach ($options as $key => $value) {
        $options[$key] = json_encode($value);
      }
      $data = array_merge($data, $options);
    }

    $headers = $this->getHeaders();
    $response = self::Post($url, $data, $headers);
    if (!$response) return false;
    return json_decode($response);
  }

  /**
  * tonalize an article
  *
  * @param    string  $article  article to tonalize
  * @param    array   $options  additional parameters (reference_id and return_fields)
  * @return   object  see the api documentation for the format of this object
  */
  public function Tonalize($article, $options = null) {
    if (empty($article)) {
      throw new Exception('You must include an article to tonalize');
    }
    
    $url = self::API_BASE . self::TONALIZE;
    $data = array('article' => $article);

    if (isset($options)) {
      // return_fields & reference_id
      foreach ($options as $key => $value) {
        $options[$key] = json_encode($value);
      }
      $data = array_merge($data, $options);
    }

    $headers = $this->getHeaders();
    $response = self::Post($url, $data, $headers);
    if (!$response) return false;
    return json_decode($response);
  }

  /**
  * flag a response as inaccurate 
  *
  * @param    string  $phrase       the phrase that returns an inaccurate response
  * @param    string  $apiMethod    the method that returns an inaccurate response
  * @param    string  $apiVersion   the version that returns an inaccurate response
  * @param    string  $callbackUrl  a url to call when the phrase has been re-rated
  * @param    array   $options      additional parameters (reference_id)
  * @return   string  see the api documentation for this method's response
  */
  public function FlagResponse($phrase, $apiMethod = null, $apiVersion = '2.2', $callbackUrl = null, $options = null) {
    if (empty($phrase)) {
      throw new Exception('You must include a phrase to flag');
    }
    
    $url = self::API_BASE . self::FLAG_RESPONSE;
    $data = array('phrase' => $phrase);

    if (isset($apiMethod)) $data['apiMethod'] = $apiMethod;
    if (isset($apiVersion)) $data['apiVersion'] = $apiVersion;
    if (isset($callbackUrl)) $data['callbackUrl'] = $callbackUrl;

    if (isset($options)) {
      // reference_id
      foreach ($options as $key => $value) {
        $options[$key] = json_encode($value);
      }
      $data = array_merge($data, $options);
    }

    $headers = $this->getHeaders();
    $response = self::Post($url, $data, $headers);
    return $response;
  }
}
