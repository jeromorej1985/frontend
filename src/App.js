import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import Questions from './components/Questions/Questions';
import Question from './components/Question/Question';
import {Route, withRouter} from 'react-router-dom';
import Callback from './components/Callback/Callback';
import NewQuestion from './components/NewQuestion/NewQuestion';
import SecuredRoute from './components/SecuredRoute/SecuredRoute';
import auth0Client from './components/Auth/Auth';


class App extends Component {
  state = {
    checkingSession: true
  }

  componentDidMount = async () => {
    if (this.props.location.pathname === '/callback') {
      this.setState({
        checkingSession: false
      });
      return;
    }

    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession: false});
  }
  render(){
    return (
      <div>
        <NavBar />
        <Route exact path='/' component={Questions} />
        <Route exact path='/question/:questionId' component={Question} />
        <Route exact path='/callback' component={Callback} />
        <SecuredRoute path='/new-question' component={NewQuestion} checkingSession={this.state.checkingSession} />
      </div>
    );
  }
}


export default withRouter(App);
