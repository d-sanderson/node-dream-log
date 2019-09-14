
import styled from 'styled-components';

export default styled.nav`
  font-family: ${props => props.theme.font};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px

  a { color: green; text-decoration: none; }`;