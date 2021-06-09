const faker = require('faker');
const db = require('./overview.js');

const capitalize = function (string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
};


const lang = [
  "Mandarin", "Spanish", "Hindustani", "Bengali", "Portuguese", "Russian", "Japanese", "French", "German", "Tamil", "Javanese", "Italian", "Romanian", "Greek", "Hipster"
];

const create = function() {
  const data = [];
  let firstName, middleName, lastName, job, employer = '';
  for (let i = 1; i <= 100; i++) {
    console.log('index', i);
    firstName = faker.name.firstName();
    middleName = faker.name.firstName();
    lastName = faker.name.lastName();
    job = faker.name.title();
    employer = faker.company.companyName();
    //thumbnail (async)
    bio = `${firstName} ${middleName} ${lastName} has a BS in ${faker.name.jobDescriptor()} ${faker.name.jobArea()} from ${faker.address.city()} University and years of experience as a professional instructor for ${faker.name.jobDescriptor()} ${faker.name.jobArea()}. ${lastName} has publications and patents in various fields such as ${faker.hacker.adjective()} ${faker.hacker.ingverb()}, ${faker.hacker.adjective()} ${faker.hacker.ingverb()}, and ${faker.hacker.adjective()} ${faker.hacker.ingverb()}. Over the course of ${lastName}'s career, they have developed a skill set in ${faker.hacker.ingverb()} and they hope to use their experience in teaching to help other people learn the power of ${faker.hacker.adjective()} ${faker.hacker.ingverb()}, as well as ${faker.hacker.ingverb()} the ${faker.hacker.noun()}. Currently ${lastName} works ${job} for ${employer} and provides in-person training courses to employees working at top companies, including ${faker.company.companyName()}, ${faker.company.companyName()}, ${faker.company.companyName()}, ${faker.company.companyName()}, and many more. Feel free to contact them on LinkedIn for more information on in-person training sessions or group training sessions in ${faker.address.city()}.`
    data.push({
      'authorId': i,
      'firstName': firstName,
      'middleName': middleName,
      'lastName': lastName,
      'job': job,
      'employer': employer,
      'rating': (Number.parseFloat((Math.random() * 2) + 3).toFixed(1)),
      'reviews': Math.floor(Math.random() * 100000),
      'students': Math.floor(Math.random() * 1000000),
      'courses': Math.floor(Math.random() * 90) + 10,
      'thumbnail': /*TODO*/,
      'bio': bio
    });
  }
  db.save(data);
}

create();

module.exports = create;
