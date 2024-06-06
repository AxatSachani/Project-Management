import mongoose from 'mongoose';
import config from '../config';

const MONGO_URI: string = config.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (err: any) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;
