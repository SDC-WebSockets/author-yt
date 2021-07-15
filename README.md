# Yosep Tjahja (SDC Capstone)

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Dependencies](#dependencies)
4. [API](#api)
5. [Journal](#journal)
6. [Documentation](#documentation)

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

### Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

#### API

Get: http://localhost:4095/author?authorId=:authorId
Post: http://localhost:4095/author
Put: http://localhost:4095/author?authorId=:authorId
Delete: http://localhost:4095/author?authorId=:authorId

#### Journal
<ins>06/24/2021</ins>: Review<br/>
This project is the continuation of Front End Capstone project that was started by the other team (the team that started this project). The focus of this project is the scalability and performance benchmark. The application is going to be measured against a high traffic request (minimum of 100 requests per second) with a minimum 10 millions database recaords.
I have been assigned to work on this Author portion of the project, we are a team of four.

<ins>06/25/2021</ins>: Started working<br/>
I had been busy reviewing the legacy code. There were interesting front end codes that I wanted to get more intimated with but given the scope of this project, I tried to refrain myself from going deep dive on those codes, next time when I have a chance perhaps.

06/26/2021: API CRUD methods
Started working on developing the CRUD methods of the server API. The legacy code only has the read/GET path so I refactored a bit on the read before moving on to the POST, PATCH, and DELETE routes. 

06/28/2021: API CRUD test
Jest time! Not really my fav part in the development world but it's pretty much the requirement. Finally got it done with a sigh of relief, phew...

06/29/2021: Database research
We want to try different databases for this SDC project. It uses MongoDB for the previous phase (FDC) so eventhough it is one of my favorite Db, I need to look around and compare at least one SQL and one NOSQL database.
List of SQL candidates to research on: MySql, Postgres, MariaDB.
NOSQL: Cassandra, Riak, Couchbase, CouchDB

06/30/2021: Database generation scripts
Working on developing data seeding scripts to generate 10 millions records of data. I used Postgres for this task and managed to generate up to 5 millions records before getting time out error. Splitting it is, 2 processes of 5 millions records each.

07/01/2021: CRUD test review, fake image script
Got feedback from one of team member on the CRUD test code, added additional test to make sure that retrieving the deleted record will get an empty result.
Working on creating fake images code, use Fetch API request method to dynamically revisit the faker image website (thispersondoesnotexist.com) and downloaded the image.

07/03/2021: Here we go, the two chosen DBs
SQL: Postgres
NOSQL: Couchbase

I did not really measure and compare every single potential DB because it always comes down to advantages and disadvantages, no DB is 'de-facto' the best database. I used the criterias below:
- installation simplicity
- documentation
- popularity -> always helpful to be in the main stream: longevity and abundance of available helps/QAs

I actually wanted to go with MySQL for the SQL database but figured to try other SQL db, I think Postgres goes toe-to-toe with Mysql.
From the NOSQL camp, I played a little bit with Cassandra, not really content with the installation steps as a lot of compatibility issue with the Java runtime version. Also, it takes more computing power and requires a larger EC2 instance and it's not going to work on the free tier instance.

07/06/2021: Created data generation scripts for both chosen DBs
Okay, so I wanted to try different ways to improve the data generation script. I tried extending Node js default memory allocation by using the --max-old-space-size option and run the Postgres seeding script again. This time, it did not time out after generating 5 millions records but here is the interesting part, the process was slower, much slower.
It took approximately 10 minutes to generate 5 millions records but putting it altogether and make it 10 millions by extending the memory allocation took about 5 hours to generate less than 1 million records. I just stopped it at that point, I think it's not really feasible.

07/07/2021: A brand new hope!
Got an idea from one team member ... use the copy statement from postgres.
Basically it requires two steps, first is to generate the data as csv file and then import/copy that file into Postgres. The two steps took less than a minute, what the  ...
I'm a happy camper ... I can sleep now without my brain trying to find a different solution :))

Here is the stats:
Processing 10 millions records into csv file. It took about 17 seconds to complete the process.
Copying 10 millions records from csv file into Postgres database. The process consumed 17-20% CPU processing power. The process took about 2.5 seconds.

07/08/2021: Getting intimate with Couchbase
Okay, so MongoDB was the only NOSQL database that I have been exposed to, so I kind need to warm up a bit on Couchbase. There is obviously less conversation compared to MongoDb but it has quite an extensive documentation so I did not really go down the rabbit hole per se, just needed time to get to know its quirks.

07/09/2021: Propagating data generation script for Couchbase
I used the cbimport statement from Couchbase to import the same csv file that I used for Postgres. Using the Node Js spawn shell command child process, I was copying 10 millions records from csv file into Couchbase database. The process consumed 8-12% CPU processing power but utilized an additional 40-50% CPU processing power for Memcached. The process took about 20 minutes.

07/10/2021: And the winner is ... 
By looking at the stats on both Postgres and Couchbase data generation scripts, it's quite obvious that Postgres performed better but hey, I did not want to rush my decision just yet so let's do the SQL query execution benchmarks then.
It took Postgres about 1ms for both select and update statement and it took Couchbase 3ms and 66ms respectively for the same statements.

Looks like we have a winner here, case is put to rest, at least until Coachbase expert fan can prove otherwise...

07/13/2021: Discussion, discussion
Had a rather lengthy conversation with the other team members, just shared all the findings that we had, some challenges and roadblocks that one of the team member had because she had a rather complex database structure. She had a nested objects in one table which joins to other table if I am not mistaken. The combination of those multiple joins of 10 millions records produced an insanely large amount of billion of records.

#### Documentation
Couchbase CLI: https://docs.couchbase.com/server/current/tools/cbq-shell.html
