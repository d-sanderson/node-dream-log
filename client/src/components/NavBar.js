
import styled from 'styled-components';

export default styled.nav`
  font-family: ${props => props.theme.font};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  a { color: blue; text-decoration: none; }`;