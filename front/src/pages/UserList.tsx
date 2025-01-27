import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Title, Button, Table, TableHeader, TableRow, TableData, ActionButton, Pagination, PaginationButton, SearchInput, DateSearchInput, InputContainer } from './styles';

interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  birth_date: string;
}

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [birthDateSearch, setBirthDateSearch] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/v1/users', {
          params: { 
            page: currentPage, 
            q: {
              name_or_email_or_cpf_cont: searchTerm,
              birth_date_eq: birthDateSearch,
            },
          },
        });
        setUsers(response.data.users);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, searchTerm, birthDateSearch]);

  const handleRemove = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3005/api/v1/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDateSearch(e.target.value);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <Title>Lista de Usuários</Title>
      <Button onClick={() => navigate('/user/new')}>Adicionar Usuário</Button>
      <InputContainer>
        <SearchInput
          type="text"
          placeholder="Pesquisar por nome, CPF ou e-mail"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <DateSearchInput
          type="date"
          value={birthDateSearch}
          onChange={handleDateChange}
          placeholder="Pesquisar por data de nascimento"
        />
      </InputContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>CPF</TableHeader>
            <TableHeader>Data de Nascimento</TableHeader>
            <TableHeader>Ações</TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableData>{user.name}</TableData>
              <TableData>{user.email}</TableData>
              <TableData>{user.cpf}</TableData>
              <TableData>{user.birth_date}</TableData>
              <TableData>
                <ActionButton onClick={() => navigate(`/user/${user.id}`)}>Editar</ActionButton>
                <ActionButton onClick={() => handleRemove(user.id)}>Remover</ActionButton>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PaginationButton onClick={goToPreviousPage} disabled={currentPage === 1}>
          Anterior
        </PaginationButton>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <PaginationButton onClick={goToNextPage} disabled={currentPage === totalPages}>
          Próxima
        </PaginationButton>
      </Pagination>
    </Container>
  );
};

export default UserList;
