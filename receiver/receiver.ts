import fastify, { FastifyInstance, RouteGenericInterface, FastifyReply, FastifyRequest } from "fastify";
import axios, { AxiosResponse } from 'axios';

// define the port and server address
const PORT = 3001;

// Docker configuration
const SENDER_SERVER = 'http://sender:3000';
const HOST = '0.0.0.0';

/*
// Nodejs local configuration
const SENDER_SERVER = 'http://localhost:3000';
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

// handle POST requests to '/receive'
server.post<MyPayload>('/receive', async (request: FastifyRequest<MyPayload>, reply: FastifyReply) => {
    const { message } = request.body

    // if the message is not 'ping', return an error
    if (message !== 'ping') {
        reply.code(400).send({ error: 'Contract Fail' });
    } else {
        // if the message is 'ping', return 'pong'
        reply.code(200).send({message: 'pong'});
    }
});

// function to start the sequence with the sender server
const initiateSequence = async () => {
    try {
        const response: AxiosResponse = await axios.get(SENDER_SERVER + '/start');
        console.log('Sequence initiated');
    } catch (error: any) {
        console.error('Error initiating sequence:', error);
    }
};

// function to check if the sender server is online
async function checkSenderServer(): Promise<void> {
    while (true) {
        try {
            await axios.get(SENDER_SERVER + '/start');
            console.log('Sender server is online. Starting sequence.');
            return;
        } catch (error: any) {
            console.error('Sender server is offline. Retrying in 5 seconds.' + error);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

// start the server
server.listen({ port: PORT, host: HOST }, async (err, address) => {
    if (err) throw err;
    console.log(`Receiver server running on ${address}`);
    await checkSenderServer().then(() => {
        setInterval(initiateSequence, 10000);
    });
});