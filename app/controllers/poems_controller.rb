require 'will_paginate/array'

class PoemsController < ApplicationController
  def index
    @poems = Poem.all(:order => 'id DESC').paginate(:page => params[:page], :per_page => 5)
  end
  def my_poems
    if user_signed_in?
      @poems = current_user.poems.order('id DESC').paginate(:page => params[:page], :per_page => 5)
    else
      flash[:error] = "Please sign in to view your poems"
      redirect_to poems_path
    end
  end
  def show
    @poem = Poem.find(params[:id])
  end
  def edit
    @poem = Poem.find(params[:id])
    if !(user_signed_in? && @poem.user == current_user)
      flash[:error] = "Sorry, you can't edit this poem"
      redirect_to poem_path(@poem)
    end
  end
  def update
    @poem = Poem.find(params[:id])
    if user_signed_in? && @poem.user == current_user
      if @poem.update_attributes(params[:poem])
        flash[:notice] = "Poem successfully updated"
      else
        flash[:error] = "There was a problem updating your poem"
      end
      redirect_to edit_poem_path(@poem)
    else
      redirect_to poem_path(@poem)
    end
  end
  def create
    if user_signed_in?
      current_user.poems.create params[:poem]
      redirect_to my_poems_poems_path
    else
      session[:poem] = params[:poem]
      redirect_to new_user_session_path
    end
  end
end