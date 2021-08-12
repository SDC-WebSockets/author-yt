# Yosep Tjahja (SDC Project)

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

Get: http://localhost:4095/author?authorId=:authorId<br/>
Post: http://localhost:4095/author<br/>
Put: http://localhost:4095/author?authorId=:authorId<br/>
Delete: http://localhost:4095/author?authorId=:authorId<br/>

#### Journal



<ins>06/24/2021</ins>: Review<br/>
This project is the continuation of Front End Capstone project that was started by the other team (the team that started this project). The focus of this project is the scalability and performance benchmark. The application is going to be measured against a high traffic request (minimum of 100 requests per second) with a minimum 10 millions database recaords.
I have been assigned to work on this Author portion of the project, we are a team of four.

<ins>06/25/2021</ins>: Started working<br/>
I had been busy reviewing the legacy code. There were interesting front end codes that I wanted to get more intimated with but given the scope of this project, I tried to refrain myself from going deep dive on those codes, next time when I have a chance perhaps.

<ins>06/26/2021</ins>: API CRUD methods<br/>
Started working on developing the CRUD methods of the server API. The legacy code only has the read/GET path so I refactored a bit on the read before moving on to the POST, PATCH, and DELETE routes. 

<ins>06/28/2021</ins>: API CRUD test<br/>
Jest time! Not really my fav part in the development world but it's pretty much the requirement. Used 'supertest' to test all four CRUD paths. Finally got it done.

<ins>06/29/2021</ins>: Database research<br/>
We want to try different databases for this SDC project. It uses MongoDB for the previous phase (FDC) so eventhough it is one of my favorite Db, I need to look around and compare at least one SQL and one NOSQL database.
List of SQL candidates to research on: MySql, Postgres, MariaDB.
NOSQL: Cassandra, Riak, Couchbase, CouchDB

Project intro
DB research
Data generation scripts
Queries performance benchmarks

<ins>06/30/2021</ins>: Database generation scripts<br/>
Working on developing data seeding scripts to generate 10 millions records of data. I used Postgres for this task and managed to generate up to 5 millions records before getting time out error. Splitting it is, 2 processes of 5 millions records each.

<ins>07/01/2021</ins>: CRUD test review, fake image script<br/>
Got feedback from one of team member on the CRUD test code, added additional test to make sure that retrieving the deleted record will get an empty result.
Working on creating fake images code, use Fetch API request method to dynamically revisit the faker image website (thispersondoesnotexist.com) and downloaded the image.

<ins>07/03/2021</ins>: Here we go, the two DBs to benchmark<br/>
SQL: Postgres<br/>
NOSQL: Couchbase<br/>
<br/>
I did not really measure and compare every single potential DB because it always comes down to advantages and disadvantages, no DB is 'de-facto' the best database. I used the criterias below:<br/>
- installation simplicity<br/>
- documentation<br/>
- popularity -> always helpful to be in the main stream: longevity and abundance of available helps/QAs<br/>
<br/>
I actually wanted to go with MySQL for the SQL database but figured to try other SQL db, I think Postgres goes toe-to-toe with Mysql.<br/>
From the NOSQL camp, I played a little bit with Cassandra, not really content with the installation steps as a lot of compatibility issue with the Java runtime version. Also, it takes more computing power and requires a larger EC2 instance and it's not going to work on the free tier instance.<br/>
<br/>
<ins>07/06/2021</ins>: Created data generation scripts for both chosen DBs<br/>
Okay, so I wanted to try different ways to improve the data generation script. I tried extending Node js default memory allocation by using the --max-old-space-size option and run the Postgres seeding script again. This time, it did not time out after generating 5 millions records but here is the interesting part, the process was slower, much slower.<br/>
It took approximately 10 minutes to generate 5 millions records but putting it altogether and make it 10 millions by extending the memory allocation took about 5 hours to generate less than 1 million records. I just stopped it at that point, I think it's not really feasible.<br/>
<br/>
<ins>07/07/2021</ins>: Alternative better solution<br/>
Use the copy statement from postgres. <br/>
Basically it requires two steps, first is to generate the data as csv file and then import/copy that file into Postgres. The two steps took less than a minute<br/>
<br/>
Here is the stats:<br/>
Processing 10 millions records into csv file. It took about 17 seconds to complete the process.<br/>
Copying 10 millions records from csv file into Postgres database. The process consumed 17-20% CPU processing power. The process took about 2.5 seconds.<br/>
<br/>
<ins>07/08/2021</ins>: Getting familiar with Couchbase<br/>
Okay, so MongoDB was the only NOSQL database that I have been exposed to, so I kind need to get more info on Couchbase. There is obviously less conversation compared to MongoDb but it has quite an extensive documentation so I did not really go down the rabbit hole per se, just needed time to get to know its quirks.<br/>
<br/>
<ins>07/09/2021</ins>: Propagating data generation script for Couchbase<br/>
I used the cbimport statement from Couchbase to import the same csv file that I used for Postgres. Using the Node Js spawn shell command child process, I was copying 10 millions records from csv file into Couchbase database. The process consumed 8-12% CPU processing power but utilized an additional 40-50% CPU processing power for Memcached. The process took about 20 minutes.<br/>
Next is to perform SQL query execution benchmarks.<br/>
It took Postgres about 1ms for both select and update statement and it took Couchbase 3ms and 66ms respectively for the same statements.<br/><br/>

