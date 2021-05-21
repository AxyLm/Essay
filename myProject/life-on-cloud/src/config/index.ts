import developmentConfig from './development';
import productionConfig from './production';

const env = process.env.NODE_ENV || 'development';

// import ACCOUNT from (`./account/${env}`);
const account = require(`./account/${env}`)
const configs = {
    development: {...account.default,...developmentConfig},
    production: {...account.default,...productionConfig},
};

export default () => configs[env];