import React, {FunctionComponent, useState} from 'react';
import classNames from 'classnames';
import {Foo} from 'dto';
import styles from './foo-item.module.css';
import {FooItemEditor} from './foo-item-editor';

interface Props
{
   foo: Foo;
   update: (foo: Foo) => void;
   delete: () => void;
}

export const FooItem: FunctionComponent<Props> = (props) => {

   const [editing, setEditing] = useState<boolean>(false);

   if ( editing )
   {
      return (
         <FooItemEditor
            foo={props.foo}
            completeEditing={foo => { props.update(foo); setEditing(false); }}
            cancelEditing={() => setEditing(false) } />
      );
   }
   else
   {
      return (
         <div className={styles.fooRow}>
            <div className={styles.id}>{props.foo.id}</div>
            <div className={styles.category}>{props.foo.category}</div>
            <div className={styles.name}>{props.foo.name}</div>
            <div className={styles.description}>{props.foo.description}</div>
            <button className={classNames('action', styles.edit)} type="button"
               onClick={() => setEditing(true)}>
               edit
            </button>
            <button className={classNames('action', styles.delete)} type="button"
               onClick={props.delete}>
               delete
            </button>
         </div>
      );
   }
}
