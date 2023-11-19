const db = require('../../mongo-config');
const schema = require('../schema');
const model = db.model('users', schema, 'users', true);
const { crypt } = require('../../crypt');
const { uuid } = require('../../uuid');

module.exports = {
    async store(request, response) {
        const body = request.body;
        const hasError =  validateData(body);
        const canCreate = await userValidate(body);

        if (hasError) {
            response.status(400).send({
                httpStatus: 'Bad Request',
                httpStatusCode: 400,
                message: hasError
            });

            return false;
        }

        if (!canCreate) {
            response.status(406).send({
                httpStatus: 'Method Not Allowed',
                httpStatusCode: 406,
                message: 'This e-mail is already in use, please send another e-mail!'
            });

            return false;
        }

        const newUser = new model({
            name: body.name.trim(),
            email: body.email.trim(),
            phone: body.phone.trim(),
            password: crypt(body.password)
        });

        await newUser.save();

        const sessionModel = db.model('sessions');
        const newSession = new sessionModel({
            user: body.name,
            email: body.email,
            uuid: uuid(),
            creationDate: new Date().getTime(),
            expireDate: new Date().getTime() + 1000 * 60 * 60,
            active: true
        });

        await newSession.save();

        response.json({
            httpStatus: 'OK',
            httpStatusCode: 200,
            message: 'Success, user created!',
            user: newSession.user,
            uuid: newSession.uuid,
            expireDate: newSession.expireDate
        });
    },
};

const validateData = (bodyRequest) => {
    let message = '';
    const emailHasAt = bodyRequest.email.split('@');
    const emailHasDot = bodyRequest.email.split('.');

    if (!bodyRequest.name) {
        message += 'The name need to be informed. ';
    }

    if (!bodyRequest.email) {
        message += 'The e-mail need to be informed. ';
    }

    if (emailHasAt.length <= 1 || emailHasDot.length <= 1) {
        message += 'This e-mail is invalid, please send another e-mail. ';
    }

    if (!bodyRequest.phone) {
        message += 'The phone need to be informed. ';
    }

    if (!bodyRequest.password) {
        message += 'The password need to be informed. ';
    }

    return message;
}

const userValidate = async (bodyRequest) => {
    const item = await model.find({
        'email': bodyRequest.email
    }).lean().exec();

    if (!item.length) {
        return true;
    }

    return false;
}