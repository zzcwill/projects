'use client';

import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import { Icon } from '@src/components';

import './index.scss';

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <div
        className="m-[200px] w-[200px] cursor-pointer rounded-[10px] bg-[blue] text-center font-[20px] leading-[100px] text-[#fff]"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        modalOpen
      </div>
      <div className={classNames('zui-modal')}>
        <div
          className={classNames('zui-modal-mask', { '!hidden': !modalOpen })}
          onClick={() => {
            setModalOpen(false);
          }}
        ></div>
        <div
          className={classNames('zui-modal-wrap', {
            'zui-modal-wrap-open': modalOpen
          })}
        >
          <div className="zui-modal-content">
            <div className="zui-modal-header">
              <Icon
                name="icon-close"
                className="h-[20px] w-[20px] cursor-pointer fill-[#999]"
                onClick={() => {
                  setModalOpen(false);
                }}
              />
            </div>
            <div className="zui-modal-body">
              <div className="h-[2000px] w-full">test</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
