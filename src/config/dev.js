'use strict';

import baseConfig from './base';


let config = {
  appEnv: 'dev',
  api_endpoint : 'http://localhost:4000'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
