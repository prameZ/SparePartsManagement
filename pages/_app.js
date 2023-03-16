import "../styles/globals.css";
import Layout from "../components/layout";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";

export default function App({ Component, pageProps }) {
  return (
    // <RecoilRoot>
    //   <Layout>
    //     <Component {...pageProps} />
    //   </Layout>
    // </RecoilRoot>

    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
