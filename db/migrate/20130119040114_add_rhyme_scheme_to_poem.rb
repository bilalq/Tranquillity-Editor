class AddRhymeSchemeToPoem < ActiveRecord::Migration
  def change
    add_column :poems, :rhyme_scheme, :string
  end
end
