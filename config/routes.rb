Tranquillity::Application.routes.draw do
  authenticated :user do
    root :to => 'home#index'
  end
  root :to => "home#index"
  resources :poems do
    get 'my_poems', :on => :collection
  end
  devise_for :users
  resources :users
end