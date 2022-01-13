import '../styles/globals.scss';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { DESCRIPTION, TITLE, URL, OG_IMAGE, TITLE_SHORT, TWITTER_ACCOUNT } from 'SEO';

const websiteSchema = {
  '@type': 'WebSite',
  name: 'Bonne année 2022',
  url: URL,
};

const MyApp: React.ComponentType<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Bonne année 2022</title>
      <meta name="description" content={DESCRIPTION} key="description" />
      <meta name="application-name" content={TITLE_SHORT}></meta>
      <meta name="theme-color" content="#002a52" />
      <meta property="og:url" content={URL} key="ogurl" />
      <meta property="og:type" content="website" key="ogtype" />
      <meta property="og:title" content={TITLE} key="ogtitle" />
      <meta property="og:site_name" content={TITLE_SHORT} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:description" content={DESCRIPTION} key="ogdescription" />
      <meta property="og:image" content={OG_IMAGE} key="ogimage" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={TWITTER_ACCOUNT} />
      <meta name="twitter:site" content={TWITTER_ACCOUNT} />
      <meta name="twitter:title" content={TITLE} key="twittertitle" />
      <meta name="twitter:description" content={DESCRIPTION} key="twitterdescription" />
      <meta name="twitter:image" content={OG_IMAGE} key="twitterimage" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;
