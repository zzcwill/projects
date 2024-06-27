'use client';

import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { usePathname, useRouter } from 'next/navigation';

import { getHomeApi } from '@src/service';
import { useUserStore } from '@src/store';

export default function Page() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {}, []);

  return (
    <div className={classNames('m-[100px] flex h-full items-center justify-center')}>
      <div className={classNames('w-[500px] text-center leading-[500px]')}>{user.nickName}</div>
    </div>
  );
}
