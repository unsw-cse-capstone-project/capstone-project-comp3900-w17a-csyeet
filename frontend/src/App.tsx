import React from 'react';
import * as style from './App.css';
import Logo from './logo.svg';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import classNames from 'classnames';


@observer
class App extends React.Component {
  @observable.ref
  thing: boolean = false;

  render() {
    const func = action(() => this.thing = !this.thing);
    return (
      <div className={style.App}>
        <header className={style.header}>
          <img src={Logo} alt="logo" className={style.logo} />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button className={classNames({[style.active]: this.thing, [style.notActive]: !this.thing})} onClick={func}>Click Me</button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }
}

export default App;
