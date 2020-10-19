import React from 'react';
import styles from './about.module.css';

export function AboutPage()
{
   return (
      <>
         <h2>
            This is the About page.
         </h2>
         <div className={styles.message}>
            Skeleton application ver 1.0.
         </div>
      </>
   );
}
