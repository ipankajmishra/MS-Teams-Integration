import React, { Component } from 'react'
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import axios from 'axios';
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react';
import { List } from 'semantic-ui-react'
import { Avatar, Dropdown,Button as AntButton  } from 'antd';
import { Divider } from 'semantic-ui-react'
import $ from "jquery";
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react';

import _ from 'lodash';
import { forEach } from 'async';
import UserList from './UserList';
// const initialState = { isLoading: false, results: [], value: '' }

const resultRenderer = ({ firstName,lastName }) => <Label content={`${firstName} ${lastName!==null?lastName:''}`} />

resultRenderer.propTypes = {
  firstName: PropTypes.string,
  lastName:PropTypes.string
}

export class ListProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      activeButtonUser:false,
      arr:[],
      lastindex:-1,
      bgColor:[],
      fgColor:[],
      isLoading: false,
       results: [],
        value: '',
        temporaryUserList:[],
        categoryList:[],
        userListCopy:[],
        selectedUser:{},
        teamColor:[],
        userData:[]
      // myActivities: [],
    };
    // this.hello();
  }

  componentWillReceiveProps(props){
    
     if(props.userData!==this.props.userData){
      this.setState({
        userData:props.userData
      },()=>this.getUserData())
     }
    
  }

  // componentDidMount(){
  //   this.componentDidMountMy();
  // }
  

 

  


  getUserData=()=> {
    this.setState({
      userList:[]
    })
 

    console.log(this.props.userData)
   
    axios.get(`http://localhost:6769/api/v1/user/UserAccess/allUsers`).then(res => {
      this.setState({
        temporaryUserList:res.data
      })
    })
    
    
    axios.get(`http://localhost:6769/api/v1/category/AdminAccess/allCategories`).then(res => {
      let teamColor = this.state.teamColor;
      for(let y=0;y<res.data.length;y++){
          teamColor[y]=this.getRandomColorDarkforTeam();
      }
      this.setState({
        categoryList:res.data,
        teamColor:teamColor
      })
      
    }).then((response)=>{
      for(let i=0;i<this.state.categoryList.length;i++){
        let formData = {
          "category":this.state.categoryList[i]
        }
        console.log(formData);
        axios.post(`http://localhost:6769/api/v1/user/AdminAccess/searchUser`,formData).then(res => {
          // console.log("helo"+JSON.stringify(res.data));
          let array = [];
          let j=0;
          for(let i=0;i<res.data.length;i++){
            if(this.state.userData.includes((res.data[i].userId).toString())){
                array[j]=res.data[i];
                console.log("hello akku")
                j++;
            }
          }
          let userList = this.state.userList;
          let length = userList.length;
          // userList[length]=res.data;
          userList[length] = array;
          this.setState({
            userList: userList,
            userListCopy:userList
          })
      
      
        
        
  
       
        // let arr = this.state.arr;
        // let length = this.state.userList.length;
        // arr.fill(false);
        // // for(let i=0;i<length;i++){
        // //   arr[i]=false
        // // }
        // this.setState({
        //   arr:arr
        // })
        let bgColor = this.state.bgColor;
        let fgColor = this.state.fgColor;
        for(let w=65;w<123;w++){
         bgColor[w]=this.getRandomColor();
         fgColor[w]=this.getRandomColorDark();
        }
        // for(let i=0;i<this.state.userList.length;i++){
        //   bgColor[i]=this.getRandomColor();
        //   fgColor[i]=this.getRandomColorDark();
        // }
        
        this.setState({
          bgColor:bgColor,
          fgColor:fgColor
        })
        
      })
    }
    console.log(this.state.userList.length)
    })
    // let userData = [];
    
}


  handleResultSelect = (e, { result }) => {
    // console.log(result)
    let value = result.firstName + " "+ (result.lastName===null?'':result.lastName);
    this.setState({ 
    value: value
    
  })
  if(this.state.results.length>0){
    let arr = [];
    arr[0] = this.state.results;
    this.setState({
      userList:arr
    })
  }else{
    this.setState({
      userList:this.state.temporaryUserList
    })
  }
}

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState({isLoading: false, results: [], value: '',userList:this.state.userListCopy})

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => 
        re.test(result.firstName + " "+result.lastName)
        // re.test(result.lastName)
      
      let result = _.filter(this.state.temporaryUserList, isMatch);
      this.setState({
        isLoading: false,
        results: result
      })
    }, 300)
  }



  handleGetAssignedActivities = (id) => {
    axios.get(`http://localhost:8060/getAllActivityByUser/` + id).then(res => {
      console.log("hello")
      // this.setState({
      //   myActivities: res.data
      // })
      this.props.myActivitiesList(res.data)
    })
  }

  
addActiveState = (user,classname,id,index) =>{
  this.setState({
      selectedUser:user
    })
  this.handleGetAssignedActivities(id);
  // if(index!==this.state.lastindex){console.log("im here"+classname)
  // let arr = this.state.arr;
  // arr[index]=true;
  // arr[this.state.lastindex]=false;
  // this.setState({
  //   lastindex:index,
  //   arr:arr
  // })
  // this.setState({
  //   selectedUser:user
  // })
  
  
  // this.handleGetAssignedActivities(id);}
}

getRandomColor=()=> {
 var color = "hsl(" + Math.random() * 360 + ", 100%, 90%)";
  return color;
}

getRandomColorDark=()=> {
  var color = "hsl(" + Math.random() * 360 + ", 100%, 30%)";
   return color;
 }

 getRandomColorDarkforTeam=()=> {
  var color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
   return color;
 }

  usercomponent=(user,classname,mainindex,index)=>{
    let name = user.firstName;
    let asciiValue = name.charCodeAt(0);
    let bgColor = this.state.bgColor[asciiValue];
    let fgColor = this.state.fgColor[asciiValue];
    return(
    <div className="card custom-Card-User" style={{backgroundColor:this.state.teamColor[mainindex]}}>
      
<div className="card custom-Card-User-inside">
      <div style={{display:"inline-flex"}}>
    <Avatar style={{ color: fgColor, backgroundColor: bgColor }}>{user.firstName.substr(0,1)}</Avatar>
    <a onClick={()=>{this.addActiveState(user,classname,user.userId,index)}} class={`item ${this.state.selectedUser.userId===user.userId?"active":''}`}>
    {user.firstName} {user.lastName}
  </a> </div>
      {/* <Divider /> */}
    </div>
    </div>
   
    
    )
}


  render() {
    const { isLoading, value, results } = this.state
    // const userlist = this.state.userList.map((user,key) => {
    //   return this.usercomponent(user,"q"+key + " item",key);
    // })

    const userlist = this.state.userList.map((userArray,Mainkey) => {
    return <div><p style={{paddingLeft:"10px",marginTop:"10px"}}>{userArray.length > 0 && userArray[0].category.categoryName}</p>{userArray.map((user,key)=>{
      return this.usercomponent(user,"q"+key + " item",Mainkey,key);
    })}</div>
    })

    // const teamWiseUserList = this.
    return (
      // <List divided relaxed className="active item custom-List">
      //   {userlist}
      // </List>
      <div class="ui secondary vertical menu search-custom">
        <Grid className="">
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
            {...this.props}
          />
        </Grid.Column>
       
      </Grid>
      {/* <Dropdown>
        overlay={menu} 
        <AntButton>
          Button <DownOutlined />
        </AntButton>
      </Dropdown> */}
      <div>
        
      </div>
      <div className="user-list-div">
      {userlist}
      
      </div>
       
  </div>
  

    )
  }
}

export default ListProfile