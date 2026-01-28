<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Run in Development

1. Clone the repository
2. Execute

```
npm i

```

3. Have Nest CLI installed

```
npm i -g @nestjs/cli
```

4. Start the database

```
docker-compose up -d
```

5. Clone the __.env.template__ file and rename the copy to __.env__

6. Fill in the environment variables defined in ```.env```

7. Run the application in dev mode:

```
npm run start:dev
```

8. Rebuild the database with seed data
```
https://localhost:3000/api/v2/seed
```

# Production Build

1. Create the ```.env.prod``` file
2. Fill in the production environment variables
3. Build the image
```docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build```

# Stack Used

* MongoDB
* Nest