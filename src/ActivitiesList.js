import React, { Component } from 'react'
import { UserOutlined,LinkOutlined  } from '@ant-design/icons';
import axios from 'axios';
// import { Button } from 'semantic-ui-react';
import { List } from 'semantic-ui-react'
import { Avatar,Checkbox  } from 'antd';
import { MDBRow, MDBCol } from 'mdbreact';
import { Divider,Accordion, Image, Segment } from 'semantic-ui-react'
import { Button } from 'antd';

import ActivityDetails from './ActivityDetails';
export class ActivitiesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myActivities: [],
            arr:[],
            completeStatus:"Mark as complete"
        };
        // this.hello();
    }
    addActiveState = (index,activities) =>{
        if(index!==this.state.lastindex){let arr = this.state.arr;
        arr[index]=true;
        arr[this.state.lastindex]=false;
        this.setState({
          lastindex:index,
          arr:arr
        },()=>this.handleGetAssignedActivityDetails(activities))}
    else{
        let arr = this.state.arr;
        arr[index]=false;
          this.setState({
              lastindex:-1,
              arr:arr
          })
      
    }
        
        // $(classname).removeClass(classname);
   
       
      }

      

    componentWillReceiveProps(props) {
        this.setState({
            myActivities: props.myNewActivities,
        })
    }

    handleGetAssignedActivityDetails = (activities) => {
        this.props.myActivityDetails(activities)
    }


    onChange=(e)=> {
        console.log(`checked = ${e.target.checked}`);
        this.setState({
            completeStatus:"Completed"
        })
      }


    activitiescomponent = (activities,index) => {
        return (
            <Accordion>
            <Accordion.Title>
            <div  style={{}} className={`${this.state.arr[index]?"activity-class":''}`}>
                <MDBRow>
                    <MDBCol size="1">
                        <Avatar onClick={()=>{this.addActiveState(index,activities)}} style={{ color: '#f56a00', backgroundColor: '#fde3cf',marginTop:"12px",marginLeft:"" }}>{activities.name.substr(0, 1)}</Avatar>
                    </MDBCol>
                    <MDBCol size="11">
                        <List.Item active style={{marginLeft:"10px",marginRight:"",marginTop:"10px"}}>
                            {/* <List.Icon name='github' size='large' verticalAlign='middle' /> */}
                            <List.Content className="abcd">
                                <List.Header  className="activity-name-second-pane" as='a' ><span onClick={()=>{this.addActiveState(index,activities)}}>{activities.name}</span>
                                {/* <Button.Group className="btn-group disabled">
                            <Button  className={`btn-inside ${activities.category=="learning"?"custom-bg-btn":'disabled'}`}>L</Button>
                            <Button.Or className="btn-inside" />
                            <Button className={`btn-inside ${activities.category==="webinar"?"custom-bg-btn":'disabled'}`}>W</Button>
                            <Button.Or className="btn-inside" />
                            <Button className={`btn-inside ${activities.category==="assessment"?"custom-bg-btn":'disabled'}`}>A</Button>
                        </Button.Group> */}
                        <div className="btn-group">
                        {activities.progress.length > 0 && (activities.status === "completed" || activities.score !== '') && <Button size="small" type="primary">
                            Completed
                            </Button>}
                            {(activities.progress.length!==0 && (activities.progress[0].status!=="completed")) || activities.progress.length === 0 && 
                            <Button size="small" type="dashed">
                            Mark as complete
                            </Button>
                            // <Checkbox onChange={(e)=>this.onChange(e)}>{this.state.completeStatus}</Checkbox>
                            }
                            <LinkOutlined style={{marginLeft:"20px",paddingTop:"5px"}}/>
                        </div>
                       
                        </List.Header>
                                {/* <br></br><br></br><List.Description as='a'>{activities.description}</List.Description> */}
                                <p onClick={()=>{this.addActiveState(index,activities)}} style={{marginTop:"10px"}}>{activities.description} <br></br>On May 25, 2018, a new privacy law called the General Data Protection Regulation (GDPR) takes effect in the European Union (EU). </p>
                                {/* <p>sahfhvsghvfsavgvgsvgfvsagvfgvsgvfgvgsvfgsvgfvsgvfgsvfgvsgfvsgfgs fgvsgvfgsvgfvsgvfgsvgvfgsvg</p> */}
                            </List.Content>
                        </List.Item>
                        
                    </MDBCol>
                </MDBRow>
                <Divider style={{marginLeft:""}}></Divider>
            </div>
            </Accordion.Title>
            <Accordion.Content className="accord-content" active={this.state.arr[index]===true}>
            {activities.length !== 0 && <ActivityDetails  myNewActivityDetails={activities}/>} 
            <Divider style={{marginLeft:""}}></Divider>
            </Accordion.Content>
              
            </Accordion>

        )
    }

    render() {
        const myactivities = this.state.myActivities.map((activities,key) => {
            return this.activitiescomponent(activities,key);
        })
        return (
            <List divided relaxed className="custom-list">
                {myactivities}
            </List>
        )
    }
}


export default ActivitiesList;