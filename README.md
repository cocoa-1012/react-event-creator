## Event creator.

### Install Packages

1. Clone this repo
2. Run `yarn` or `npm install`
3. Follow backend instruction
4. Follow frontend instruction
5. Base commands

### Backend Instruction

1. Run `cd backend` and `yarn` or `npm install`
2. Rename the `.env.example` to `.env`
3. And fill this property with values

```
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
SALT_ROUND=
JWT_TOKEN_SECRET=
MAIL_HOST_NAME=
MAIL_PORT=
USER_MAIL_NAME=
USER_MAIL_PASSWORD=
```

3. Open your database and import `database.sql` file
4. Default login username `admin` and password `pass1234`

##### Commands

1. `yarn start` or `npm start` : to run server on production mode
2. `yarn run dev` or `npm run dev` : to run server on development mode

### Frontend Instruction

1. Run `cd frontend` and `yarn` or `npm install`
2. Rename the `.env.example` to `.env`
3. And fill this property with values

```
REACT_APP_BASE_URL=
```

`N:B: Add /api after the base url `

##### Commands

1. `yarn start` or `npm start` : to run server on production mode
2. `yarn build` or `npm build` : to run build the project

### Base Commands

1. `yarn start` or `npm start`: to run backend and frontend at the same time.
2. `yarn run server`: to run the backend only
3. `yarn run client`: to run the frontend only

Good Luck
