import { expect, use, should } from 'chai';
import chaiHttp from 'chai-http';
import redisClient from '../utils/redis';
import { promisify } from "util";
import dbClient from "../utils/db";

use(chaiHttp);
should();

// redisClient

describe('Test the clients for MongoDB and Redis', () => {
  describe('Redis Client', () => {
    before(async () => {
      await redisClient.client.flushall('ASYNC');
    });

    after(async () => {
      await redisClient.client.flushall('ASYNC');
    });

    it('Shows that connection is alive?', async () => {
      expect(redisClient.isAlive()).to.equal(true);
    });

    it('Returns key as null because it does not exist?', async () => {
      expect(await redisClient.get('myKey')).to.equal(null);
    });

    it('Set key can be called without issue?', async () => {
      expect(await redisClient.set('myKey', 12, 1)).to.equal(undefined);
    });

    it('Returns key with null because it expired?', async () => {
      const sleep = promisify(setTimeout);
      await sleep(1100);
      expect(await redisClient.get('myKey')).to.equal(null);
    });
  });

  // dbClient
  describe('Database Client', () => {
    before(async () => {
      await dbClient.usersCollection.deleteMany({});
      await dbClient.filesCollection.deleteMany({});
    });
    after(async () => {
      await dbClient.usersCollection.deleteMany({});
      await dbClient.filesCollection.deleteMany({});
    });

    it('Shows that connection is alive?', () => {
      expect(dbClient.isAlive()).to.equal(true);
    });

    it('Shows that connection is alive?', () => {
      expect(dbClient.isAlive()).to.equal(true);
    });

    it('Shows number of user documents?', async () => {
      await dbClient.usersCollection.deleteMany({});
      expect(await dbClient.nbUsers()).to.equal(0);

      await dbClient.usersCollection.insertOne({ name: 'Larry' });
      await dbClient.usersCollection.insertOne({ name: 'Karla' });
      expect(await dbClient.nbUsers()).to.equal(2);
    });

    it('Shows number of file documents?', async () => {
      await dbClient.filesCollection.deleteMany({});
      expect(await dbClient.nbFiles()).to.equal(0);

      await dbClient.filesCollection.insertOne({ name: 'FileOne' });
      await dbClient.filesCollection.insertOne({ name: 'FileTwo' });
      expect(await dbClient.nbUsers()).to.equal(2);
    });
  });
});
