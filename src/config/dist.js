'use strict';

import baseConfig from './base';


let config = {
  appEnv: 'dist', // feel free to remove the appEnv property here
  api_endpoint : 'http://localhost:4000'

};

export default Object.freeze(Object.assign({}, baseConfig, config));
