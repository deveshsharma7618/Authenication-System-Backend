import express from 'express'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import utilsRoutes from './routes/utils.routes.js';
import booksRoutes from './routes/books.routes.js';
import { sendEmail } from './utils/sendEmail.js';
import path from 'path';

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api/auth', authRoutes);
app.use('/api/utils', utilsRoutes);
app.use('/profile_photos',  express.static(path.join(process.cwd(), 'uploads/profile_photos')));
app.use('/api/books', booksRoutes);

export default app;