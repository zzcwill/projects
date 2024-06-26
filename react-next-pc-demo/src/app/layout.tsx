import type { Metadata, Viewport } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import classNames from 'classnames';
import '../styles/globals.scss';

export const metadata: Metadata = {
  title: 'demo',
  description: 'demo',
};

export const viewport: Viewport = {
  width: 1,
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='zh'>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
          key='viewport'
        ></meta>
      </Head>
      <body className={classNames('app')}>
        {children}
      </body>
      <Script src='https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_33423_24.955f21e85e95b8ccb534daf4e328ac74.js' />
    </html>
  );
}
