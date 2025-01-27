import styled from 'styled-components';


export const Container = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 2.5rem;
`;

export const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 20px;

  &:hover {
    background-color: #45a049;
  }
`;


export const ButtonRemove = styled(Button)`
  background-color: #e74c3c; // Vermelho para remover
  &:hover {
    background-color: #c0392b; // Escuro no hover
  }
`;

export const ButtonAdd = styled(Button)`
  background-color: #3498db; // Azul para adicionar
  &:hover {
    background-color: #2980b9; // Escuro no hover
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #fff;

  &:focus {
    border-color: #4CAF50;
    outline: none;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

export const TableHeader = styled.th`
  padding: 12px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  text-align: left;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableData = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

export const ActionButton = styled.button`
  background-color: #008CBA;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    background-color: #007bb5;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PaginationButton = styled.button<{ disabled?: boolean }>`
  background-color: #f1f1f1;
  color: #333;
  padding: 8px 16px;
  margin: 0 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  
  &:hover {
    background-color: #ddd;
  }
  
  &:disabled {
    background-color: #f9f9f9;
  }
`;

export const FormContainer = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
`;

export const FormGroupItem = styled.div`
  flex: 1;
  min-width: 200px;
  margin-right: 10px; // Adiciona espaçamento entre os inputs
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;  /* Ajuste o espaçamento entre os elementos */
  margin-bottom: 20px; /* Margem abaixo para separar da tabela */
`;

export const SearchInput = styled.input`
  padding: 8px;
  font-size: 14px;
  width: 250px;
  max-width: 100%;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const DateSearchInput = styled.input`
  padding: 8px;
  font-size: 14px;
  width: 200px;
  max-width: 100%;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const ButtonBack = styled.button`
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 15px;
  border-radius: 5px;
  
  &:hover {
    background-color: #ddd;
  }
`;

