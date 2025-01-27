import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  FormContainer,
  Title,
  Input,
  Button,
  FormGroup,
  FormGroupItem,
  ButtonGroup,
  ButtonRemove,
  ButtonAdd,
  ButtonBack,
} from './styles';

interface Address {
  id?: number;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  _destroy?: boolean;
}

const UserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '', 
    name: '',
    email: '',
    cpf: '',
    birth_date: '',
    addresses: [{ street: '', city: '', state: '', zip_code: '' }] as Address[],
  });

  const [cepInput, setCepInput] = useState<string[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const [originalAddresses, setOriginalAddresses] = useState<Address[]>([]);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:3005/api/v1/users/${id}`);
          const addresses = response.data.addresses || [];
          setFormData({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            cpf: response.data.cpf,
            birth_date: response.data.birth_date,
            addresses,
          });
          setOriginalAddresses(addresses);
          setCepInput(addresses.map((addr: Address) => addr.zip_code) || []);
        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const updatedAddresses = [...formData.addresses];
      updatedAddresses[index] = { ...updatedAddresses[index], [name]: value };
      setFormData({ ...formData, addresses: updatedAddresses });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddAddress = () => {
    const emptyAddress = { street: '', city: '', state: '', zip_code: '' };
    setFormData({
      ...formData,
      addresses: [...formData.addresses, emptyAddress],
    });
    setCepInput([...cepInput, '']);
  };

  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = formData.addresses.filter((_, i) => i !== index);
    const updatedCepInput = cepInput.filter((_, i) => i !== index);
    setFormData({ ...formData, addresses: updatedAddresses });
    setCepInput(updatedCepInput);
  };

  const handleCepInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const formattedCep = value.replace(/\D/g, '').slice(0, 8);
    const updatedCepInput = [...cepInput];
    updatedCepInput[index] = formattedCep;
    setCepInput(updatedCepInput);

    if (formattedCep.length === 8) {
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(async () => {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${formattedCep}/json/`);
          const { logradouro, localidade, uf } = response.data;
          const updatedAddresses = [...formData.addresses];
          updatedAddresses[index] = {
            ...updatedAddresses[index],
            street: logradouro,
            city: localidade,
            state: uf,
            zip_code: formattedCep,
          };
          setFormData({ ...formData, addresses: updatedAddresses });
        } catch (error) {
          console.error('Erro ao buscar o CEP:', error);
        }
      }, 500);
      setDebounceTimer(timer);
    }
  };

  const identifyAddressChanges = () => {
    const created = formData.addresses.filter(address => !address.id);
    const updated = formData.addresses.filter(
      address =>
        address.id &&
        JSON.stringify(originalAddresses.find(a => a.id === address.id)) !== JSON.stringify(address)
    );
    const removed = originalAddresses.filter(
      address => !formData.addresses.some(a => a.id === address.id)
    );
  
    return { created, updated, removed };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { created, updated, removed } = identifyAddressChanges();
  
    const filteredAddresses = formData.addresses.filter(
      address => address.street || address.city || address.state || address.zip_code
    );
  
    const userPayload = {
      user: {
        ...formData,
        addresses_attributes: [
          ...created.map(address => ({
            user_id: formData.id,
            street: address.street,
            city: address.city,
            state: address.state,
            zip_code: address.zip_code,
          })),
          ...updated.map(address => ({
            id: address.id,
            user_id: formData.id,
            street: address.street,
            city: address.city,
            state: address.state,
            zip_code: address.zip_code,
          })),
          ...removed.map(address => ({
            id: address.id,
            user_id: formData.id,
            street: address.street,
            city: address.city,
            state: address.state,
            zip_code: address.zip_code,
            _destroy: true,
          })),
        ],
      },
    };
  
    try {
      if (id) {
        await axios.put(`http://localhost:3005/api/v1/users/${id}`, userPayload);
      } else {
        await axios.post('http://localhost:3005/api/v1/users', userPayload);
      }
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  return (
    <FormContainer>
      <Title>{id ? 'Editar Usuário' : 'Adicionar Usuário'}</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleInputChange}
        />
        <Input
          type="date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleInputChange}
        />

        <div>
          <h3>Endereços</h3>
          {formData.addresses.map((address, index) => (
            <FormGroup key={index}>
              <FormGroupItem>
                <label>CEP:</label>
                <Input
                  type="text"
                  name="zip_code"
                  placeholder="CEP"
                  value={cepInput[index] || ''}
                  onChange={e => handleCepInputChange(e, index)}
                />
              </FormGroupItem>
              <FormGroupItem>
                <label>Rua:</label>
                <Input
                  type="text"
                  name="street"
                  placeholder="Rua"
                  value={address.street}
                  onChange={e => handleInputChange(e, index)}
                />
              </FormGroupItem>
              <FormGroupItem>
                <label>Cidade:</label>
                <Input
                  type="text"
                  name="city"
                  placeholder="Cidade"
                  value={address.city}
                  onChange={e => handleInputChange(e, index)}
                />
              </FormGroupItem>
              <FormGroupItem>
                <label>Estado:</label>
                <Input
                  type="text"
                  name="state"
                  placeholder="Estado"
                  value={address.state}
                  onChange={e => handleInputChange(e, index)}
                />
              </FormGroupItem>
              {formData.addresses.length > 1 && (
                <ButtonRemove type="button" onClick={() => handleRemoveAddress(index)}>
                  Remover Endereço
                </ButtonRemove>
              )}
            </FormGroup>
          ))}
          <ButtonGroup>
            <ButtonAdd type="button" onClick={handleAddAddress}>
              Adicionar Endereço
            </ButtonAdd>
          </ButtonGroup>
        </div>
        <ButtonBack type="button" onClick={() => navigate(-1)}>
          Voltar
        </ButtonBack>
        <Button type="submit">{id ? 'Atualizar' : 'Salvar'}</Button>
      </form>
    </FormContainer>
  );
};

export default UserForm;
