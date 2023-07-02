require('dotenv').config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
  TEMP_PATH = '~/temp',
} = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:Zorkiy82/web-plus-pm2-deploy.git',
      path: TEMP_PATH,
      'post-deploy': `mkdir ${DEPLOY_PATH} && cd ./frontend && npm i && npm run build && cp -Rf ./build/* ${DEPLOY_PATH} && rm -rf ${TEMP_PATH}`,
    },
  },
};