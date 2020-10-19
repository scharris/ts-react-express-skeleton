declare module 'dto'
{
   export interface Foo
   {
      id: number;
      category: FooCategory;
      name: string;
      description: string | null;
   }

   export type FooCategory = 'A' | 'B';
}

