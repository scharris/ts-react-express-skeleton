import React, {FunctionComponent, useState} from 'react';
import classNames from 'classnames';
import {Foo, FooCategory}  from 'dto';
import fooStyles from './foo-item.module.css';
import styles from './foo-item-editor.module.css';

interface Props
{
   foo: Foo | null;
   completeEditing: (foo: Foo) => void;
   cancelEditing?: () => void;
}

export const FooItemEditor: FunctionComponent<Props> = (props) =>
{
   const [category, setCategory] = useState<string>(props.foo?.category || '');
   const [name, setName] = useState<string>(props.foo?.name || '');
   const [description, setDescription] = useState<string|null>(props.foo?.description || '');

   const completeEditing = () => {
      props.completeEditing(
         {id: props.foo?.id || 0, category: toFooCategory(category), name, description}
      );
      setCategory('');
      setName('');
      setDescription('');
   }

   return (
      <div className={fooStyles.fooRow}>

         { props.foo?.id ?
            <div className={fooStyles.id}>{props.foo?.id}</div>
            : <span>Create new:</span>
         }

         <div className={fooStyles.category}>
            <input type="text"
               value={category} onChange={e => setCategory(e.target.value)} />
         </div>

         <div className={fooStyles.name}>
            <input type="text"
               value={name} onChange={e => setName(e.target.value)} />
         </div>

         <div className={fooStyles.description}>
            <input type="text"
               value={description || ''} onChange={e => setDescription(e.target.value)} />
         </div>

         <button className={classNames("action", styles.acceptEdits)} type="button"
            onClick={completeEditing}>
            OK
         </button>

         { props.cancelEditing ?
            <button className={classNames("action", styles.cancel)} type="button"
               onClick={props.cancelEditing}>
               Cancel
            </button>
            : <span/>
         }

      </div> // foo row
   );
}

function toFooCategory(s: string): FooCategory
{
   if ( s === 'A' || s === 'B' ) return s as FooCategory;
   else return 'A';
}
