require('dotenv').config();
const faker = require('faker');
const { Pool, Client } = require('pg');
const { v1: uuidv1, v4: uuidv4 } = require('uuid');

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

const createTable = () => {
    const createSql = `DROP TABLE IF EXISTS authors;
                       CREATE TABLE authors(
                        
                        author_id integer NOT NULL UNIQUE,
                        first_name varchar(40),
                        middle_name character varying(40) COLLATE pg_catalog."default",
                        last_lame character varying(40) COLLATE pg_catalog."default",
                        job character varying(100) COLLATE pg_catalog."default",
                        employer character varying(100) COLLATE pg_catalog."default",
                        rating numeric(2,1),
                        reviews integer,
                        students integer,
                        courses integer,
                        thumbnail character varying(100) COLLATE pg_catalog."default",
                        bio text COLLATE pg_catalog."default",
                        created_at timestamp without time zone,
                        updated_at timestamp without time zone,
                        CONSTRAINT author_pkey PRIMARY KEY (author_id)
                       )`
}

const seed = () => {
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

await pool.connect()
    .then(() => {
        seed();
    })

module.exports = {
    seed
};