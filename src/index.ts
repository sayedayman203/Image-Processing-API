import app from './app';

const PORT = 3000;

// start the Express server
app.listen(PORT, () => {
  console.log(`server listen at http://localhost:${PORT}/`);
});
