import React, {FunctionComponent} from 'react';
import {Advisory} from 'dto';
import styles from './foo-item.module.css';

interface Props
{
   advisories: Advisory[];
}

export const FooAdvisories: FunctionComponent<Props> = (props) =>
{
   return (
      <div>
         <h4>Advisories</h4>
         {
            props.advisories?.map((adv,ix) =>
               <div key={ix} className="labelValueGrid">
                  <div className={styles.itemDivider}/><div className={styles.itemDivider}/>
                  <span className="fieldLabel">Type</span>
                  <div className={styles.advisoryType}>{ adv.advisoryType }</div>
                  <span className="fieldLabel">Text</span>
                  <div className={styles.advisoryText}>{ adv.advisoryText }</div>
                  <span className="fieldLabel">Authority</span>
                  <div className={styles.authority}>{ adv.authorityName }</div>
               </div>
            )
         }
      </div>
   );
}
