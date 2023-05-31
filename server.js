import express from 'express';
import initRoutes from './routes/index';

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

initRoutes(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
