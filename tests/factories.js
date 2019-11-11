const { factory } = require('factory-girl');
const  { User } = require('../src/models/User');
const faker = require('faker');

/* 
    factory.define( nome da factory, model, dados que serão inseridos na model)
*/
factory.define('User', User, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
})

module.exports = factory;