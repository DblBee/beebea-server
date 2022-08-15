# BeeBea API

## What is BeeBea

BeeBea is an experiment in genetic algorithm. There are a lot of pieces to the experiment. The basic idea is to have a LED array similar to a 64 x 64 individually controlled led matrix and send specific colors to the matrix. These colors will represent a genome of the led matrix. Each matrix will have 8 specific genes in its chromosome. The 64 led matrix will be broken down into 16 4 x 4 squares in order to make the math much smaller. Once the led has been assigned its chromosome, the display will show the individual colors. The next step is to be able to use a mobile device to capture these colors for the led matrix. The result would be able to identify the led matrix based on the colors that are captured. Each led matrix will have a unique genome. There is the ability for the genome to breed with other genome and produce a unique genome based on the sire and matron.

This API is the data and operations of the BeeBea system.

## Installation

```bash

npm install

```

## Running the app

```bash

# development

$ npm run start

  

# watch mode

$ npm run start:dev

  

# production mode

$ npm run start:prod

```

## Test

```bash

# unit tests

$ npm run test

  

# test with watcher

$ npm run test:watch

  

# e2e tests

$ npm run test:e2e

  

# test coverage

$ npm run test:cov

```

## Running the the docker database

### You need to run the migrations if you want the database to have the schema. You can regenerate the migrations, if the schema migrations are not available, by running (while the database is running) the migrations generate script below. This command will also create an instance of pgadmin for you. [PGAdmin Localhost](http://127.0.0.1:8080)

```bash

# start the database

$ npm run env:dbUp

  

# stop the database

$ npm run env:dbStop

  

# delete the database

$ npm run env:dbDown

```

## Migrations

```bash

# Generate the migrations based on existing entities

$ npm run migration:generate -- src/migrations/{MIGRATION_NAME}


# run the migration

$ npm run migration:run

```

## Seeding

### Seeding works the same way as migrations. In fact it uses migrations to generate and load the seeding files. Change the implemented interface to the ISeedingInterface when the file is generated

```typescript
 export class seedSEED_NAME1659141818147 implements ISeedingInterface {}
```

```bash

# create the seeding. You need to implement the ISeedingInterface

$ npm run seed:create -- src/seeds/{SEED_NAME}


# run the seeding

$ npm run seed:run

```

Other Documents:
[Hardware Setup](/docs/HARDWARE.md)
[Genetic Design](/docs/GENETICDESIGN.md)
