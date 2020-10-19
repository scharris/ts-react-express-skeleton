import {useEffect} from 'react';

/** Schedule an effectful function to be run once after the first rendering.
 *  This utility functions avoids a common linter complaint about "missing"
 *  dependencies in the dependencies list.
 */
export function useMountEffect(f: () => (void | (() => (void | undefined))))
{
   useEffect(f, []);
}
