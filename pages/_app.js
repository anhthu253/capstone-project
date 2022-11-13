import GlobalStyle from "../components/GlobalStyle";
import Layout from "../components/Layout";
//import "@fortawesome/fontawesome-svg-core/styles.css"; //importing font awesome css
import { config } from "@fortawesome/fontawesome-svg-core";
function MyApp({ Component, pageProps }) {
  config.autoAddCss = false;
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
