require('dotenv').config();

const {
  PORT,
  JWT_SECRET,
  DB_ADDRESS,
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [
    {
      name: 'mesto-backend',
      script: './dist/app.js',
      env_production: {
        NODE_ENV: 'production',
        PORT,
        JWT_SECRET,
        DB_ADDRESS,
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
        JWT_SECRET: 'some-secret-key',
        DB_ADDRESS: 'mongodb://127.0.0.1:27017/mestodb',
      },
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:Zorkiy82/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH} && scp ./.env.production ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': `mkdir ~/mesto-backend && cp -Rf ./backend/* ~/mesto-backend && cp ${DEPLOY_PATH}/.env ~/mesto-backend && cp ${DEPLOY_PATH}/.env.production ~/mesto-backend && cd ~/mesto-backend && rm -rf ~/repo && npm i && npm run build && pm2 start ecosystem.config.js`,
    },
  },
};
