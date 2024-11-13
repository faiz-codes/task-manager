# Startup instructions
## Prerequisites
Make sure to have [docker desktop](https://www.docker.com/products/docker-desktop/) installed and updated. Docker Desktop includes Docker Compose.
Make sure both work by running the following in a terminal:
```bash
$ docker -v
> Docker version 20.10.23, build 7155243
$ docker-compose -v
Docker Compose version v2.15.1
```

## First run
Open a terminal and change directory to project_root/api. Then run:
```bash
docker-compose up postgres
```
This will pull the postgres image and starts it. The first time it will initiate the databases for each service. It may take a while, but once done you should see:
```bash
> api-postgres-1  | 2023-07-06 12:06:40.411 UTC [1] LOG:  database system is ready to accept connections
```
Take your favorite postgresql client (for instance [beekeeper](https://www.beekeeperstudio.io/)) and try to connect to localhost at port 5432. Use the username and password as mentioned in the docker-compose.yaml file.
If you can connect and see databases, you're good. 

Now shutdown postgres with ctrl+c and start everything:
```bash
docker-compose up -d
```
Docker will now build the services and pull 3rd party images. It can take a while. Once done it will start all containers as a daemon (-d option). To see logs run:
```bash
docker-compose logs --follow
```
This run SuperTokens will configure itself. To see wether it's done and working, run:
```bash
curl http://localhost:3567/hello
```
SuperTokens should greet you back.
The API Gateway also hosts the default SuperTokens dashboard. Open http://localhost:4000/auth/dashboard in your browser and you should see a login panel. Since you have no users yet, you won't be able to login.

Now run the migrations for the user and task service. The services are connected to the database over the docker network created by docker compose, so make sure to run the migrations from within the docker containers:
```bash
docker-compose exec user-service sequelize-cli db:migrate
docker-compose exec task-service sequelize-cli db:migrate
```

Start the services"
```bash
docker-compose up -d
```

Open a GraphQL client and connect to http://localhost:4000/graphql. Check the docs are loaded, browse through them and see what you can use in the frontend.
The database is empty for all services. To start using any queries/mutations start by adding a user to SuperTokens:

```curl
curl --location 'http://localhost:4000/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
  "formFields": [
    {
      "id": "email",
      "value": "johndoe@lizard.global"
    },
    {
      "id": "password",
      "value": "testPass123"
    }
  ]
}'
```

This will return a user id for your freshy created user. Copy it and go to your GraqpQL client. To add the user and define a task use the mutations in order:

1. setProfile
1. addTask

Tasks for multiple people are grouped in Boards, e.g., "Work" for all tasks shared between you and colleagues. To create a board and add some users:

1. createBoard
2. addUsersToBoard

Now all the databases should have some data and you can test the queries.

> *Security is no priority in this project. Supertokens is used to identofy the logged in user only for certain queries and mutations. In your frontend, use the supertokens client SDK to login and use the JWT in the Authorization header of GraphQL requests.*
