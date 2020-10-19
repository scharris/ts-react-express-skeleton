import React from 'react';
import classNames from 'classnames';
import {Link, Route, Switch} from "react-router-dom";
import styles from './App.module.css';
import {FooItemsPage} from './features/foos/page-component/foo-items-page';
import {AboutPage} from './features/about/about';
import {HomePage} from './features/home/home';

export default function App() {
   return (
      <div className={classNames(styles.mainStack, 'some-global-style')}>
         <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/foos/cats/A">Foos of category A</Link>
            <Link to="/foos/cats/B">Foos of category B</Link>
            <Link to="/foos">All foos</Link>
         </nav>
         <Switch>
            <Route path="/foos/cats/:cat"  component={FooItemsPage} />
            <Route path="/foos"  component={FooItemsPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/"      component={HomePage} /> { /* needs to be last, it will match any path */}
         </Switch>
      </div>
   );
}
