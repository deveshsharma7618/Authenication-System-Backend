import express from 'express'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import utilsRoutes from './routes/utils.routes.js';

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api/auth', authRoutes);
app.use('/api/utils', utilsRoutes);

export default app;