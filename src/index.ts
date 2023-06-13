import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import routes from './routes/index.routes';

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})