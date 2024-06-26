'use client';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
  }, []);

  return (
    <div className={classNames('flex justify-center items-center w-[500px] h-[500px] m-[60px]')}>
      <div>home</div>
    </div>
  );
}
