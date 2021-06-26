# Yosep Tjahja (Database refactor), forked from Eric Knechtges



## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. API paths

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

#### 4 - API Paths ####
Get: http://localhost:4095/author?authorId=:authorId
Post: http://localhost:4095/author
Put: http://localhost:4095/author?authorId=:authorId
Delete: http://localhost:4095/author?authorId=:authorId