import React from 'react';
import styled from 'styled-components';

const WizardWrapper = styled.div`
  margin: 20px;
`;

const WizardStep = styled.span`
  border: 1px solid red;
  padding: 10px;
  margin: 0 3px;
  border-radius: 50%;
  &.active {
    color: white;
    background-color: blue;
  }
`;

export default ({elements, status}) => {
  return (<WizardWrapper>
    {elements.map((el, idx) => <WizardStep key={idx} className={status === idx + 1 ? 'active' : ''}>{el.title}</WizardStep>)}
  </WizardWrapper>)
}

