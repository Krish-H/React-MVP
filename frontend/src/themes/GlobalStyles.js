import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    min-height: 100%;
    width: 100%;
  }

  body {
    background: ${({ theme }) => theme.colors.neutral.background};
    color: ${({ theme }) => theme.colors.neutral.textPrimary};
    font-family: ${({ theme }) => theme.typography.family};
    transition: ${({ theme }) => theme.transitions.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  textarea,
  select {
    font-family: inherit;
  }

  button {
    transition: ${({ theme }) => theme.transitions.fast};
  }

  ::selection {
    background: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.neutral.textPrimary};
  }
`;

export default GlobalStyle;