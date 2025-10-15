import express from 'express';
import cors from 'cors';
import apiKeyAuth from './middleware/apiKeyAuth';
import authRoutes from './routes/auth';

const app = express();

app.use(cors())

app.use(express.json());
app.use('/auth', authRoutes);

app.get('/protected', apiKeyAuth, (req: any, res) => {
  res.json({ message: 'Access granted', userId: req.userId });
});


app.listen(3001, () => {
  console.log("Server running on port 3001");
});

export default app;