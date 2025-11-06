import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
  background-color: #ffffffff;
  color: white;
  text-align: center;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const Button: React.FC = () => {
  return (
    <ButtonContainer>
      <h1>+ Nova postagem</h1>
    </ButtonContainer>
  );
};

export default Button;