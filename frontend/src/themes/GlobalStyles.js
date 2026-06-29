import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${({ theme }) => theme.colors?.neutral?.background || '#F4F7FB'};
    color: ${({ theme }) => theme.colors?.neutral?.textPrimary || '#0A192F'};
    font-family: ${({ theme }) => theme.typography?.family || "'Inter', sans-serif"};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a {
    color: ${({ theme }) => theme.colors?.primary?.main || '#0052CC'};
    text-decoration: none;
    transition: color 0.2s ease-in-out;
    
    &:hover {
      color: ${({ theme }) => theme.colors?.primary?.hover || '#003D99'};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors?.neutral?.textPrimary || '#0A192F'};
  }
`;

export default GlobalStyles;
