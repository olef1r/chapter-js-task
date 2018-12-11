import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import EditComponent from './EditComponent';
import IndexComponent from './IndexComponent' 

class App extends Component {
  state = { 
  }
  render() {  
    return (
       <Router>
        <div>
        <IndexComponent />
        
          <hr />
          <Switch>
              {/* <Route exact path='/create' component={CreateComponent} /> */}
              <Route path='/edit/:id' component={EditComponent} />
              <Route path='/index' component={IndexComponent} />
          </Switch>
        </div>
      </Router>
    );
  }   
}

export default App;
