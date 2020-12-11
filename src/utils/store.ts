import { Connection } from 'mongoose';
import { MongoStore } from 'connect-mongo';

export interface DataStore {
  sessionConnection?: Connection;
  mongoStore?: MongoStore;
}

export const data: DataStore = {};
