# Yosep Tjahja (Database refactor), forked from Eric Knechtges

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Installing Dependencies](#development)
4. [CRUD API paths](#crudpaths)
5. [Project journal](#projectjournal)

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
07/07/2021: Refactored my seeding script, figured I'd have to split at least into 2 processes anyway with AWS EC2 free tier max 1GB memory.
            