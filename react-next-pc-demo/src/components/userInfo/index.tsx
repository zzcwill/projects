'use client';

import React, { useEffect } from 'react';

import { useUserStore } from '@src/store';

export function UserInfo() {
  useEffect(() => {
    const getUserInfo = () => {
      useUserStore.getState().update({ nickName: 'zzc' });
    };
    getUserInfo();
  }, []);

  return null;
}
