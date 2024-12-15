import request from "supertest";
import app, { connectDB } from "../app";
import mongoose from "mongoose";
import User, { UserInterface } from "../models/usersDB";

beforeAll(async () => {
    console.log("beforeAll: Connecting to the database...");
    await connectDB();
    await User.deleteMany();
});

afterAll(async () => {
    console.log("afterAll: Closing the database connection...");
    await mongoose.connection.close();
});

type UserType = UserInterface & { token?: string };

const testUser: Partial<UserType> = {
    email: "test@user.com",
    password: "testpassword",
    username: "testuser",
    first_name: "Test",
    last_name: "User",
    address: "Test Address",
    phone_number: "1234567890",
    date_of_birth: new Date("1990-01-01"),
    gender: "Male"
};

describe('Auth Routes', () => {
    test('Register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send(testUser);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User created successfully');
    });

    test('Register an existing user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send(testUser);

        expect(response.status).not.toBe(201);
        expect(response.body.message).toBe('User already exists');
    });

    test('Register fails with missing email', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                ...testUser,
                email: '',
            });

        expect(response.status).not.toBe(201);
    });

    test('Register fails with missing password', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                ...testUser,
                password: '',
            });

        expect(response.status).not.toBe(201);
    });

    test('Register fails with missing username', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                ...testUser,
                username: '',
            });

        expect(response.status).not.toBe(201);
    });

    test('Register fails with missing first name', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                ...testUser,
                first_name: '',
            });

        expect(response.status).not.toBe(201);
    });

    test('Register fails with missing last name', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                ...testUser,
                last_name: '',
            });

        expect(response.status).not.toBe(201);
    });

    test('Register fails with missing address', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                ...testUser,
                address: '',
            });

        expect(response.status).not.toBe(201);
    });

    test('Register fails with missing phone number', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                ...testUser,
                phone_number: '',
            });

        expect(response.status).not.toBe(201);
    });

    test('Register fails with missing date of birth', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                ...testUser,
                date_of_birth: '',
            });

        expect(response.status).not.toBe(201);
    });

    test('Login with the registered user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: testUser.username,
                password: testUser.password,
            });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined(); 
        expect(response.body._id).toBeDefined();
        testUser.token = response.body.token;
        testUser._id = response.body._id;
    });

    test('Login with invalid credentials', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: testUser.username,
                password: 'wrongpassword',
            });

        expect(response.status).not.toBe(200);
    });
});
