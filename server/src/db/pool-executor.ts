import * as oracledb from 'oracledb';
import {Pool, Result, BindParameters, ExecuteOptions} from 'oracledb';

const env = process.env;

if ( !env.DB_USER || !env.DB_PASSWORD || !env.DB_HOST || !env.DB_SERVICE )
   throw new Error("One or more required database connection values are not defined.");

const POOL_NAME = 'app-db-conn-pool';


export async function createPool(): Promise<Pool>
{
   return await oracledb.createPool({
      poolAlias: POOL_NAME,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      connectString: `${env.DB_HOST}/${env.DB_SERVICE}`,
      poolIncrement: 0,
      poolMax: +(env.DB_POOL_MAX_SIZE || 2),
      poolMin: +(env.DB_POOL_MIN_SIZE || 1)
   });
}

export async function execSql
   (
      sql: string,
      params: BindParameters = [],
      options: ExecuteOptions = {}
   )
   : Promise<Result<any>>
{
   let conn;
   try
   {
      conn = await oracledb.getConnection(POOL_NAME);
      return await conn.execute(sql, params, options);
   }
   catch(e)
   {
      console.error(e, 'sql: ', sql, params);
      throw e;
   }
   finally
   {
      if ( conn )
         await conn.close();
   }
}

export async function query
   (
      sql: string,
      params: BindParameters = []
   )
   : Promise<any[]>
{
   const res = await execSql(sql, params, { outFormat: oracledb.OUT_FORMAT_OBJECT });

   if ( !res.rows )
      throw new Error("Expected rows result from query.");

   return res.rows;
}


export async function closePool()
{
   console.log('\nClosing database connection pool.');

   try {
      await oracledb.getPool(POOL_NAME).close(10);
      console.log('Pool closed');
      process.exit(0);
   } catch(err) {
      console.error(err.message);
      process.exit(1);
   }
}
