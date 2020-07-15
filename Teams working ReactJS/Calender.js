import React,{Component} from 'react';
import { Table, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from '../node_modules/moment'
// import './style.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { config } from './Config';
import { getEvents } from './GraphService';

import './App.css';
const localizer = momentLocalizer(moment);







class CalendarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      eventsForCalender:[]
    };
   
  }

  async componentDidMount() {
    try {
      
      var accessToken = this.props.getAccessToken;
      
      var events = await getEvents(accessToken);
      
      this.setState({events: events});
      console.log(events);
      
    }
    catch(err) {
      this.props.setError('ERROR', JSON.stringify(err));
    }
  }

  handleSelectEvent=(event)=> {
    window.alert(JSON.stringify(event))
    
  }

  getRandomColor=()=> {
   var color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  return color;
  }

  eventStyleGetter =() =>{
    
    var backgroundColor = this.getRandomColor();
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '8px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
}
  
  render() {
    
    return (
      <div style={{width:"80vw",marginLeft:"10vw"}}>
        <Button className="btn-create-meeting" style={{marginTop:"80px"}}>+ Create Meeting</Button><br></br><br></br>
        <div style={{ height: '400pt',marginTop:"80px"}}>

        <Calendar
        selectable
          events={this.state.events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={new Date()}
          localizer={localizer}
          onSelectEvent={(event) =>this.handleSelectEvent(event)}
          eventPropGetter={(this.eventStyleGetter)}
        />
      {/* <pre style={{marginTop:"80px"}}><code>{JSON.stringify(this.state.events, null, 2)}</code></pre> */}

      </div>
      </div>
     
    );
  }
}

export default CalendarComponent;