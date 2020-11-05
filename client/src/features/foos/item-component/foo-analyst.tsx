import React, {FunctionComponent} from 'react';
import {Analyst} from 'dto';
import styles from './foo-item.module.css';

interface Props
{
   analyst: Analyst;
}

export const FooAnalyst: FunctionComponent<Props> = (props) =>
{
   return (
      <div>
         <h4>Analyst</h4>
         <div className="labelValueGrid">
            <div className={styles.itemDivider}/><div className={styles.itemDivider}/>
            <span className="fieldLabel">ID</span>
            <div>{ props.analyst.id }</div>
            <span className="fieldLabel">Name</span>
            <div>{ props.analyst.shortName }</div>
         </div>
      </div>
   );
}
