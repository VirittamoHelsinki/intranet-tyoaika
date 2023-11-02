import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import WorkTime from './routes/workTime.js';

dotenv.config(); // Lataa ympäristömuuttujat .env-tiedostosta

const app = express();

// Middleware tietojen käsittelyä varten
app.use(express.json());

// Middleware CORS-politiikkaa varten
app.use(cors());

app.get('/', (request, response) => {
  response.status(200).send('Tervetuloa Työaikakirjaus.');
});

app.use('/api', WorkTime)



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Työaikakirjaus-appi yhdistetty tietokantaan');
    app.listen(process.env.PORT, () => {
      console.log(`Työaikakirjaus-appi kuuntelee porttia: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Virhe tietokantaan yhdistäessä:', error);
  });
