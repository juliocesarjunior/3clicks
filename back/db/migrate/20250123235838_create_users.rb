class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :cpf
      t.date :birth_date

      t.timestamps
    end
  end
end
