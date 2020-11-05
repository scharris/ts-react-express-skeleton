import React, {FunctionComponent} from 'react';
import {DrugFunctionalCategory} from 'dto';
import styles from './foo-item.module.css';

interface Props
{
   categories: DrugFunctionalCategory[];
}

export const FooFunctionalCategories: FunctionComponent<Props> = (props) =>
{
   return (
      <div>
         <h4>Functional Categories</h4>
         {
            props.categories?.map((cat, ix) =>
               <div key={ix} className="labelValueGrid">
                  <div className={styles.itemDivider}/><div className={styles.itemDivider}/>
                  <span className="fieldLabel">Description</span>
                  <div className={styles.funcatsDescription}>{ cat.description }</div>
                  <span className="fieldLabel">Authority</span>
                  <div className={styles.authority}>{ cat.authorityName }</div>
               </div>
            )
         }
      </div>
   );
}
