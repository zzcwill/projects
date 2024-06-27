import classNames from 'classnames';

import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

import { UserInfo } from '@src/components';
import { useUserStore } from '@src/store';
import '@src/styles/globals.scss';

export const metadata: Metadata = {
  title: 'demo',
  description: 'demo',
  icons: '/static/images/favicon-32x32.png'
};

export const viewport: Viewport = {
  width: 1,
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
};

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <UserInfo />
        <div className={classNames('app')}>{children}</div>
      </body>
      <Script src="//at.alicdn.com/t/c/font_3053280_jjaa4tqazxc.js" />
    </html>
  );
}
