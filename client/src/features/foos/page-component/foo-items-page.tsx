import React, {FunctionComponent, useEffect, useState} from 'react';
import {RouteComponentProps, useParams} from 'react-router';
import {Foo} from 'dto';
import {getFoos, deleteFoo as serverDeleteFoo, updateFoo as serverUpdateFoo,
        createFoo as serverCreateFoo} from '../foos-service';
import {FooItemsListing} from '../listing-component/foo-items-listing';
import {SearchBar} from './search-bar';
import styles from './foo-items-page.module.css';
import {FooItemEditor} from '../item-component/foo-item-editor';

export const FooItemsPage: FunctionComponent<RouteComponentProps> = (props) =>
{
   const category = (useParams() as any)?.cat || null;
   const [searchText, setSearchText] = useState<string>('');
   const [foos, setFoos] = useState<FoosState>([]);
   const [loading, setLoading] = useState(false);

   async function loadData()
   {
      setLoading(true);
      setFoos(await getFoos(searchText, category));
      setLoading(false);
   }

   async function createFoo(foo: Foo)
   {
      await serverCreateFoo(foo);
      await loadData();
   }
   async function updateFoo(ix: number, foo: Foo)
   {
      setLoading(true); // Prevents seeing old values during reloading.
      await serverUpdateFoo(foos[ix].id, foo);
      await loadData();
   }

   async function deleteFoo(ix: number)
   {
      await serverDeleteFoo(foos[ix].id);
      await loadData();
   }

   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(() => { loadData(); }, [category]); // Load initially and whenever category value changes.

   const results = !loading ?
      <FooItemsListing foos={foos} update={updateFoo} delete={deleteFoo} />
      : <div className={styles.loading}>Loading ...</div>;

   return (
      <div className={styles.mainStack}>
         <h2>Foos Search</h2>
         <div className={styles.searchArea}>
            <SearchBar
               searchText={searchText}
               searchTextChange={s => setSearchText(s)}
               search={loadData} />
            { results }
         </div>
         <div className={styles.newFooArea}>
            <span className={styles.label}>Create new:</span>
            <FooItemEditor foo={null} labels={true} completeEditing={createFoo} />
         </div>
      </div>
   );
}

type FoosState = Foo[];
