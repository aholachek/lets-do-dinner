'use strict';

import baseConfig from './base';


let config = {
  appEnv: 'dist', // feel free to remove the appEnv property here
  api_endpoint : 'https://lets-do-dinner.herokuapp.com',
  free_tier : false,
  img_endpoint : './'


};

export default Object.freeze(Object.assign({}, baseConfig, config));
