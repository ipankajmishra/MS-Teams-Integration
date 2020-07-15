import React, { Component } from 'react'
import { Steps,Button } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
const { Step } = Steps;
var currentTime = 0;
var startTime = 0;
var endTime = 0;
export class ActivityDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonType:"",
            current: -1,
            diff: 0,
            endTime:0,
            startTime:0
        };
    }

    componentDidMount() {
        var startingTime = new Date(this.props.myNewActivityDetails.startDate).toLocaleString();
        var endingTime = new Date(this.props.myNewActivityDetails.endDate).toLocaleString();
        this.setState({
            startTime : startingTime,
            endTime : endingTime
        })
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }

    tick(){
        var currentTime = new Date().getTime();
        startTime = new Date(this.props.myNewActivityDetails.startDate);
        endTime = new Date(this.props.myNewActivityDetails.endDate);
        if(currentTime > endTime.getTime()){
            this.setState({
                diff : 0,
                current: 3
            })
        }else if(currentTime >= startTime.getTime()){
            var msDiff = Math.floor((endTime.getTime()-currentTime) / (1000 * 60 * 60 * 24));
            this.setState({
                diff : msDiff,
                current: 1
            })
        }else{
            var msDiffe = Math.floor((endTime.getTime()-startTime.getTime()) / (1000 * 60 * 60 * 24));
            this.setState({
                diff : msDiffe,
                current : -1
            })
        }
    }

    render() {
        return (
            <div className="collapse-details">
            <div>
            <div class="header-custom-name">
                        <a href={this.props.myNewActivityDetails.url}>{this.props.myNewActivityDetails.name}</a>
                      {this.props.myNewActivityDetails.category!=="assessment" && <div header-info>
                      {this.props.myNewActivityDetails.progress.length !== 0 && this.props.myNewActivityDetails.progress[0].completionPercentage===100 ? <div><CheckCircleOutlined className="site-result-demo-error-icon tick-icon" /><span className="text-status">Completed</span></div> : <div><CloseCircleOutlined className="site-result-demo-error-icon cross-icon" /><span className="text-status">Incomplete</span></div>}

                          </div>}  
                          {this.props.myNewActivityDetails.category==="assessment" && <div header-info>
                      {this.props.myNewActivityDetails.progress.length !== 0 && (this.props.myNewActivityDetails.progress[0].score!==null && this.props.myNewActivityDetails.progress[0].score!=='') ? <div><CheckCircleOutlined className="site-result-demo-error-icon tick-icon" /><span className="text-status">Completed</span></div> : <div><CloseCircleOutlined className="site-result-demo-error-icon cross-icon" /><span className="text-status">Incomplete</span></div>}

                          </div>} 
      
                   
                    </div>
            </div>
                <Steps className="step-custom-hori" progressDot size = "small" current={this.state.current}>
                <Step style={{paddingLeft:"10px"}} title="Start Date" description={startTime.toLocaleString()} />
                    <Step title={this.state.current === -1 ? "Estimated Time" : "Time Remaining"} description={`${this.state.diff} days`} />
                    <Step style={{paddingRight:"10px"}}title="End Date" description={endTime.toLocaleString()} />
                </Steps>

                <Steps className="step-custom-ver" direction="vertical" progressDot size = "small" current={this.state.current}>
                <Step title="Start Date" description={startTime.toLocaleString()} />
                    <Step title={this.state.current === -1 ? "Estimated Time" : "Time Remaining"} description={`${this.state.diff} days`} />
                    <Step style={{paddingRight:"10px"}}title="End Date" description={endTime.toLocaleString()} />
                </Steps>
                <br></br>
                <div class="d-flex justify-content-center" >
                <div class="card text-center custom-card-activity">
                    {/* <div class="card-header">
                        <a href={this.props.myNewActivityDetails.url}>{this.props.myNewActivityDetails.name}</a>
                    </div> */}
                    <div class="card-body justify-content-center custom-card-body">
                        <h5 class="card-title">{this.props.myNewActivityDetails.category.toUpperCase()}</h5>
                        <p class="card-text">{this.props.myNewActivityDetails.assessmentInstructions}</p>
                        {/* <button type="button" class="btn btn-primary">Mark as Complete</button> */}
                        {/* {this.props.myNewActivityDetails.progress.length !== 0 && this.props.myNewActivityDetails.category!=="assessment" && <Button type={this.props.myNewActivityDetails.progress[0].completionPercentage === 100 ? "primary" : "dashed"} >{this.props.myNewActivityDetails.progress[0].completionPercentage === 100 ? "Completed":"Mark as complete"}</Button>}
                        {this.props.myNewActivityDetails.progress.length !== 0 && this.props.myNewActivityDetails.category==="assessment" && <Button className="complete-status-btn" type={(this.props.myNewActivityDetails.progress[0].score !==null && this.props.myNewActivityDetails.progress[0].score!=='') ? "primary" : "dashed"} >{(this.props.myNewActivityDetails.progress[0].score !== null && this.props.myNewActivityDetails.progress[0].score!=='') ? "Completed":"Mark as complete"}</Button>} */}
                        
                    </div>
                    {/* <div class="card-footer text-muted">
                        {this.props.myNewActivityDetails.progress.length !== 0 && this.props.myNewActivityDetails.progress[0].completionPercentage === 100 ? `${this.props.myNewActivityDetails.progress[0].completionPercentage} % Complete` : "Not Completed"}
                    </div> */}
                </div>
                </div>
            </div>
        )
    }
}

export default ActivityDetails
