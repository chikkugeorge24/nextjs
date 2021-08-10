import React from "react";
import styled from "styled-components";

const Title = styled.h3`
    font-size: 50,
    color: ${({ theme }) => theme.colors.primary}
`;

const CSSInJs = () => {
  return <Title>Styled Component</Title>;
};

export default CSSInJs;
