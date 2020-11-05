import React, {FunctionComponent} from 'react';
import {Compound} from 'dto';
import styles from './foo-item.module.css';

interface Props
{
   compound: Compound;
}

export const FooCompound: FunctionComponent<Props> = (props) =>
{
   return (
      <div>
         <h4>Compound</h4>
         <div className="labelValueGrid">
            <div className={styles.itemDivider}/><div className={styles.itemDivider}/>

            <span className="fieldLabel">CAS</span>
            <div>{ props.compound?.cas }</div>

            <span className="fieldLabel">Name</span>
            <div>{ props.compound?.displayName}</div>

            <span className="fieldLabel">Entered by</span>
            <div>{ props.compound?.enteredByAnalyst?.shortName}</div>

            <span className="fieldLabel">ISIS-ID</span>
            <div>{ props.compound?.nctrIsisId }</div>
         </div>
      </div>
   );
}
