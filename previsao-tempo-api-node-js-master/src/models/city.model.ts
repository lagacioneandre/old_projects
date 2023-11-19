import { Document } from 'mongoose';
import { ICity } from '../interfaces/city.interface';

export interface ICityModel extends ICity, Document {
    
}