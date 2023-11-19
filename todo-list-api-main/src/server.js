require('reflect-metadata');
const Hapi = require('@hapi/hapi');
const client = require('./database');
const taskController = require('./tasks/taskController');

const init = async () => {
    const server = Hapi.server({
        port: 3333,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.start();
    client.connect();

    client.query(`
        CREATE TABLE IF NOT EXISTS public.tasks (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            state varchar NOT NULL,
            description varchar NOT NULL,
            created_at timestamp NOT NULL DEFAULT now(),
            completed_at timestamp NULL,
            CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY (id)
        );
    `);

    server.route({
        method: 'GET',
        path: '/tasks',
        handler: taskController.index
    });

    server.route({
        method: 'POST',
        path: '/tasks',
        handler: taskController.store
    });

    server.route({
        method: 'PATCH',
        path: '/tasks/{id}',
        handler: taskController.update
    });

    server.route({
        method: 'DELETE',
        path: '/tasks/{id}',
        handler: taskController.destroy
    });

    console.log('Server runing on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
