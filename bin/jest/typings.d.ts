import { MongoMemoryServer } from 'mongodb-memory-server-global';

declare const MONGOMS: MongomsI;

declare global {
  const MONGOMS: MongomsI;
  const MONGOMS_REPLICA_SET: MongomsI;

  namespace NodeJS {
    interface Global {
      MONGOMS: MongomsI;
      MONGOMS_REPLICA_SET: MongomsI;
    }
  }
}

export interface MongomsI {
  init: () => any;
  mongod: MongoMemoryServer | MongoMemoryReplSet;
  uri: string | void;
}
