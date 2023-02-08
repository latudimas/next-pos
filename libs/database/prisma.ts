import { Prisma, PrismaClient } from '@prisma/client'

export type DbConnection = {
  connect: () => Promise<void>
  getConnection: () => PrismaClient<Prisma.PrismaClientOptions, 'query' | 'info' | 'warn' | 'error'>;
}

declare global {
  //need to change the type to able to use query logger
  // var __db: PrismaClient | undefined 
  var __db: PrismaClient<Prisma.PrismaClientOptions, 'query' | 'info' | 'warn' | 'error'>
}

export const createDbConnection = (): DbConnection => {
  let connection: PrismaClient<Prisma.PrismaClientOptions, 'query' | 'info' | 'warn' | 'error'>;

  const connect = async (): Promise<void> => {
    if (process.env.NODE_ENV === "production") {
      connection = new PrismaClient({
        log: [
          {
            emit: 'event',
            level: 'query',
          },
          {
            emit: 'stdout',
            level: 'error',
          },
          {
            emit: 'stdout',
            level: 'info',
          },
          {
            emit: 'stdout',
            level: 'warn',
          },
        ],
      });
      // format logger
      connection.$on('query', (e) => {
        console.log('Query: ' + e.query)
        console.log('Params: ' + e.params)
        console.log('Duration: ' + e.duration + 'ms')
      })

      connection.$connect();
    } else {
      if (!global.__db) {
        global.__db = new PrismaClient({
          log: [
            {
              emit: 'event',
              level: 'query',
            },
            {
              emit: 'stdout',
              level: 'error',
            },
            {
              emit: 'stdout',
              level: 'info',
            },
            {
              emit: 'stdout',
              level: 'warn',
            },
          ],
        });
        // Format logger
        global.__db.$on('query', (e) => {
          console.log('Query: ' + e.query)
          console.log('Params: ' + e.params)
          console.log('Duration: ' + e.duration + 'ms')
        })
        global.__db.$connect();
      }
      connection = global.__db;   
    }
  };

  const getConnection = (): PrismaClient => {
    return connection;
  };

  return { connect, getConnection };
};
