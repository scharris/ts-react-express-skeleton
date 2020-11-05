declare module 'dto'
{
   export interface Foo
   {
      id: number;
      category: FooCategory;
      name: string;
      description: string | null;
      brands?: Brand[];
      advisories?: Advisory[];
      functionalCategories?: DrugFunctionalCategory[];
      registeredByAnalyst?: Analyst;
      compound?: Compound;
   }

   export type FooCategory = 'A' | 'B';

   export interface DrugReference
   {
      publication: string;
   }

   export interface Brand
   {
      brandName: string;
      manufacturer: string | null;
   }

   export interface Advisory
   {
      advisoryText: string;
      advisoryType: string;
      authorityName: string;
      authorityUrl: string | null;
      authorityDescription: string | null;
      exprYieldingTwo: number;
   }

   export interface DrugFunctionalCategory
   {
      categoryName: string;
      description: string | null;
      authorityName: string;
      authorityUrl: string | null;
      authorityDescription: string | null;
   }

   export interface Analyst
   {
      id: number;
      shortName: string;
   }

   export interface Compound
   {
      displayName: string | null;
      nctrIsisId: string | null;
      cas: string | null;
      entered: string | null;
      enteredByAnalyst: Analyst;
   }

}

