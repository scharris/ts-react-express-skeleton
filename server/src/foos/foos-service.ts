import {Foo} from 'dto';
import {execSql, execSqlResource} from '../db-access';
import * as DrugsQuery from '../generated/query-types/drugs-query';
import * as DrugHavingCidQuery from '../generated/query-types/drug-having-cid-query';

export async function getFoos(searchText: string | null): Promise<Foo[]>
{
   const res = await execSqlResource(DrugsQuery.sqlResource, ['%' + (searchText || '') + '%']);

   const drugs: DrugsQuery.Drug[] = res.rows.map(r => r.json);

   return drugs.map(drugToFoo);
}

export async function getFoo(id: number): Promise<Foo | null>
{
   const res = await execSqlResource(DrugHavingCidQuery.sqlResource, [id]);

   const drugs: DrugHavingCidQuery.Drug[] = res.rows.map(r => r.json);

   return drugs.length === 0 ? null : drugToFoo(drugs[0]);
}

export async function createFoo(foo: Foo): Promise<void>
{
   // TODO: Use relation metadatas to build insert statements.
   //       makeInsertSql(drugs.drug, [{ field: drugs.drug.cid, value: foo.id, paramName: "$1" }, ...]);
   const res = await execSql(
      "insert into foo(name, category, description) values($1, $2, $3)",
      [foo.name, foo.category, foo.description]
   );

   if ( res.rowCount !== 1 )
      throw new Error('Expected one row to be modified when creating foo.');
}

export async function updateFoo(id: number, foo: Foo): Promise<void>
{
   // TODO
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
   // TODO
   const res = await execSql("delete from foo where id = $1", [id]);

   if ( res.rowCount !== 1 )
      throw new Error('Expected one row to be modified when deleting a foo, instead modified ' + res.rowCount + ".");
}

function drugToFoo(d: DrugsQuery.Drug): Foo
{
   const category = d.functionalCategories.some(cat => cat.categoryName.startsWith("Category A")) ? "A" : "B";
   const description =
      `drug with ${d.functionalCategories.length} categories, ` +
      `${d.advisories.length} advisories, ` +
      `${d.brands.length} brands`;
   return { id: d.cid || 0, name: d.name, category, description };
}
