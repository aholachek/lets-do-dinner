'use strict';

import baseConfig from './base';


let config = {
  appEnv: 'dist', // feel free to remove the appEnv property here
  api_endpoint : 'http://lets-do-dinner.herokuapp.com'

};

export default Object.freeze(Object.assign({}, baseConfig, config));
