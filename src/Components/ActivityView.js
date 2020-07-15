import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ViewProfile.css'
import { MDBRow, MDBCol } from 'mdbreact'
import { Icon, Step, Button } from 'semantic-ui-react'

import ActivityList from './ActivityList';
import ActivityDetailCard from './ActivityDetailCard'

import axios from 'axios';

export class ActivityView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            learningActive: false,
            webinarActive: false,
            contestActive: false,
            currentActivity: [],
            myActivities: [],
            userList: [],
            bgColor: [],
            fgColor: [],
            myActivityDetail: [],
            show: false,
            themeList: [
                {
                    "theme": "Lunch&Learn",
                    "user": [55, 56],
                    "image": "https://oyster.ignimgs.com/wordpress/stg.ign.com/2020/03/sale_25313_primary_image_wide.jpg?fit=bounds&width=640&height=480"
                },
                {
                    "theme": "Training",
                    "user": [55, 56, 57, 58, 59],
                    "image": "https://global.kyocera.com/ecology/images/top/mv_01.jpg"
                },
                {
                    "theme": "CSR",
                    "user": [1, 2, 3, 4, 5, 20],
                    "image": "https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/content/wi/art/5a0965f54a5b3.jpg"
                },
                {
                    "theme": "Lunch&Learn",
                    "user": [55, 56],
                    "image": "https://www.vskills.in/certification/tutorial/wp-content/uploads/2018/05/what-is-learning-2.png"
                },
                {
                    "theme": "Training",
                    "user": [55, 56, 57, 58, 59],
                    "image": "https://blog-assets.hootsuite.com/wp-content/uploads/2019/07/employee-advocacy-social-media.png"
                },
                {
                    "theme": "CSR",
                    "user": [1, 2, 3, 4, 5, 20],
                    "image": "https://blog-assets.hootsuite.com/wp-content/uploads/2019/02/best-social-media-apps-1.png"
                },
                {
                    "theme": "Lunch&Learn",
                    "user": [55, 56],
                    "image": "https://wiki.optimy.com/wp-content/uploads/2017/07/Corporate-Social-Responsibility-CSR.jpg"
                },
                {
                    "theme": "Training",
                    "user": [55, 56, 57, 58, 59],
                    "image": "https://www.worldclassinstitute.net/uploads/8/2/4/7/82479408/7600379_orig.png"
                },
                {
                    "theme": "CSR",
                    "user": [1, 2, 3, 4, 5, 20],
                    "image": "https://oyster.ignimgs.com/wordpress/stg.ign.com/2020/03/sale_25313_primary_image_wide.jpg?fit=bounds&width=640&height=480"
                },
                {
                    "theme": "Social",
                    "user": [56, 57, 70, 80],
                    "image": "https://cdn.pixabay.com/photo/2015/01/22/15/12/businessman-607831_960_720.png"
                },
                {
                    "theme": "Lunch&Learn",
                    "user": [55, 56],
                    "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                },
                {
                    "theme": "CSR",
                    "user": [1, 2, 3, 4, 5, 20],
                    "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                },
                {
                    "theme": "Social",
                    "user": [56, 57, 70, 80],
                    "image": "https://cdn.pixabay.com/photo/2015/01/22/15/12/businessman-607831_960_720.png"
                },
                {
                    "theme": "Lunch&Learn",
                    "user": [55, 56],
                    "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                },
                {
                    "theme": "Training",
                    "user": [55, 56, 57, 58, 59],
                    "image": "https://via.placeholder.com/150"
                },
                {
                    "theme": "CSR",
                    "user": [1, 2, 3, 4, 5, 20],
                    "image": "https://via.placeholder.com/150"
                },
                {
                    "theme": "Social",
                    "user": [56, 57, 70, 80],
                    "image": "https://via.placeholder.com/150"
                },
                {
                    "theme": "CSR",
                    "user": [1, 2, 3, 4, 5, 20],
                    "image": "https://via.placeholder.com/150"
                },
                {
                    "theme": "Social",
                    "user": [56, 57, 70, 80],
                    "image": "https://via.placeholder.com/150"
                }

            ]
        }
    }

    componentDidMount() {
        this.getUserList();
    }

    handleGetMyActivities = (activities) => {
        this.setState({
            myActivities: activities.data
        })
    }


    handleGetMyActivityDetails = (activities) => {
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

    getUserList = () => {
        axios.get(`http://localhost:6769/api/v1/user/UserAccess/allUsers`).then(res => {
            this.setState({
                userList: res.data,
            });
        })
    }

    handleSetActivity = (activity) => {
        this.setState({
            currentActivity: activity,
            show: true,
        }, () => { console.log("current activity is set", this.state.currentActivity) });
    }

    themecomponent = (user, classname, index) => {
        return (

            <div>
                <div className="theme-img-div" style={{ display: "inline-flex" }}>
                    <img className="theme-img" style={{ height: "60px", width: "170px" }} src={user.image}></img>
                    <a onClick={() => { this.addActiveState(classname, user.userId, index) }}>
                        {/* {user.theme}  */}
                    </a> </div>
                {/* <Divider /> */}
            </div>

        )
    }

    render() {
        const theme = this.state.themeList.map((user, key) => {
            return this.themecomponent(user, "q" + key + " item", key);
        })

        var hashMap = [];
        this.state.userList.map((user, key) => {
            var name = '';
            if (user.firstName !== null)
                name += user.firstName;
            if (user.lastName !== null)
                name += ' ' + user.lastName;
            hashMap[user.userId] = name;
        })

        return (
            <div>
                <div className="main-div">
                    <MDBRow className="mdRow">
                        <MDBCol className="myThemesList" size="2">
                            {theme}
                        </MDBCol>
                        <MDBCol className="col-two-1" size="2">
                            {<ActivityList handleSetActivity={this.handleSetActivity} myActivitiesList={this.handleGetMyActivities} />}
                        </MDBCol>
                        <MDBCol className="col-two-1" size="5">
                            {this.state.show == true &&
                                <ActivityDetailCard hashMap={hashMap} userList={this.state.userList} currentActivity={this.state.currentActivity} />
                            }
                        </MDBCol>
                    </MDBRow>
                </div>
            </div>
        )
    }
}

export default ActivityView;
