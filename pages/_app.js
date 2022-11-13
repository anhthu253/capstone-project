import GlobalStyle from "../components/GlobalStyle";
import Layout from "../components/Layout";

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
