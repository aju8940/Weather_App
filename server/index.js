import express from 'express';
import cookieParser from 'cookie-parser'; 
import {PrismaClient} from '@prisma/client'
import authRouter from './routes/authRoutes.js'; 
import weatherRoutes from './routes/weatherRoutes.js'; 
import cors from 'cors'


const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT|| 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors())


app.use("/api/auth", authRouter);
app.use("/api/weather", weatherRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.response ? err.response.status : err.status || 500;
  const message = err.response ? err.response.statusText : err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});

