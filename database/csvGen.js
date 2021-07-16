const fs = require('fs');
const faker = require('faker');
const path = require('path');
const moment = require('moment');

const authorCsv = path.join(`${__dirname}/data/authorData.csv`);

const populateAuthor = (records => {
    let author_id, first_name, middle_name, last_name, job, employer, rating, reviews, students, courses, thumbnail, bio, created_at, updated_at;
    let commaPos;
    const header = 'author_id,first_name,middle_name,last_name,job,employer,rating,reviews,students,courses,thumbnail,bio,created_at,updated_at';

    const authorStream = fs.createWriteStream(authorCsv);
    let authorObj;

    const startTime = moment().format('YYYY-MM-DD hh:mm:ss');
    console.log('creating csv file start time: ', startTime);

    authorStream.write(`${header}\n`);

    for (let i = 1; i <= records; i++) {
        author_id = i;
        first_name = faker.name.firstName();
        middle_name = faker.name.firstName();
        last_name = faker.name.lastName();
        job = faker.name.title();
        employer = faker.company.companyName();
        commaPos = employer.indexOf(',');
        if (commaPos >= 0) {
            employer = employer.substring(0, commaPos);
        }
        rating = (Number.parseFloat((Math.random() * 2) + 3).toFixed(1));
        reviews = Math.floor(Math.random() * 100000);
        students = Math.floor(Math.random() * 1000000);
        courses = Math.floor(Math.random() * 90) + 10;
        thumbnail = `https://authors-avatar.s3.amazonaws.com/${i}.jpg`;
        bio = `${first_name} ${middle_name} ${last_name} has a BS in ${faker.name.jobDescriptor()}.`;
        created_at = moment().format('YYYY-MM-DD hh:mm:ss');
        updated_at = moment().format('YYYY-MM-DD hh:mm:ss');

        authorObj = [author_id, first_name, middle_name, last_name, job, employer, rating, reviews, students, courses, thumbnail, bio, created_at, updated_at];
        authorStream.write(`${authorObj}\n`);
    }
    authorStream.end();

    const endTime = moment().format('YYYY-MM-DD hh:mm:ss');
    console.log('creating csv file end time: ', endTime);
});

populateAuthor(10000000);
