const client = require('../database');

module.exports = {
    async index(request, response) {
        let { orderBy, filterBy } =  request.query;
        orderBy = orderBy ? orderBy : 'CREATED_AT';
        const direction = orderBy === 'DESCRIPTION_DESC' ? 'DESC' : 'ASC';

        filterBy = filterBy ? filterBy : 'ALL';
        filterBy = filterBy !== 'ALL' ? `state = '${filterBy}'` : `state = 'COMPLETE' OR state = 'INCOMPLETE'`;
        
        const mapOrderBy = {
            'DESCRIPTION_DESC': 'description',
            'DESCRIPTION_ASC': 'description',
            'CREATED_AT': 'created_at',
            'COMPLETED_AT': 'completed_at',
        };
        const text = `SELECT * FROM tasks WHERE ${filterBy} ORDER BY ${mapOrderBy[orderBy]} ${direction}`;

        try {
            const tasks = await client.query(text, []);
            return tasks.rows;
        } catch (err) {
            return response.response(err.stack).code(500);
        }
    },

    async store(request, response) {
        const { description } =  request.payload;
        const text = 'INSERT INTO tasks(description, state) VALUES($1, $2) RETURNING *';
        const values = [description, 'INCOMPLETE'];

        try {
            const createdTask = await client.query(text, values);
            return createdTask.rows[0];
        } catch (err) {
            return response.response(err.stack).code(500);
        }
    },

    async update(request, response) {
        const id = request.params.id;
        const textSelect = `SELECT * FROM tasks WHERE id = $1`;
        const valueSelect = [id];

        try {
            const task = await client.query(textSelect, valueSelect);
            
            if (!task.rows.length) {
                return response.response({
                    message: 'Task not found.'
                }).code(500);
            }
        } catch (err) {
            return response.response({
                message: err.stack
            }).code(500);
        }

        const { description, state } =  request.payload;
        const completed_at = state === 'COMPLETE' ? new Date() : null;
        const text = `UPDATE tasks SET description = $1, state = $2, completed_at = $3 WHERE id = $4`;
        const value = [description, state, completed_at, id];

        try {
            await client.query(text, value);
            return response.response({
                message: 'Task updated.'
            }).code(200);
        } catch (err) {
            return response.response({
                message: err.stack
            }).code(500);
        }
    },

    async destroy(request, response) {
        const id = request.params.id;
        const textSelect = `SELECT * FROM tasks WHERE id = $1`;
        const valueSelect = [id];

        try {
            const task = await client.query(textSelect, valueSelect);
            
            if (!task.rows.length) {
                return response.response({
                    message: 'Task not found.'
                }).code(500);
            }
        } catch (err) {
            return response.response({
                message: err.stack
            }).code(500);
        }

        const text = `DELETE FROM tasks WHERE id = $1 RETURNING *`;
        const value = [id];

        try {
            await client.query(text, value);
            return response.response({
                message: 'Task deleted.'
            }).code(200);
        } catch (err) {
            return response.response({
                message: err.stack
            }).code(500);
        }
    }
}