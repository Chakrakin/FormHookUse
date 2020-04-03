import React from 'react';
import styled from 'styled-components';
import {Link, useLocation} from 'react-router-dom';

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

export default ({elements}) => {
  const location = useLocation();
  return (
    <WizardWrapper>
      {elements.map((el, idx) =>
        <WizardStep key={idx} className={location.pathname === el.forRoute ? 'active' : ''} data-testid="wizardRouteAwareStep">
          {/*  this could also be a Link if needed <Link to={el.forRoute}>{el.title}</Link>*/}
          {el.title}
        </WizardStep>
      )}
  </WizardWrapper>)
}

