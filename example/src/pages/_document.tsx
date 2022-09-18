import { Html, Head, Main, NextScript } from 'next/document';

function Document() {
  return (
    <Html>
      <Head>
        <link
          href='https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css'
          rel='stylesheet'
          type='text/css'
        />
      </Head>
      <body>
        <Main />
        <div id='modal' />
        <div id='toast' />
        <div id='alert' />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
