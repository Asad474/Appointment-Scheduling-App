# Backend Setup


## Getting Started


### 1. Install package dependencies

In the `root` directory, run:

```bash
$ npm install
```


### 2. Adding environment variables to .env file

You need to create .env file to store Environment Variables under the root directory.

```bash
NODE_ENV=development

JWT_SECRET='JWT secret should be a long, random string of characters. Longer secrets are generally more secure than shorter ones. '

#Database Configurations
DATABASE_URL='Your Postgres Database connection string'

#EMAIL Configurations
MAIL_SERVICE='eg: gmail, yahoo etc'
MAIL_HOST='HOST of MAIL_SERVICE (eg: smtp.gmail.com)'
MAIL_PORT='eg: 587 (gmail port no)'
HOST_EMAIL='Your email id'
HOST_PASSWORD='Your email password'
```

You can create JWT_SECRET by using following commands in node terminal:

```bash
$ require('crypto').randomBytes(64).toString('hex')
```

If you are using gmail service in email Configuration, then use `app passowrd` in `HOST_PASSWORD`

For more info, refer [Sign In with App Password](https://support.google.com/accounts/answer/185833?hl=en)


### 3. Start Backend Server

To start backend server, run: 

```bash
$ npm run server
```