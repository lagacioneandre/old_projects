import { Schema } from 'mongoose';

export let citySchema: Schema = new Schema({
    createdAt: Date,
    name: String,
	idOpenWeather: String,
	country: String,
});

citySchema.pre('save', (next) => {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }

    next();
});