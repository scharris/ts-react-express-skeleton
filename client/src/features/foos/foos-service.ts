import {Foo} from 'dto';
import {foosUrl, fooUrl} from '../../common-services/api-urls';

export async function getFoos(search: string | null, category: string | null = null): Promise<Foo[]>
{
   const resp = await fetch(foosUrl(search));

   if ( !resp.ok )
      await error(resp, "fetching foo items");

   const res = await resp.json();

   if ( !Array.isArray(res) )
      throw new Error("Unexpected result body encountered in foo items list response.");

   return category == null ? res: res.filter(foo => foo.category === category);
}

export async function deleteFoo(id: number): Promise<void>
{
   const resp = await
      fetch(fooUrl(id), {
         method: "DELETE"
      });

   if ( !resp.ok )
      await error(resp, "deleting foo");
}

export async function updateFoo(id: number, foo: Foo): Promise<void>
{
   const resp = await
      fetch(fooUrl(id), {
         method: "PUT",
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(foo)
      });

   if ( !resp.ok )
      await error(resp, "updating foo");
}

export async function createFoo(foo: Foo): Promise<void>
{
   const resp = await
      fetch(foosUrl(), {
         method: "POST",
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(foo)
      });

   if ( !resp.ok )
      await error(resp, "creating foo");
}

async function error(resp: Response, action: string): Promise<void>
{
   const errorText = await resp.text();
   const msg = `${resp.statusText} - ${errorText}`;
   console.log(`Error ${action}: ${msg}.`);
   throw new Error(`${action} failed with error: ${msg}`);
}
