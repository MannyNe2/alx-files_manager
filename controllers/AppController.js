import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  /**
   * Should return if Redis is alive and if the database is alive
   * by using the 2 utils created previously:
   * @return { "redis": true, "db": true } with a status code 200
   */
  static getStatus(request, response) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    response.status(200).send(status);
  }

  /**
   * Should return the number of users and files in the database
   * @return { "users": 12, "files": 1231 } with a status code 200
   */
  static async getStats(request, response) {
    const stats = {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
    response.status(200).send(stats);
  }
}

export default AppController;
