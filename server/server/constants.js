'use strict';

const
  isDevMode = process.env.NODE_ENV !== 'production',
  isTestMode = process.env.NODE_ENV === 'test';

const constants = {
  EXPRESS_PORT: Number(process.env.PORT) || 3200,
  DB: {
    channel:  `channel${isTestMode ? '_test' : (isDevMode ? '_dev' : '')}`,
    message:  `message${isTestMode ? '_test' : (isDevMode ? '_dev' : '')}`
  },

};

module.exports = constants;
