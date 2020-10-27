import {Foo} from 'dto';
import {execSql, query} from '../db/pool-executor';

export async function getFoos(searchText: string | null): Promise<Foo[]>
{
   const sql =
     `select id, name, category, description
      from foo
      where
         cast(id as varchar(20)) like :s or
         lower(name) like :s or
         lower(category) like :s
         or lower(description) like :s
      order by id`;

   const rows = await query(sql, {
      "s": '%' + (searchText ? searchText.toLocaleLowerCase(): '') + '%'
   });

   return rows.map(rowToFoo);
}

export async function getFoo(id: number): Promise<Foo | null>
{
   const rows = await query(
      "select id, name, category, description from foo where id = :1",
      [id]
   );

   return rows.length !== 0 ? rowToFoo(rows[0]) : null;
}

export async function createFoo(foo: Foo): Promise<void>
{
   const res = await execSql(
      "insert into foo(name, category, description) values(:1, :2, :3)",
      [foo.name, foo.category, foo.description],
      { autoCommit: true }
   );

   if ( res.rowsAffected !== 1 )
      throw new Error('Expected one row to be modified when creating foo.');
}

export async function updateFoo(id: number, foo: Foo): Promise<void>
{
   if ( foo.id !== id )
      throw new Error("Cannot change foo id field via update.");

   const res = await execSql(
      "update foo set name = :name, category = :cat, description = :descr where id = :id",
      { "id": id, "name": foo.name, "cat": foo.category, "descr": foo.description },
      { autoCommit: true }
);

   if ( res.rowsAffected !== 1 )
      throw new Error(`Expected one row to be modified when updating a foo, got: ${res.rowsAffected}.`);
}

export async function removeFoo(id: number): Promise<void>
{
   const res = await execSql("delete from foo where id = :1", [id], { autoCommit: true });

   if ( res.rowsAffected !== 1 )
      throw new Error(`Expected one row to be modified when deleting a foo, got ${res.rowsAffected}.`);
}

function rowToFoo(r: any): Foo
{
   return { id: r.ID, name: r.NAME, category: r.CATEGORY, description: r.DESCRIPTION };
}
