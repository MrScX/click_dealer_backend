# Click Dealer Backend API

Dependency:
This service depends on `Redis` and `MongoDB`. This repository contains a `docker-compose.yml` file to install those locally to get started.
If you have docker installed, run `docker-compose up -d` this will bring up `Redis` and `MongoDB` running.

Example .env
```
PORT = 6060
NODE_ENV = development
MONGO_USER = root
MONGO_PASS = abcd
MONGO_DB = click_dealer
JWT_SECRET = dealersecret
API_PREFIX = /v1

REDIS_HOST = localhost
REDIS_PORT = 6379
REDIS_PASS = 123456

S3_BUCKET_NAME = click_dealer
S3_BUCKET_REGION = us-east-2
AWS_IAM_USER = iam_user
AWS_IAM_ACCESS = access
AWS_IAM_SECRET = secret
```
To run locally, run `npm run dev` in your command line and `npm run build` to build the project.

API Spec:

