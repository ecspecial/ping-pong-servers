import fastify from "fastify";
import axios from "axios";
import { FastifyInstance, RouteGenericInterface, FastifyReply, FastifyRequest } from "fastify";
import { AxiosResponse } from 'axios';

// define the port and server address
const PORT = 3000;

// Docker configuration
const RECEIVER_SERVER = 'http://receiver:3001';
const HOST = '0.0.0.0';

/*
// Nodejs local configuration
const RECEIVER_SERVER = 'http://localhost:3001';
const HOST = 'localhost';
*/

// create a Fastify server
const server = fastify();

// define the payload interface
interface MyPayload extends RouteGenericInterface {
    Body: {
        message: string;
    };
}

// handle GET requests to '/start'
server.get('/start', async (request: FastifyRequest<MyPayload>, reply: FastifyReply) => {

    console.log('Received /start request');

    try {
        // make a POST request to the receiver server
        const response: AxiosResponse = await axios.post(RECEIVER_SERVER + '/receive', {
            message: 'ping'
        });

        // if the response message is 'pong', the contract is a success
        if (response.data?.message === 'pong') {
            console.log('Contract Success');
            reply.send({ success: true, type: 'Contract Success' });
        } else {
            // if the response message is not 'pong', the contract failed
            console.log('Contract Fail');
            reply.send({ success: false, type: 'Contract Fail' });
        }
    } catch (error: any) {
        console.error('Error sending ping:', error);
        reply.send({ success: false, type: 'Error' });
    }
});

// start the server
server.listen({ port: PORT, host: HOST }, (err, address) => {
    if (err) throw err;
    console.log(`Sender server running on ${address}`);
});