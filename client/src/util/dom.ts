import {FormEvent} from 'react';

/** Return an event handling function which does the given action and
 *  prevents further event propagation.
 */
export function preventDefault<T>(action: () => T): ((e: FormEvent) => void)
{
   return (e) => {
      action();
      e.preventDefault();
   };
}
