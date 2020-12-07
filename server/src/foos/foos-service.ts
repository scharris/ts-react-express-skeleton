import {Foo} from 'dto';
import {execSql, execSqlResource, verifiedFieldNames, verifiedTableName} from '../db-access';
import * as DrugsQuery from '../generated/ts/drugs-query';
import * as DrugForIdQuery from '../generated/ts/drug-for-id-query';
import {drugs as drugsSchema} from '../generated/ts/relations';


export async function getFoos(searchText: string | null): Promise<Foo[]>
{
   const res = await execSqlResource(DrugsQuery.sqlResource, ['%' + (searchText || '') + '%']);

   const drugs: DrugsQuery.Drug[] = res.rows.map(r => r.json);

   return drugs.map(drugToFoo);
}

export async function getFoo(id: number): Promise<Foo | null>
{
   const res = await execSqlResource(DrugForIdQuery.sqlResource, [id]);

   const drugs: DrugForIdQuery.Drug[] = res.rows.map(r => r.json);

   return drugs.length === 0 ? null : drugToFoo(drugs[0]);
}

export async function createFoo(foo: Foo): Promise<void>
{
   const compoundId = foo.id % 5 + 1;

   // Check (at compile time) the table and field names to be used against database schema information.
   const drug = verifiedTableName(drugsSchema, "drug");
   const {id, name, compound_id, category_code, descr, registered_by} = verifiedFieldNames(drugsSchema.drug);

   const res = await execSql(
      `insert into ${drug}(${id}, ${name}, ${compound_id}, ${category_code}, ${descr}, ${registered_by}) ` +
      "values($1, $2, $3, $4, $5, 1)",
      [foo.id, foo.name, compoundId, foo.category, foo.description]
   );

   if ( res.rowCount !== 1 )
      throw new Error('Expected one row to be modified when creating foo.');
}

export async function updateFoo(fooId: number, foo: Foo): Promise<void>
{
   if ( foo.id !== fooId )
      throw new Error("Cannot change foo id field via update.");

   // Check (at compile time) the table and field names to be used against database schema information.
   const drugTable = verifiedTableName(drugsSchema, "drug");
   const {id, name, category_code, descr} = verifiedFieldNames(drugsSchema.drug);
   const res = await execSql(
      `update ${drugTable} set ${name} = $1, ${category_code} = $2, ${descr} = $3 where ${id} = $4`,
      [foo.name, foo.category, foo.description, fooId]
   );

   if ( res.rowCount !== 1 )
      throw new Error('Expected one row to be modified when updating a drug, instead modified ' + res.rowCount + ".");
}

export async function removeFoo(fooId: number): Promise<void>
{
   const drug = verifiedTableName(drugsSchema, "drug");
   const {id} = verifiedFieldNames(drugsSchema.drug);
   const res = await execSql(`delete from ${drug} where ${id} = $1`, [fooId]);

   if ( res.rowCount !== 1 )
      throw new Error('Expected one row to be modified when deleting a foo, instead modified ' + res.rowCount + ".");
}

function drugToFoo(d: DrugsQuery.Drug): Foo
{
   return {
      id: d.id,
      name: d.name,
      category: d.category === 'A' ? 'A' : 'B',
      description: d.description,
      brands: d.brands,
      advisories: d.advisories,
      functionalCategories: d.functionalCategories,
      registeredByAnalyst: d.registeredByAnalyst,
      compound: d.compound
   };
}
