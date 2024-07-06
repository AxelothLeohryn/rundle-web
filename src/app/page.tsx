// src/app/page.tsx
"use client";

import Head from 'next/head';
import Grid from './components/Grid';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Rundle.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Rundle.io</h1>
        <p className="mt-3 text-2xl">Draw the pattern by clicking on the runes</p>
        <Grid />
      </main>
    </div>
  );
};

export default Home;