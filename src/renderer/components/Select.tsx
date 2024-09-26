import * as React from 'react'; import  { ReactNode } from 'react';
import styled from 'styled-components';

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.select`
  appearance: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 32px 8px 12px;
  font-size: 14px;
  color: #333;
  width: 100%;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const CaretIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #666;
`;

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

const Select = ({ children, ...props }) => {
  return (
    <SelectWrapper>
      <StyledSelect {...props}>
        {children}
      </StyledSelect>
      <CaretIcon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </CaretIcon>
    </SelectWrapper>
  );
};

export default Select;