<ins>07/10/2021</ins>: Database to work with<br/>
It's understandably justified that Postgres performed better for this type of database operation due to the nature of SQL database which is more suitable for transactional database operations. My database is not that complex (i.e. does not have hierarchical structure nor require unstructured data storage) Also, since I do not have complex database, I will not have the advantage of not having to spend time to prepare my database relations.
<br/>

<ins>07/13/2021</ins>: Discussion<br/>
Had a rather lengthy conversation with the other team members, just shared all the findings that we had, some challenges and roadblocks that one of the team member had because she had a rather complex database structure. She had a hierarchical structure on one collection which has a join relationship to another collection and the combination of those multiple joins of 10 millions records produced an insanely large amount of billion of records.<br/>
<br/>

<ins>07/27/2021</ins>: Back to SDC after Mini Apps weeklong break<br/>
Found new material in Learn dashboard to read & watch. Created account at New Relic and tried to get familiar with its interface.<br/>
<br/>

<ins>07/28/2021</ins>: Rework server/database code<br/>
The legacy code uses MongoDB and I need to update the code to use the new database (Postgres)<br/>
<br/>

<ins>08/09/2021</ins>: Stress Test<br/>
I ran the server load test benchmark before working on improving the performance:

I) K6 stress test - get request

--- 1) scenarios: (100.00%) 1 scenario, 300 max VUs, 4m30s max duration (incl. graceful stop):
           * constant_request_rate: 100.00 iterations/s for 4m0s (maxVUs: 100-300, gracefulStop: 30s)

running (4m00.0s), 000/100 VUs, 24001 complete and 0 interrupted iterations
constant_request_rate ✓ [======================================] 000/100 VUs  4m0s  100 iters/s

     ✓ response status 200

     checks.........................: 100.00% ✓ 24001      ✗ 0
     data_received..................: 14 MB   60 kB/s
     data_sent......................: 2.5 MB  10 kB/s
     http_req_blocked...............: avg=8.41µs   min=0s      med=0s     max=29.51ms  p(90)=0s      p(95)=0s
     http_req_connecting............: avg=4.91µs   min=0s      med=0s     max=28ms     p(90)=0s      p(95)=0s
     http_req_duration..............: avg=3.7ms    min=900.2µs med=2.77ms max=225.22ms p(90)=5.12ms  p(95)=6.98ms
       { expected_response:true }...: avg=3.7ms    min=900.2µs med=2.77ms max=225.22ms p(90)=5.12ms  p(95)=6.98ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 24001
     http_req_receiving.............: avg=133.27µs min=0s      med=0s     max=80.89ms  p(90)=546.2µs p(95)=1ms
     http_req_sending...............: avg=16.19µs  min=0s      med=0s     max=3.99ms   p(90)=0s      p(95)=0s
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s     max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=3.55ms   min=900.2µs med=2.56ms max=225.22ms p(90)=4.99ms  p(95)=6.73ms
     http_reqs......................: 24001   100.000131/s
     iteration_duration.............: avg=4.17ms   min=1.51ms  med=3.31ms max=225.73ms p(90)=5.52ms  p(95)=7.44ms
     iterations.....................: 24001   100.000131/s
     vus............................: 100     min=100      max=100
     vus_max........................: 100     min=100      max=100


