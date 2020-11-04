import * as fs from 'fs/promises';
import path from 'path';

const sqlCache = new Map<string,string>(); // SQL statements by resource/file name

export async function loadSqls(sqlDir: string): Promise<number>
{
   let loadedCount = 0;
   for ( const sqlFileName of await fs.readdir(sqlDir) )
   {
      const sqlBuf = await fs.readFile(path.join(sqlDir, sqlFileName));
      const sql = sqlBuf.toString("utf-8");
      sqlCache.set(sqlFileName, sql);
      ++loadedCount;
   }
   return loadedCount;
}

export function getSql(resourceName: string): string
{
   const sql = sqlCache.get(resourceName);
   if ( !sql )
      throw new Error(`SQL file not found: '${resourceName}'.`);
   return sql;
}
