'use strict';

import baseConfig from './base';


let config = {
  appEnv: 'dist', // feel free to remove the appEnv property here
  api_endpoint : 'http://lets-do-dinner.herokuapp.com',
  free_tier : true,
  img_endpoint : './'


};

export default Object.freeze(Object.assign({}, baseConfig, config));
