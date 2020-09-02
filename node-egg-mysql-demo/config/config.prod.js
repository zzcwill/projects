'use strict';
module.exports = appInfo => {
  const config = {};

  config.cluster = {
    listen: {
      port: 7004,
    },
  };

  return config;
};
