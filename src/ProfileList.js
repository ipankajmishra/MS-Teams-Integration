import React, { Component } from 'react';
import axios from 'axios';

export default class ProfileList extends Component{

    constructor(props) {
        super(props);
        this.state = {
          userList: [],
          myActivities: [],
        };
    }

    componentDidMount(){
        axios.get(`http://localhost:6769/api/v1/user/UserAccess/allUsers`).then(res=>{
          this.setState({
            userList:res.data
          })
        })
      }
    
      handleGetAssignedActivities=()=>{
        axios.get(`http://localhost:8060/getAllActivityByUser/55`).then(res=>{
          console.log("hello")
          this.setState({
            myActivities:res.data
          })
        })
      }

      render(){
          return(
              <>
              
              </>
          )
      }
}