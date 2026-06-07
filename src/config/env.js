import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGODB_URI) {
  console.error('Warning: MONGODB_URI is not set. Please set it in the .env file.');
  process.exit(1);
}

if (!process.env.PORT) {
  console.error('Warning: PORT is not set. Please set it in the .env file.');
  process.exit(1);
}

if(!process.env.JWT_SECRET) {
  console.error('Warning: JWT_SECRET is not set. Please set it in the .env file.');
  process.exit(1);
}


const config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: '1h', // You can adjust this as needed
};

export default Object.freeze(config);