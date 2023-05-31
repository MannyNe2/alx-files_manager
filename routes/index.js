import express from 'express';
import AppController from '../controllers/AppController';

function initRoutes(app) {
  const router = express.Router();
  app.use('/', router);

  // App Controller

  // should return if Redis is alive and if the database is alive
  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  });

  // should return the number of users and files in the database
  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
  });
}

export default initRoutes;