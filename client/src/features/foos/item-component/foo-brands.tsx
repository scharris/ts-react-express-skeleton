import React, {FunctionComponent} from 'react';
import {Brand} from 'dto';
import styles from './foo-item.module.css';

interface Props
{
   brands: Brand[];
}

export const FooBrands: FunctionComponent<Props> = (props) =>
{
   return (
      <div>
         <h4>Brands</h4>
         {
            props.brands.map((brand, ix) =>
               <div key={ix} className="labelValueGrid">
                  <div className={styles.itemDivider}/><div className={styles.itemDivider}/>
                  <span className="fieldLabel">Name</span>
                  <div>{brand.brandName}</div>
                  <span className="fieldLabel">Mfr</span>
                  <div>{brand.manufacturer}</div>
               </div>
            )
         }
      </div>
   );
}
