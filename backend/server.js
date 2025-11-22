import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/database.js';
import userRouter from './routes/userRoutes.js';
import taskRouter from './routes/taskRoutes.js';

const app = express();

const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

connectDB();

app.use("/api/user", userRouter);
app.use('/api/tasks', taskRouter);

app.get('/', (req, res) => {
  res.send('Hello from Dayline API!')
});

app.listen(port, () => {
  console.log(`Server started!! http://localhost:${port}`)
});
