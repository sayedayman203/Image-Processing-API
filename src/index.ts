import app from './app';

// start the Express server
app.listen(process.env.PORT, () => {
  console.log(`server listen at http://localhost:${process.env.PORT}/`);
});
