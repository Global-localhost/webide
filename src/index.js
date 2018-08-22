import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import {Ide} from './ide';
import {Store} from './store';

const store = new Store();

class App extends React.Component {

  state = {
    initialized: false,
  }

  async componentDidMount() {
    await store.init();
    this.setState({initialized: true});
  }

  render() {
    if (!this.state.initialized) {
      return <div />; // TODO: Loading screen?
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path='/:programId'
            component={(router) => {
              return <Ide history={router.history} store={store} programId={router.match.params.programId}/>;
            }}
          />
          <Route path='/' component={Ide} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
module.hot.accept();
