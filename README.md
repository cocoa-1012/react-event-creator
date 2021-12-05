## Event Creator

## Tech Stack

**Client:**

- React,
- Redux (State Management),
- Ant Design (Design)
- React Router (v6)
- React Icons (For Icons)
- Axios (Server Request)

**Server:**

Server code Design in MVC pattern

- Node (v16.13.1),
- Express
- Seqeuelize (ORM for database)
- Passport and Passport JWT (Autentications)
- Bcrypt (to encrypte user password)
- Node Mailer (Sending mail)
- Multer (file upload)
- Moment js (date and time)

## Environment Requirements

```
1. NodeJs (v16.x)
2. Npm (v8.x) or Yarn (1.22.x)

```

## Project Setup

`N:B: This is for development`

- Clone the repository
- Install pacakages, run `yarn` or `npm install`

## Backend Setup

- Run `cd backend` and `yarn` or `npm install`
- Rename the `.env.example` to `.env`
- And fill this property with values

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

- Open your database and import `database.sql` file
- Default login username `admin` and password `pass1234`

## Frontend Setup

- Go to frontend directory , run `cd frontend`
- Install all packages , run `yarn` or `npm install`
- Create `.env` file
- And fill this property with values

```
REACT_APP_BASE_URL=
```

`N:B: Add /api after the base url `

## Commands

- Base
  - `start`: Run frontend and backend at same time
  - `server`: Run backend only
  - `client`: Run frontend only

####

- Frontend

  - `start`: run project
  - `build`: build the project

- Backend
  - `start`: run server in production
  - `dev`: run serv in development

## Authors

- [Md Monirul Islam](https://www.github.com/mdmonir027)
