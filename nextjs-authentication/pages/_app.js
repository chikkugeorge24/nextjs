import { Provider } from "next-auth/client";
import Navbar from "../components/Navbar/Navbar";
import "../styles/globals.css";
import "../components/Navbar/Navbar.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
