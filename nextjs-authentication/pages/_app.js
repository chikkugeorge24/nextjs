import Navbar from "../components/Navbar/Navbar";
import "../styles/globals.css";
import "../components/Navbar/Navbar.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
