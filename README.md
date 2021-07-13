# Yosep Tjahja (Database refactor), forked from Eric Knechtges

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Installing Dependencies](#development)
4. [CRUD API paths](#crudpaths)
5. [Project journal](#projectjournal)
6. [Documentation links](#doclinks)

## Usage

To seed database:

```sh
npm run seed
```

To create bundle:

```sh
npm run build
```

To start server:

```sh
npm run start
```

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

#### 4 - CRUD API paths

Get: http://localhost:4095/author?authorId=:authorId
Post: http://localhost:4095/author
Put: http://localhost:4095/author?authorId=:authorId
Delete: http://localhost:4095/author?authorId=:authorId

#### 5 - Project journal
07/06/2021: Hitting timeout as I was trying to seed 10 million records on Postgres database with Nodejs default memory allocation.
            The maximum seeded records successful was at 5 million. The interesting part was that with its default memory allocation the process
            was faster than by extending the memory limit with the --max-old-space-size option.
07/07/2021: Refactored my seeding script, figured I'd have to split at least into 2 processes anyway with AWS EC2 free tier max of 1GB memory.
            createWriteStream takes a lot of CPU power

07/08/2021: Processing 10 millions records into csv file. It took about 17 seconds to complete the process.

07/09/2021: Copying 10 millions records from csv file into Postgres database. The process consumed 17-20% CPU processing power. The process took about 2.5 seconds.

Copying 10 millions records from csv file into Couchbase database. The process consumed 8-12% CPU processing power but utilized an additional 40-50% CPU processing power for Memcached. The process took about 20 minutes. 

Looks like we have a winner here in term of the time it takes to import csv files into database.

#### 6 - Documentation Links
Couchbase CLI: https://docs.couchbase.com/server/current/tools/cbq-shell.html
