/// <reference types="../typings" />

import {
  MongoMemoryServer,
  MongoMemoryReplSet,
} from "mongodb-memory-server-global";
import mongoose from "mongoose";

function init() {
  beforeAll(async () => {
    await MONGOMS.mongod.start();
    MONGOMS.uri = await MONGOMS.mongod.getConnectionString();
    if (MONGOMS.uri) {
      mongoose.connect(MONGOMS.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await MONGOMS.mongod.stop();
  });
}

function initReplicSet() {
  beforeAll(async () => {
    await MONGOMS_REPLICA_SET.mongod.start();
    if (MONGOMS_REPLICA_SET.mongod instanceof MongoMemoryReplSet) {
      await MONGOMS_REPLICA_SET.mongod.waitUntilRunning();
    }
    MONGOMS_REPLICA_SET.uri = await MONGOMS_REPLICA_SET.mongod.getConnectionString();
    mongoose.connect(`${MONGOMS_REPLICA_SET.uri}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await MONGOMS_REPLICA_SET.mongod.stop();
  });
}

global.MONGOMS = {
  init,
  mongod: new MongoMemoryServer({
    autoStart: false,
  }),
  uri: undefined,
};

global.MONGOMS_REPLICA_SET = {
  init: initReplicSet,
  mongod: new MongoMemoryReplSet({
    autoStart: false,
    replSet: { storageEngine: "wiredTiger" },
  }),
  uri: undefined,
};
