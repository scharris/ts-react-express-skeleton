export function foosUrl(search: string | null = null): string
{
   return apiUrl('foos', [{name: 's', value: search}])
}

export function fooUrl(id: number): string
{
   return apiUrl(`foos/${id}`)
}


/** Helper function for building api urls with or without query parameters.
 */
function apiUrl(resource: string, queryParams: QueryParam[] = [])
{
   const queryParamEqs =
      queryParams
      .filter(p => p.value != null)
      .map(p => `${encodeURIComponent(p.name)}=${encodeURIComponent(p.value || '')}`)
      .join('&');

   const queryPart = queryParamEqs.length > 0 ? `?${queryParamEqs}` : '';

   return `/api/${resource}${queryPart}`;
}

interface QueryParam
{
   name: string,
   value: string | null
}

