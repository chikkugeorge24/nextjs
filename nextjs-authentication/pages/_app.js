import { Provider } from "next-auth/client";
import Navbar from "../components/Navbar/Navbar";
import "../styles/globals.css";
import "../components/Navbar/Navbar.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
