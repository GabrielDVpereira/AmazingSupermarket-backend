const mongoose = require('mongoose');

const dbHandler = require('./db-handler');
const userController = require('../src/controllers/authController');
const { User } = require('../src/models/User');
const factory = require('./factories')

/*

 * connect to a in-memory-database before all tests

*/

beforeAll( async() => {
    await dbHandler.connect();
})

/*

 * clear all test data after every test

*/

afterEach( async () => {
    await dbHandler.clearDatabase();
})

/*

 * remove and close de db server 

*/

afterAll( async () =>{
    await dbHandler.closeDatabase();
})


describe('User model', () =>{
    it('Should create a new user sucessfully', async () => {
        
        const user = await factory.create('User')
        expect(user).toBeTruthy();

    });

    it('Should generate a valid jwt token for a user', async () => {
        
        const user = await factory.create('User')
        const token = user.generateAuthToken();
        expect(token).toBeTruthy();
    })
})
