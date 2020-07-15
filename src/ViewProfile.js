import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ViewProfile.css'
import { MDBRow, MDBCol } from 'mdbreact'
import { Icon, Step, Button } from 'semantic-ui-react'
import Particles from 'react-particles-js';
import UserList from './UserList';
import ListProfile from './ListProfile';
import ProfileList from './ProfileList'
import ActivitiesList from './ActivitiesList'
import ActivityDetails from './ActivityDetails'
import { Avatar  } from 'antd';
import { Divider } from 'semantic-ui-react'
import axios from 'axios';

export class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            learningActive: false,
            webinarActive: false,
            contestActive: false,
            myActivities: [],
            bgColor:[],
            fgColor:[],
            myActivityDetail:[],
            themeList:[],
            userData:[]
        
        //    themeList:[
                // {
                //     "theme":"Lunch&Learn",
                //     "user":[55,56],
                //     "image":"https://oyster.ignimgs.com/wordpress/stg.ign.com/2020/03/sale_25313_primary_image_wide.jpg?fit=bounds&width=640&height=480"
                // },
                // {
                //     "theme":"Training",
                //     "user":[55,56,57,58,59],
                //     "image":"https://global.kyocera.com/ecology/images/top/mv_01.jpg"
                // },
                // {
                //     "theme":"CSR",
                //     "user":[1,2,3,4,5,20],
                //     "image":"https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/content/wi/art/5a0965f54a5b3.jpg"
                // },
                // {
                //     "theme":"Lunch&Learn",
                //     "user":[55,56],
                //     "image":"https://www.vskills.in/certification/tutorial/wp-content/uploads/2018/05/what-is-learning-2.png"
                // },
                // {
                //     "theme":"Training",
                //     "user":[55,56,57,58,59],
                //     "image":"https://blog-assets.hootsuite.com/wp-content/uploads/2019/07/employee-advocacy-social-media.png"
                // },
                // {
                //     "theme":"CSR",
                //     "user":[1,2,3,4,5,20],
                //     "image":"https://blog-assets.hootsuite.com/wp-content/uploads/2019/02/best-social-media-apps-1.png"
                // },
                // {
                //     "theme":"Lunch&Learn",
                //     "user":[55,56],
                //     "image":"https://wiki.optimy.com/wp-content/uploads/2017/07/Corporate-Social-Responsibility-CSR.jpg"
                // },
                // {
                //     "theme":"Training",
                //     "user":[55,56,57,58,59],
                //     "image":"https://www.worldclassinstitute.net/uploads/8/2/4/7/82479408/7600379_orig.png"
                // },
                // {
                //     "theme":"CSR",
                //     "user":[1,2,3,4,5,20],
                //     "image":"https://oyster.ignimgs.com/wordpress/stg.ign.com/2020/03/sale_25313_primary_image_wide.jpg?fit=bounds&width=640&height=480"
                // },
                // {
                //     "theme":"Social",
                //     "user":[56,57,70,80],
                //     "image":"https://cdn.pixabay.com/photo/2015/01/22/15/12/businessman-607831_960_720.png"
                // },
                // {
                //     "theme":"Lunch&Learn",
                //     "user":[55,56],
                //     "image":"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                // },
                // {
                //     "theme":"CSR",
                //     "user":[1,2,3,4,5,20],
                //     "image":"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                // },
                // {
                //     "theme":"Social",
                //     "user":[56,57,70,80],
                //     "image":"https://cdn.pixabay.com/photo/2015/01/22/15/12/businessman-607831_960_720.png"
                // },
                // {
                //     "theme":"Lunch&Learn",
                //     "user":[55,56],
                //     "image":"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                // },
                // {
                //     "theme":"Training",
                //     "user":[55,56,57,58,59],
                //     "image":"https://via.placeholder.com/150"
                // },
                // {
                //     "theme":"CSR",
                //     "user":[1,2,3,4,5,20],
                //     "image":"https://via.placeholder.com/150"
                // },
                // {
                //     "theme":"Social",
                //     "user":[56,57,70,80],
                //     "image":"https://via.placeholder.com/150"
                // },
                // {
                //     "theme":"CSR",
                //     "user":[1,2,3,4,5,20],
                //     "image":"https://via.placeholder.com/150"
                // },
                // {
                //     "theme":"Social",
                //     "user":[56,57,70,80],
                //     "image":"https://via.placeholder.com/150"
                // }
                
           // ]
        
        }
    }


    componentDidMount(){
        axios.get(`http://localhost:8060/category`).then(res => {
          this.setState({
              themeList:res.data.data
          })
          })
    }

    handleGetMyActivities=(activities)=>{
        this.setState({
            myActivities: activities.data
        })
    }

    handleGetMyActivityDetails=(activities)=>{
        this.setState({
            myActivityDetail: activities
        })
    }

    handleClickLearning = (value) => {
        this.setState({
            learningActive: value,
            webinarActive: false,
            contestActive: false
        })
    }

    handleClickWebinar = (value) => {
        this.setState({
            webinarActive: value,
            contestActive: false,
            learningActive: false
        })
    }

    handleClickContest = (value) => {
        this.setState({
            contestActive: value,
            learningActive: false,
            webinarActive: false
        })
    }

    fetchUserDataByCategory = (name) => {
        axios.get(`http://localhost:8060/GetAllUserByActivityCategory/` + name).then(res => {
           this.setState({
               userData:res.data.data
           })
          })

    }

    themecomponent=(user,classname,index)=>{
        return(
        
        <div>
          <div className="theme-img-div" style={{display:"inline-flex"}}>
      <img  onClick={()=>this.fetchUserDataByCategory(user.name)} className="theme-img" style={{height:"60px",width:"170px"}} src={user.description}></img>
        {/* <a onClick={()=>{this.addActiveState(classname,user.userId,index)}}> */}
        {/* {user.theme}  */}
      {/* </a>  */}
      </div>
          {/* <Divider /> */}
        </div>
        
        )
    }

    render() {

       

        const theme = this.state.themeList.map((user,key) => {
            return this.themecomponent(user,"q"+key + " item",key);
          })

        return (
            <div>

                {/* <div className="topComponent"> */}

                    {/* <div>
                        <img className="profilePicture" alt="pic" src={require("./images/person.png")}></img>

                        <h1 className="userName">Abcd Xyz  <img className="activeIcon" alt="active-icon" src={require("./images/interface.png")} /></h1>
                        <Button className="d-flex justify-content-end messageButton">Message</Button>
                    </div> */}
                    <div className="main-div">
                    {/* bodyViewProfile */}

                        <MDBRow className="mdRow">
                            {/* <MDBCol className="col-One" size="3">
                                <Step.Group vertical className="custom-step">
                                    {this.state.learningActive && <Step active onClick={() => this.handleClickLearning(false)}>
                                        <Icon name='book' />
                                        <Step.Content>
                                            <Step.Title>Learning</Step.Title>
                                            <Step.Description>See Learning Activities</Step.Description>
                                        </Step.Content>
                                    </Step>}

                                    {!this.state.learningActive && <Step onClick={() => this.handleClickLearning(true)}>
                                        <Icon name='book' />
                                        <Step.Content>
                                            <Step.Title>Learning</Step.Title>
                                            <Step.Description>See Learning Activities</Step.Description>
                                        </Step.Content>
                                    </Step>}
                                    {this.state.webinarActive && <Step active onClick={() => this.handleClickWebinar(false)}>
                                        <Icon name='computer' />
                                        <Step.Content>
                                            <Step.Title>Webinars</Step.Title>
                                            <Step.Description>List of Webinars</Step.Description>
                                        </Step.Content>
                                    </Step>}


                                    {!this.state.webinarActive && <Step onClick={() => this.handleClickWebinar(true)}>
                                        <Icon name='computer' />
                                        <Step.Content>
                                            <Step.Title>Webinars</Step.Title>
                                            <Step.Description>List of Webinars</Step.Description>
                                        </Step.Content>
                                    </Step>}

                                    {this.state.contestActive && <Step active onClick={() => this.handleClickContest(false)}>
                                        <Icon name='file code outline' />
                                        <Step.Content>
                                            <Step.Title>Contests</Step.Title>
                                            <Step.Description>List of Contests</Step.Description>
                                        </Step.Content>
                                    </Step>}

                                    {!this.state.contestActive && <Step onClick={() => this.handleClickContest(true)}>
                                        <Icon name='file code outline' />
                                        <Step.Content>
                                            <Step.Title>Contests</Step.Title>
                                            <Step.Description>List of Contests</Step.Description>
                                        </Step.Content>
                                    </Step>}
                                </Step.Group>
                            </MDBCol> */}
                             <MDBCol className="myThemesList" size="2">
                                {/* {<ProfileList/>} */}
                                {theme}
                            </MDBCol>
                            <MDBCol className="col-two-1" size="2">
                                {/* {<ProfileList/>} */}
                                {<ListProfile userData={this.state.userData} myActivitiesList={this.handleGetMyActivities}/>}
                            </MDBCol>
                            
                            <MDBCol className="col-two-2 custom-activity-List hover-class" size="5">
                                
                                {<ActivitiesList myNewActivities={this.state.myActivities} myActivityDetails={this.handleGetMyActivityDetails}/>}
                            </MDBCol>
                            {/* <MDBCol className="col-three " size="5" >
                            {this.state.myActivityDetail.length !== 0 && <ActivityDetails  myNewActivityDetails={this.state.myActivityDetail}/>}   
                                                     </MDBCol> */}
                        </MDBRow>

                    </div>

                {/* </div> */}


            </div>
        )
    }
}

export default ViewProfile
