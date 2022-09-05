import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Curie</title>
        <meta name="description" content="A chat app for music lovers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello</h1>
    </div>
  );
};

export default Home;
