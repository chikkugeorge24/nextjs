import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="About Page" />
      </Head>
      <h1 className="content">About</h1>
    </>
  );
};

export default About;

About.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
      <Footer />
    </>
  );
};
