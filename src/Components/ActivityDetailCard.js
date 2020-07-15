import React, { Component } from 'react'
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
// import { Button } from 'semantic-ui-react';
import { List } from 'semantic-ui-react'
import { Avatar } from 'antd';
import { MDBRow, MDBCol } from 'mdbreact';
import { Divider, Accordion, Image, Segment } from 'semantic-ui-react'
import { Button } from 'antd';
export class ActivityDetailCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myActivities: [],
            arr: []
        };
        // this.hello();
    }
    
    render() {
        // const myactivities = this.state.currentActivity.map((activities, key) => {
        //     return this.activitiescomponent(activities, key);
        // })
        let currentActivity = this.props.currentActivity;

        console.log("user list as props", this.props.hashMap);
        return (
            <List divided relaxed className="custom-list">
                <Accordion>
                    <Accordion.Title>
                        <div style={{}} className="activity-class">
                            <MDBRow>
                                <MDBCol size="1">
                                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf', marginTop: "12px", marginLeft: "" }}>{currentActivity.name !== undefined && currentActivity.name.substring(0, 1)}</Avatar>
                                </MDBCol>
                                <MDBCol size="11">
                                    <List.Item active style={{ marginLeft: "10px", marginRight: "", marginTop: "10px" }}>
                                        <List.Content className="abcd">
                                            <List.Header className="activity-name-second-pane" as='a' >
                                                <span >{currentActivity.name}</span>
                                            </List.Header>

                                            <p style={{ marginTop: "10px" }}>{currentActivity.description}  </p>
                                        </List.Content>
                                    </List.Item>

                                </MDBCol>
                            </MDBRow>
                            <Divider style={{ marginLeft: "" }}></Divider>
                        </div>
                    </Accordion.Title>
                        <div className="user-list-activity">
                        {
                            currentActivity.assigned.map((userId) => {
                                return (
                                    <div style={{marginTop:'10px'}}>
                                        <List.Item active>
                                            <List.Content className="abcd">
                                                <MDBRow>
                                                    <MDBCol size="2">
                                                        <Avatar style={{ color: '#f56a00', padding:'0px', backgroundColor: '#fde3cf',marginBottom:'2px', marginLeft: "20px" }}>{this.props.hashMap[userId] !== undefined && this.props.hashMap[userId].substring(0, 1)}</Avatar>
                                                    </MDBCol>
                                                    <MDBCol size="4" style={{padding:'0px', paddingTop:'5px'}}>
                                                        <span>{this.props.hashMap[userId]}</span>
                                                    </MDBCol>
                                                </MDBRow>                                              
                                                
                                            </List.Content>
                                        </List.Item>
                                    </div>
                                )
                            })
                        }
                        </div>                
                    </Accordion>


            </List>
        )
    }
}


export default ActivityDetailCard;