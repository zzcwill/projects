'use client';

import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import { Icon } from '@src/components';

import './index.scss';

export default function Page() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <div
        className="m-[200px] w-[200px] cursor-pointer rounded-[10px] bg-[blue] text-center font-[20px] leading-[100px] text-[#fff]"
        onClick={() => {
          setDrawerOpen(true);
        }}
      >
        drawerOpen
      </div>
      <div className={classNames('zui-drawer')}>
        <div
          className={classNames('zui-drawer-mask', { hidden: !drawerOpen })}
          onClick={() => {
            setDrawerOpen(false);
          }}
        ></div>
        <div
          className={classNames('zui-drawer-content-wrapper', {
            'zui-drawer-content-wrapper-open': drawerOpen
          })}
        >
          <div className="zui-drawer-content">
            <div className="zui-drawer-header">
              <Icon
                name="icon-close"
                className="h-[20px] w-[20px] cursor-pointer fill-[#999]"
                onClick={() => {
                  setDrawerOpen(false);
                }}
              />
            </div>
            <div className="zui-drawer-body">
              <div className="h-[2000px] w-full">test</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
