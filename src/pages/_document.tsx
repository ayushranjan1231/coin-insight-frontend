
// This file is not used in the Vite build
// It's kept for reference in case we switch back to Next.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="CryptoPredict AI - Cryptocurrency price prediction with AI" />
        <meta name="author" content="CryptoPredict AI" />
        <meta property="og:title" content="CryptoPredict AI" />
        <meta property="og:description" content="Cryptocurrency price prediction with AI" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
