import { Html, Head, Main, NextScript } from 'next/document'
      

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <link href="/css/style.css" rel="stylesheet" />
          <link href="/css/responsive.css" rel="stylesheet" />
          <link href="/css/chart.css" rel="stylesheet" />
          <script src="/js/chart.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript></NextScript>
      </body>
    </Html>
  )
}
