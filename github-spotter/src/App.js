/*_____Imports from React Library________*/
import React, { Component, Fragment } from 'react';
import './App.css';
import axios from 'axios';
/*______Import Custom Component_________*/
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Search from './components/users/Search';





/*_______Component : App_________________*/
class App extends Component {
  state = {
    users : [],
    loading : false
  }
 
  searchUsersFromGithub = async (text)=>{
    this.setState({loading: true});
    
    const githubHandle = text;

    const response = await axios.get(`https://api.github.com/search/users?q=${githubHandle}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}
    `);

    this.setState({loading : false, users : response.data.items})
  }
  clearUsers = () =>{

    this.setState({users:[], loading:false});
  }
  render(){
  
    return (
      <Fragment>
         <Navbar title = "GitHub Spotter"  icon = "fab fa-github" />
         <Search 
              searchUsers={this.searchUsersFromGithub}
              clearUsers = {this.clearUsers}
              showClear={this.state.users.length > 0 ? true : false}
         />
        <div className="container">
           <User loading={this.state.loading} users = {this.state.users} />
        </div>
      </Fragment>
    );

  } 
 
} 

export default App;



