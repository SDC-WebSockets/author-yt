require('dotenv').config();
const faker = require('faker');
const { Pool, Client } = require('pg');

const host = process.env.PG_HOST;
const port = process.env.PG_PORT;
const username = process.env.PG_USER;
const password = process.env.PG_PASS;
const database = process.env.PG_DB;

const pool = new Pool({
    user: username,
    host: host,
    database: database,
    password: password,
    port: port,
});

pool.connect();

function seed() {
    let insertSql, values;
    let author_id, first_name, middle_name, last_name, job, employer = '', rating, reviews, students, courses, thumbnail, bio;

    for (let i = 1; i <= 10000000; i++) {
        author_id = i;
        first_name = faker.name.firstName();
        middle_name = faker.name.firstName();
        last_name = faker.name.lastName();
        job = faker.name.title();
        employer = faker.company.companyName();
        rating = (Number.parseFloat((Math.random() * 2) + 3).toFixed(1));
        reviews = Math.floor(Math.random() * 100000);
        students = Math.floor(Math.random() * 1000000);
        courses = Math.floor(Math.random() * 90) + 10;
        thumbnail = `https://author-avatars.s3.amazonaws.com/${i}.jpeg`;
        bio = `${first_name} ${middle_name} ${last_name} has a BS in ${faker.name.jobDescriptor()}.`;

        insertSql = 'INSERT INTO authors VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';
        values = [author_id, first_name, middle_name, last_name, job, employer, rating, reviews, students, courses, thumbnail, bio];

        pool.query(insertSql, values, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(res.rows[0].author_id);
            }
        })
    }
}

seed();

module.exports.seed = seed;