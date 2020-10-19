import React, {FunctionComponent} from 'react';
import {preventDefault} from '../../../util/dom';
import styles from './search-bar.module.css';

interface Props
{
   searchText: string;
   searchTextChange: (searchText: string) => void;
   search: () => void;
}

export const SearchBar: FunctionComponent<Props> = (props: Props) =>
{
   return (
      <form className={styles.searchBar} onSubmit={preventDefault(props.search)}>
         <label>
            Search:
            <input type="text"
               value={props.searchText}
               onChange={e => props.searchTextChange(e.target.value)}/>
         </label>
         <button className='action' type="submit">Search</button>
      </form>
   );
}
