import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavBar from './NavBar';
import ErrorMessage from './ErrorMessage';
import Welcome from './Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Msal from "msal";
import 'bootstrap/dist/css/bootstrap.css';
import { config } from './Config';
import './App.css';
import { getUserDetails } from './GraphService';
import CalendarComponent from './Calender';

var msalInstance
class App extends Component  {
  constructor(props){
    super(props);
    this.state={
      error: undefined,
      isAuthenticated: false,
      user: {},
      token:""
    
    }

    let msalConfig = {
      auth: {
        clientId: config.appId,
        redirectUri: config.redirectUri
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true
    }
  };
    msalInstance = new Msal.UserAgentApplication(msalConfig);

  }

  isInteractionRequired =(error) => {
    if (!error.message || error.message.length <= 0) {
      return false;
    }

    return (
      error.message.indexOf('consent_required') > -1 ||
      error.message.indexOf('interaction_required') > -1 ||
      error.message.indexOf('login_required') > -1
    );
  }

  componentDidMount() {
    
    var account = msalInstance.getAccount();
    console.log(account);
    if (account!==null) {
      
      console.log("I m in")
      this.getUserProfile();
    }
  }

  logout=()=> {
    msalInstance.logout().redirectUri(config.redirectUri);
  }

  getAccessToken=async (scopes)=>{
    console.log(scopes);
    try {
      
      var tokenRequest = {
        scopes: scopes
    };
      msalInstance.acquireTokenSilent(tokenRequest)
      .then(response => {
          
          console.log(response.accessToken)
          this.setState({
            token:response.accessToken
          },()=>this.fetchUserDetailsFromToken())
          
      })
      .catch(err => {
          
          if (err.name === "InteractionRequiredAuthError") {
              return msalInstance.acquireTokenPopup(tokenRequest)
                  .then(response => {
                      
                      return response.accessToken;

                  })
                  .catch(err => {
                      
                      console.log(err);
                  });
          }
      });

    } catch (err) {
      console.log(err);
      
      if (this.isInteractionRequired(err)) {
        
        var interactiveResult = msalInstance.acquireTokenPopup({
          scopes: scopes
        });

        return interactiveResult.accessToken;
      } else {
        throw err;
      }
    }
  }

fetchUserDetailsFromToken =async()=>{
  try {
    
      let token = this.state.token;
      console.log("token   "+token)
      getUserDetails(token).then((user)=>{
        console.log(user);
        this.setState({
          isAuthenticated: true,
          user: {
            displayName: user.displayName,
            email: user.mail || user.userPrincipalName
          }
        });
      })
    
  }
  
    catch(err) {
      console.log(err);
      this.setState({
        isAuthenticated: false,
        user: {},
        error: this.normalizeError(err)
      });
    }
}

setErrorMessage=(message, debug)=> {
  this.setState({
    error: {message: message, debug: debug}
  });
}

  getUserProfile=async()=> {
    this.getAccessToken(config.scopes);
    
      }
  
      normalizeError(error) {
        var normalizedError = {};
        if (typeof(error) === 'string') {
          var errParts = error.split('|');
          normalizedError = errParts.length > 1 ?
            { message: errParts[1], debug: errParts[0] } :
            { message: error };
        } else {
          normalizedError = {
            message: error.message,
            debug: JSON.stringify(error)
          };
        }
        return normalizedError;
      }

  login =()=> {
    try {
      
      msalInstance.loginPopup({
        scopes: config.scopes,
        prompt: "select_account"
    })
        .then(response => {
            
            console.log(response);
            this.getUserProfile();
        })
        .catch(err => {
          console.log("Error")
          this.setState({
            isAuthenticated: false,
            user: {},
            error: this.normalizeError(err)
          });
        });

    }
    catch(err) {
     console.log("Error")
    }
  }

  render() {
    let error = null;
    if (this.state.error!==undefined) { 
      error = <ErrorMessage
        message={this.state.error.message}
        debug={this.state.error.debug} />;
    }

    return (
      <Router>
        <div>
          
          <NavBar
            token = {this.state.token}
            isAuthenticated={this.state.isAuthenticated}
            authButtonMethod={this.state.isAuthenticated ? this.logout : this.login}
            user={this.state.user}/>
          
        </div>
        {error}
        <Route exact path="/calendar"
                render={(props) =>
                  this.state.isAuthenticated ?
                  
                    <CalendarComponent getAccessToken={this.state.token} setError =  {this.setErrorMessage} /> :
                    <Redirect to="/" />
                } />
      </Router>
    );
    }
}

export default App;