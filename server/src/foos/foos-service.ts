import {Foo} from 'dto';
import {execSql} from '../db/pool-executor';

export async function getFoos(searchText: string | null): Promise<Foo[]>
{
   const sql =
      "select id, name, category, description " +
      "from foo " +
      "where cast(id as text) ilike $1 or name ilike $1 or category ilike $1 or description ilike $1 " +
      "order by id";

   const res = await execSql(sql, ['%' + (searchText || '') + '%']);

   return res.rows.map(rowToFoo);
}

export async function getFoo(id: number): Promise<Foo | null>
{
   const res = await execSql("select id, name, category, description from foo where id = $1", [id]);

   return res.rowCount !== 0 ? rowToFoo(res.rows[0]) : null;
}

export async function createFoo(foo: Foo): Promise<void>
{
   const res = await execSql(
      "insert into foo(name, category, description) values($1, $2, $3)",
      [foo.name, foo.category, foo.description]
   );

   if ( res.rowCount !== 1 )
      throw new Error('Expected one row to be modified when creating foo.');
}

export async function updateFoo(id: number, foo: Foo): Promise<void>
{
   if ( foo.id !== id )
      throw new Error("Cannot change foo id field via update.");

   const res = await execSql(
      "update foo set name = $1, category = $2, description = $3 where id = $4",
      [foo.name, foo.category, foo.description, id]
   );

   if ( res.rowCount !== 1 )
      throw new Error('Expected one row to be modified when updating a foo, instead modified ' + res.rowCount + ".");
}

export async function removeFoo(id: number): Promise<void>
{
   const res = await execSql("delete from foo where id = $1", [id]);

   if ( res.rowCount !== 1 )
      throw new Error('Expected one row to be modified when deleting a foo, instead modified ' + res.rowCount + ".");
}


function rowToFoo(r: any): Foo
{
   return { id: r.id, name: r.name, category: r.category, description: r.description };
}
