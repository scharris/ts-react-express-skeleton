import React, {FunctionComponent, useState} from 'react';
import classNames from 'classnames';
import {Foo} from 'dto';
import styles from './foo-item.module.css';
import {FooItemEditor} from './foo-item-editor';
import {FooAnalyst} from './foo-analyst';
import {FooAdvisories} from './foo-advisories';
import {FooFunctionalCategories} from './foo-functional-categories';
import {FooBrands} from './foo-brands';
import {FooCompound} from './foo-compound';

interface Props
{
   foo: Foo;
   update: (foo: Foo) => void;
   delete: () => void;
}

export const FooItem: FunctionComponent<Props> = (props) => {

   const [editing, setEditing] = useState<boolean>(false);

   const fooRow =
      editing ?
         <FooItemEditor
            foo={props.foo}
            completeEditing={foo => { props.update(foo); setEditing(false); }}
            cancelEditing={() => setEditing(false) } />
         :
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
         </div>;

   return (
      <div className={styles.fooStack}>

         { fooRow }

         <div className={styles.associatedItems}>
            { props.foo.brands &&
               <FooBrands brands={props.foo.brands}/> }

            { props.foo.functionalCategories &&
               <FooFunctionalCategories categories={props.foo.functionalCategories}/> }

            { props.foo.advisories &&
               <FooAdvisories advisories={props.foo.advisories}/> }

            { props.foo.compound &&
            <FooCompound compound={props.foo.compound}/> }

            { props.foo.registeredByAnalyst &&
               <FooAnalyst analyst={props.foo.registeredByAnalyst}/> }
         </div>
      </div>
   );
}
