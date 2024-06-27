'use client';

import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { usePathname, useRouter } from 'next/navigation';

import { Icon } from '@src/components';
import { getHomeApi } from '@src/service';
import { useUserStore } from '@src/store';
import { uuid } from '@src/utils';

export default function Page() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const initArr = [1, 2, 3, 4];

  const toPage = () => {
    useUserStore.getState().clear();
    router.push('link');
  };

  useEffect(() => {
    console.info('pageLoad');
    const getData = async () => {
      try {
        const resData = await getHomeApi();
        console.info('getHomeApi', resData);
      } catch (error) {
        console.error('getHomeApi', error);
      }
    };
    getData();
  }, []);

  return (
    <div className={classNames('m-[100px] flex h-full items-center justify-center')}>
      <div className={classNames('w-[500px] cursor-pointer text-center')} onClick={toPage}>
        <div className={classNames('flex items-center justify-center leading-[40px]')}>
          <div>{user.nickName}</div>
          <Icon name="icon-link4" className="ml-[6px] h-[50px] w-[50px] fill-[blue]" />
        </div>
        <div className="mt-[40px] flex items-center justify-center">
          {initArr.map((item) => {
            return (
              <div className="mr-[6px]" key={uuid(4)}>
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
