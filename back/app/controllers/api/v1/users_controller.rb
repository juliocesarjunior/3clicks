class Api::V1::UsersController < ApplicationController
  def index
    users = User.ransack(params[:q])

    users = users.result.page(params[:page]).per(10)

    render json: {
      users: users,
      total_pages: users.total_pages,
      current_page: users.current_page,
      total_count: users.total_count,
    }
  end

  def show
    user = User.find(params[:id])
    render json: user, include: :addresses
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: {
        message: "Usuário salvo com sucesso!",
        user: user.as_json(include: :addresses),
      }, status: :created
    else
      render json: {
        message: "Erro ao salvar usuário",
        errors: user.errors.full_messages,
      }, status: :unprocessable_entity
    end
  end

  def update
    Rails.logger.debug "Parâmetros recebidos: #{params.inspect}"
    puts "Parâmetros recebidos: #{params[:user].inspect}"

    user = User.find(params[:id])
    if user.update(user_params)
      render json: {
        message: "Usuário atualizado com sucesso!",
      }, status: :ok
    else
      render json: {
        message: "Erro ao atualizar usuário",
        errors: user.errors.full_messages,
      }, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find_by(id: params[:id])

    if user
      user.destroy
      render json: {
        message: "Usuário excluído com sucesso!",
      }, status: :ok
    else
      render json: {
        message: "Usuário não encontrado",
      }, status: :not_found
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :cpf, :birth_date, addresses_attributes: [:id, :street, :city, :state, :zip_code, :_destroy])
  end
end
