import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/project_management',
    JWT_SECRET: process.env.TOKEN_SECRET || 'FxBceyHAfpZuQ5tLB2PGybfBPly3UuNL'
};

export default config;
