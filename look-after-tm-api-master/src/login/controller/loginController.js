const db = require('../../mongo-config');
const schema = require('../schema');
const model = db.model('sessions', schema, 'sessions', true);
const userModel = db.model('users')
const { crypt } = require('../../crypt');
const { uuid } = require('../../uuid');

module.exports = {
    async store(request, response) {
        const body = request.body;
        const cryptUserPassword = crypt(body.password);
        const hasError = validateData(body);
        const user = await userModel.find({ 'email': body.email }).lean().exec();
        let isTheSamePassword = false;

        if (user.length) {
            isTheSamePassword = user[0].password === cryptUserPassword;
        }

        if (!user.length || hasError || !isTheSamePassword) {
            response.status(400).send({
                httpStatus: 'Bad Request',
                httpStatusCode: 400,
                message: 'User and/or pass is invalid!'
            });

            return false;
        }

        await killAllPreviousSessions(body.email);

        const newSession = new model({
            user: user[0].name,
            email: user[0].email,
            uuid: uuid(),
            creationDate: new Date().getTime(),
            expireDate: new Date().getTime() + 1000 * 60 * 60,
            active: true
        });

        await newSession.save();

        response.json({
            httpStatus: 'OK',
            httpStatusCode: 200,
            message: 'Welcome ' + user[0].name + '!',
            user: newSession.user,
            uuid: newSession.uuid,
            expireDate: newSession.expireDate
        });
    },
};

const validateData = (bodyRequest) => {
    let hasError = false;
    const emailHasAt = bodyRequest.email.split('@');
    const emailHasDot = bodyRequest.email.split('.');

    if (!bodyRequest.email) {
        hasError = true;
    }

    if (emailHasAt.length <= 1 || emailHasDot.length <= 1) {
        hasError = true;
    }

    if (!bodyRequest.password || bodyRequest.password.length < 6) {
        hasError = true;
    }

    return hasError;
}

const killAllPreviousSessions = async (email) => {
    const sessions = await model.find({ 'email': email }).lean().exec();

    sessions.map(async (item) => {
        item.active = false;
        await updateData(item);
    });
}

const updateData = async (data) => {
    return await model.updateOne({
        _id: data._id
    }, {
        $set: data
    });
}