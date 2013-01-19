class CreatePoems < ActiveRecord::Migration
  def change
    create_table :poems do |t|
      t.string :title
      t.text :body
      t.integer :views, :default => 0
      t.integer :likes, :default => 0
      t.integer :user_id

      t.timestamps
    end
  end
end
