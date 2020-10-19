import React, {FunctionComponent, useState} from 'react';
import classNames from 'classnames';
import {Foo}  from 'dto';
import fooStyles from './foo-item.module.css';
import styles from './foo-item-editor.module.css';

interface Props
{
   foo: Foo;
   completeEditing: (foo: Foo) => void;
   cancelEditing: () => void;
}

export const FooItemEditor: FunctionComponent<Props> = (props) =>
{
   const [name, setName] = useState<string>(props.foo.name);
   const [description, setDescription] = useState<string|null>(props.foo.description);

   const completeEditing = () => {
      props.completeEditing({id: props.foo.id, category: props.foo.category, name, description});
   };

   return (
      <div className={fooStyles.fooRow}>
         <div className={fooStyles.id}>{props.foo.id}</div>
         <div className={fooStyles.category}>{props.foo.category}</div>
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
         <button className={classNames("action", styles.cancel)} type="button"
            onClick={props.cancelEditing}>
            Cancel
         </button>
      </div>
   );
}
