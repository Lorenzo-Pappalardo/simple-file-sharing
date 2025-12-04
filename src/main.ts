import express from 'express';
import send from './file-sharing';

const app = express();
const hostname = '0.0.0.0';
const port = 80;

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.get('/fs', async (req, res) => {
  console.log(`[${req.ip}]: Connected.`);

  const result = await send(res);

  if (result) console.log(`[${req.ip}]: Transfer succeeded.`);
  else console.error(`[${req.ip}]: Transfer failed.`);
});

app.listen(port, hostname, () => {
  console.log(`Listening at ${hostname}:${port}`);
});
