
import styled from 'styled-components';

export default styled.nav`
  font-family: ${props => props.theme.font};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px

  a { color: blue; text-decoration: none; }`;