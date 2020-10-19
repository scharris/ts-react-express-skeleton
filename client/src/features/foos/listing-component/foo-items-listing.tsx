import React from 'react';
import {Foo} from 'dto';
import {FooItem} from '../item-component/foo-item';
import styles from './foo-items-listing.module.css';

interface Props
{
   foos: Foo[];
   update: (ix: number, foo: Foo) => void;
   delete: (ix: number) => void;
}

export function FooItemsListing(props: Props)
{
   const listItems = props.foos.map((foo: Foo, ix: number) =>
      <div className={styles.listItem} key={foo.id}>
         <FooItem
            foo={foo}
            update={foo => props.update(ix, foo)}
            delete={() => props.delete(ix)} />
      </div>
   );

   return (
      <div className={styles.mainStack}>
         { listItems }
         { props.foos.length === 0 ? <div className={styles.noFoos}>no foos found</div>: null }
      </div>
   );
}

