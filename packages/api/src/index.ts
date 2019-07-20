import app from './app';

const PORT = process.env.PROT || 9000;

app.listen(PORT, function() {
  console.info(`Example app listening on port ${PORT}!`);
});
