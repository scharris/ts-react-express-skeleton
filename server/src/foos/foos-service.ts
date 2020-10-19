import {Foo} from 'dto';

const allFoos: Foo[] = [
   { id: 1, name: 'first A', category: 'A', description: 'The first item of type A.' },
   { id: 2, name: 'second A', category: 'A', description: 'The second item of type A.'  },
   { id: 3, name: 'first B', category: 'B', description: 'The first item of type B.' },
   { id: 4, name: 'second B', category: 'B', description: 'The second item of type B.'  },
   { id: 5, name: 'third B', category: 'B', description: 'The third item of type B.' },
   { id: 6, name: 'fourth B', category: 'B', description: 'The fourth item of type B.' },
];

export async function getFoos(searchText: string | null): Promise<Foo[]>
{
   if ( !searchText )
      return allFoos;

   const matches = (foo: Foo, s: string) =>
      foo.id.toString().indexOf(s) !== -1 ||
      foo.category.indexOf(s) !== -1 ||
      foo.name.indexOf(s) !== -1 ||
      foo.description && foo.description.indexOf(s) !== -1;

   return allFoos.filter(foo => matches(foo, searchText));
}

export async function getFoo(id: number): Promise<Foo>
{
   const item = findFoo(id);

   if ( !item )
      throw new Error("Item not found.");

   return item;
}

export async function createFoo(item: Foo): Promise<void>
{
   const existingItem: Foo | null = findFoo(item.id);

   if ( existingItem != null )
      throw new Error("Item of given id already exists.");

   allFoos.push(Object.assign({}, item));
}

export async function updateFoo(id: number, newValue: Foo): Promise<void>
{
   const existingItem: Foo | null = findFoo(id);

   if ( existingItem == null )
      throw new Error("Item not found.");
   if ( existingItem.id !== newValue.id )
      throw new Error("Cannot update key field.");

   Object.assign(existingItem, newValue);
}

export async function removeFoo(id: number): Promise<void>
{
   const ix = allFoos.findIndex(i => i.id === id);

   if ( ix === -1 )
      throw new Error("Item not found.");

   allFoos.splice(ix, 1);
}

function findFoo(id: number): Foo | null
{
   return allFoos.find(i => i.id === id) || null;
}
