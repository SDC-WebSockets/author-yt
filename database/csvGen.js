const fs = require('fs');
const faker = require('faker');
const path = require('path');

const authorCsv = path.join(`${__dirname}/authorData.csv`);

const createAuthor = (id) => {
    const authorStream = fs.createWriteStream(authorCsv);
    const header = 'author_id,first_name,middle_name,last_name,job,employer,rating,reviews,students,courses,thumbnail,bio';

    author_id = id;
    first_name = faker.name.firstName();
    middle_name = faker.name.firstName();
    last_name = faker.name.lastName();
    job = faker.name.title();
    employer = faker.company.companyName();
    rating = (Number.parseFloat((Math.random() * 2) + 3).toFixed(1));
    reviews = Math.floor(Math.random() * 100000);
    students = Math.floor(Math.random() * 1000000);
    courses = Math.floor(Math.random() * 90) + 10;
    // thumbnail = `https://author-avatars.s3.amazonaws.com/${i}.jpeg`;
    bio = `${first_name} ${middle_name} ${last_name} has a BS in ${faker.name.jobDescriptor()}.`;

  const authorData = [author_id, first_name, middle_name, job, employer, rating, reviews, students, courses, bio];

  return authorData;
};

const dataGen = async () => {
  console.log(`Generating ${3 * numberOfCourses} total records of data`);
  generatePriceData(numberOfCourses);
  generateVideoData(numberOfCourses);
  generateSidebarData(numberOfCourses);
};

dataGen(10 ** 7);
