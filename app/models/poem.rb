class Poem < ActiveRecord::Base
  attr_accessible :body, :title, :rhyme_scheme
  belongs_to :user
end
