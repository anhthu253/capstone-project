import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
    --background-primary:#F5F5F5;
    --text-color: #2b2626;
    --line-color: #838586;
    --line-primary: #838586 2px solid ;
    --line-secondary: #838586 1px solid;
    --font-primary: "Gothic A1";
    --font-secondary: "Pirata One";
    --font-tertiary: "Ephesis";
  }

  * {
  box-sizing: border-box;
}

  @font-face {
    font-family: "Chewy";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(/fonts/Chewy-Regular.ttf) format("ttf");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
      U+FEFF, U+FFFD;
  }
  
  /* unifrakturmaguntia-regular - latin */
  @font-face {
    font-family: "UnifrakturMaguntia";
    font-style: normal;
    font-weight: 400;
    src: local(""),
      url("/fonts/unifrakturmaguntia-v16-latin-regular.woff2") format("woff2"),
      url("/fonts/unifrakturmaguntia-v16-latin-regular.woff") format("woff");
  }
  
  /* pirata-one-regular - latin */
  @font-face {
    font-family: "Pirata One";
    font-style: normal;
    font-weight: 400;
    src: local(""),
      url("/fonts/pirata-one-v22-latin-regular.woff2") format("woff2"),
      url("/fonts/pirata-one-v22-latin-regular.woff") format("woff");
  }
  
  /* gothic-a1-regular - latin */
  @font-face {
    font-family: "Gothic A1";
    font-style: normal;
    font-weight: 400;
    src: local(""),
      url("/fonts/gothic-a1-v13-latin-regular.woff2") format("woff2"),
      url("/fonts/gothic-a1-v13-latin-regular.woff") format("woff");
  }
  /* gothic-a1-500 - latin */
  @font-face {
    font-family: "Gothic A1";
    font-style: normal;
    font-weight: 500;
    src: local(""), 
      url("/fonts/gothic-a1-v13-latin-500.woff2") format("woff2"),
      url("/fonts/gothic-a1-v13-latin-500.woff") format("woff");
  }
  
  @font-face {
    font-family: 'Ephesis';
    font-style: normal;
    font-weight: 400;
    src: local(''),
         url('../fonts/ephesis-v7-latin-regular.woff2') format('woff2'),
         url('../fonts/ephesis-v7-latin-regular.woff') format('woff'); 
  }
  
  body {
    display:flex;
    font-family: "Gothic A1";
    font-weight: 400;
    margin: 0;
    background-image: url("/images/background-paper.jpg");
    color: var(--text-color);
    padding: 3rem;
  }
  
  h1 {
    font-family: "Pirata One";
  }

`;

export default GlobalStyle;
