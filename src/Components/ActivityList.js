import React, { Component } from 'react'
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react';
import { List } from 'semantic-ui-react'
import { Avatar } from 'antd';
import { Divider } from 'semantic-ui-react'
import $ from "jquery";
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react';
import _ from 'lodash';
const resultRenderer = ({ firstName, lastName }) => <Label content={`${firstName} ${lastName !== null ? lastName : ''}`} />

resultRenderer.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string
}

export class ActivityList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      activityList: [],
      activeButtonUser: false,
      arr: [],
      lastindex: -1,
      bgColor: [],
      fgColor: [],
      isLoading: false,
      results: [],
      value: '',
      temporaryUserList: [],
    };
  }


  getActivityList = () => {
    axios.get(`http://localhost:8060/activity`).then(response => {
      // this.setState({ activityList: response.data }, () => { console.log("wadu", this.state.activityList) });
      console.log("reading response",response.data.data);
      this.setState({activityList:response.data.data},()=>{console.log("wadu",this.state.activityList)});
      let bgColor = [];
      let fgColor = [];
      for (let i = 0; i < this.state.activityList.length; i++) {
        bgColor[i] = this.getRandomColor();
        fgColor[i] = this.getRandomColorDark();
      }
      this.setState({
        bgColor: bgColor,
        fgColor: fgColor
      })
    })
  }


  componentDidMount() {
    this.getActivityList();
  }
  
  handleGetAssignedActivities = (id) => {
    axios.get(`http://localhost:8060/getAllActivityByUser/` + id).then(res => {
      console.log("hello");
      this.props.myActivitiesList(res.data)
    })
  }


  addActiveStateActivity = (classname, activity , index) => {
    if (index !== this.state.lastindex) {
      console.log("im here" + classname)
      let arr = this.state.arr;
      arr[index] = true;
      arr[this.state.lastindex] = false;
      this.setState({
        lastindex: index,
        arr: arr
      })
      console.log(activity);
      this.props.handleSetActivity(activity);
    }
  }

  getRandomColor = () => {
    var color = "hsl(" + Math.random() * 360 + ", 100%, 90%)";
    return color;
  }

  getRandomColorDark = () => {
    var color = "hsl(" + Math.random() * 360 + ", 100%, 30%)";
    return color;
  }

  // usercomponent = (user, classname, index) => {
  //   return (
      // <div className="card custom-Card-User">
      //   <div style={{ display: "inline-flex" }}>
      //     <Avatar style={{ color: this.state.fgColor[index], backgroundColor: this.state.bgColor[index] }}>{user.firstName.substr(0, 1)}</Avatar>
      //     <a onClick={() => { this.addActiveState(classname, user.userId, index) }} class={`item ${this.state.arr[index] ? "active" : ''}`}>
      //       {user.firstName} {user.lastName}
      //     </a> </div>
      // </div>
  //   )
  // }

  activityComponent = (activity , classname, index) =>{
    return(
      <div className="card custom-Card-User">
        <div style={{ display: "inline-flex" }}>
          <Avatar style={{ color: this.state.fgColor[index], backgroundColor: this.state.bgColor[index] }}>{activity.name.substr(0, 1)}</Avatar>
          <a onClick={() => { this.addActiveStateActivity(classname, activity , index) }} class={`item ${this.state.arr[index] ? "active" : ''}`}>
            {activity.name}
          </a> </div>
      </div>
    )
  }


  render() {
    // const { isLoading, value, results } = this.state
    // const userlist = this.state.userList.map((user, key) => {
    //   return this.usercomponent(user, "q" + key + " item", key);
    // })
    const activityList = this.state.activityList.map((activity,key)=>{
      return this.activityComponent(activity, "q" + key + " item", key);
    })

    return (
      // <div class="ui secondary vertical menu search-custom">
        <div className="user-list-div">
          {activityList}
        </div>
      // </div>
    )
  }
}

export default ActivityList