--- 2) scenarios: (100.00%) 1 scenario, 300 max VUs, 4m30s max duration (incl. graceful stop):
           * constant_request_rate: 1000.00 iterations/s for 4m0s (maxVUs: 100-300, gracefulStop: 30s)

WARN[0002] Insufficient VUs, reached 300 active VUs and cannot initialize more  executor=constant-arrival-rate scenario=constant_request_rate

running (0m02.5s), 300/300 VUs, 411 complete and 0 interrupted iterations

running (4m00.3s), 000/300 VUs, 103167 complete and 0 interrupted iterations
constant_request_rate ✓ [======================================] 000/300 VUs  4m0s  1000 iters/s

     ✓ response status 200

     checks.........................: 100.00% ✓ 103167     ✗ 0
     data_received..................: 62 MB   259 kB/s
     data_sent......................: 11 MB   44 kB/s
     dropped_iterations.............: 136807  569.418885/s
     http_req_blocked...............: avg=7.06µs   min=0s       med=0s       max=14.52ms p(90)=0s       p(95)=0s
     http_req_connecting............: avg=3.69µs   min=0s       med=0s       max=9.1ms   p(90)=0s       p(95)=0s
     http_req_duration..............: avg=693.48ms min=285.48ms med=666.19ms max=1.4s    p(90)=869.9ms  p(95)=961.06ms
       { expected_response:true }...: avg=693.48ms min=285.48ms med=666.19ms max=1.4s    p(90)=869.9ms  p(95)=961.06ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 103167
     http_req_receiving.............: avg=91.56µs  min=0s       med=0s       max=60.51ms p(90)=505.24µs p(95)=991.8µs
     http_req_sending...............: avg=15.96µs  min=0s       med=0s       max=29.99ms p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=693.37ms min=285.48ms med=666.09ms max=1.4s    p(90)=869.79ms p(95)=961ms
     http_reqs......................: 103167  429.402283/s
     iteration_duration.............: avg=693.68ms min=285.48ms med=666.38ms max=1.4s    p(90)=870.21ms p(95)=961.41ms
     iterations.....................: 103167  429.402283/s
     vus............................: 300     min=214      max=300
     vus_max........................: 300     min=214      max=300

-- 3) scenarios: (100.00%) 1 scenario, 300 max VUs, 4m30s max duration (incl. graceful stop):
           * constant_request_rate: 10000.00 iterations/s for 4m0s (maxVUs: 100-300, gracefulStop: 30s)

WARN[0001] Insufficient VUs, reached 300 active VUs and cannot initialize more  executor=constant-arrival-rate scenario=constant_request_rate

running (4m00.3s), 000/300 VUs, 107394 complete and 0 interrupted iterations
constant_request_rate ✓ [======================================] 000/300 VUs  4m0s  10000 iters/s

     ✓ response status 200

     checks.........................: 100.00% ✓ 107394      ✗ 0
     data_received..................: 65 MB   269 kB/s
     data_sent......................: 11 MB   46 kB/s
     dropped_iterations.............: 2292829 9540.468595/s
     http_req_blocked...............: avg=9.25µs   min=0s       med=0s       max=33.33ms p(90)=0s       p(95)=0s
     http_req_connecting............: avg=6.09µs   min=0s       med=0s       max=13.82ms p(90)=0s       p(95)=0s
     http_req_duration..............: avg=667.92ms min=299.95ms med=639.46ms max=1.37s   p(90)=810.16ms p(95)=902.04ms
       { expected_response:true }...: avg=667.92ms min=299.95ms med=639.46ms max=1.37s   p(90)=810.16ms p(95)=902.04ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 107394
     http_req_receiving.............: avg=88.4µs   min=0s       med=0s       max=45.9ms  p(90)=0s       p(95)=999.3µs
     http_req_sending...............: avg=12.18µs  min=0s       med=0s       max=41.05ms p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=667.82ms min=299.95ms med=639.32ms max=1.37s   p(90)=809.97ms p(95)=901.97ms
     http_reqs......................: 107394  446.866768/s
     iteration_duration.............: avg=668.06ms min=300.2ms  med=639.57ms max=1.37s   p(90)=810.26ms p(95)=902.24ms
     iterations.....................: 107394  446.866768/s
     vus............................: 300     min=263       max=300
     vus_max........................: 300     min=263       max=300
<br/>


#### Documentation
Couchbase CLI: https://docs.couchbase.com/server/current/tools/cbq-shell.html
