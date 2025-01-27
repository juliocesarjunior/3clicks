class User < ApplicationRecord
  has_many :addresses, dependent: :destroy

  accepts_nested_attributes_for :addresses, allow_destroy: true

  validates :name, :cpf, :birth_date, presence: true

  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: "Email inválido" }, uniqueness: true

  validates :cpf, presence: true, length: { is: 11, message: "CPF deve ter 11 dígitos" }, numericality: { only_integer: true, message: "CPF deve conter apenas números" }

  validate :valid_cpf

  validates :addresses, length: { minimum: 1, message: "deve ter pelo menos um endereço." }

  def self.ransackable_attributes(auth_object = nil)
    ["birth_date", "cpf", "created_at", "email", "id", "id_value", "name", "updated_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["addresses"]
  end

  private

  def valid_cpf
    return if cpf.blank?
    unless CPF.valid?(cpf)
      errors.add(:cpf, "CPF inválido")
    end
  end
end
