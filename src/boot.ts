import { Application } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import { data } from 'app/utils/store';

export function initSessionRequestHandler() {
  const environmentType = process.env.APP_ENV === 'prod' ? 'prod' : 'dev';

  const sessionUri = process.env.SESSION_URI || '';

  if (!data.sessionConnection) {
    data.sessionConnection = mongoose.createConnection(sessionUri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  const sessionConnection = data.sessionConnection;

  if (!data.mongoStore) {
    const connectMongoStore = connectMongo(session);

    data.mongoStore = new connectMongoStore({
      mongooseConnection: sessionConnection,
      collection: 'sessions',
      stringify: false,
      serialize: (session: any) => {
        const obj: any = {};
        let prop;

        for (prop in session) {
          if (prop === 'cookie') {
            obj.cookie = session.cookie.toJSON ? session.cookie.toJSON() : session.cookie;
          } else {
            obj[prop] = session[prop];
          }
        }

        return obj;
      },
      unserialize: (x: any) => x,
    } as any);
  }

  return session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    name: 'sid',
    cookie: {
      path: '/',
      httpOnly: true,
      secure: environmentType === 'prod' ? true : false,
      domain: `.${process.env.DOMAIN}`,
    },
    store: data.mongoStore,
  });
}

export async function boot(app: Application) {
  app.set('trust proxy', 1);

  const sessionRH = initSessionRequestHandler();

  app.use(helmet());

  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(bodyParser.json());

  app.use(cookieParser());

  app.use((req, res, next) => sessionRH(req, res, next));

  return app;
}
