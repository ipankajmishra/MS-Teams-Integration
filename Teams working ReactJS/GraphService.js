import moment from '../node_modules/moment'

var graph = require('@microsoft/microsoft-graph-client');

function getAuthenticatedClient(accessToken) {
  
  const client = graph.Client.init({
    
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  return client;
}

export async function getUserDetails(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  const user = await client.api('/me').get();
  console.log(user);
  return user;
}

export async function getEvents(accessToken) {
    const client = getAuthenticatedClient(accessToken);
  
    const events = await client
      .api('/me/events/?$top=10')
      .select('subject,organizer,start,end')
      .orderby('createdDateTime DESC')
      .get();
  console.log(events.value.length)
  let array = [];
  for(let i=0;i<events.value.length;i++)
  {
    events.value[i]["title"]=events.value[i].subject;
    events.value[i]["start"]=moment(events.value[i].start.dateTime + "Z").toDate();
    events.value[i]["end"]=moment(events.value[i].end.dateTime + "Z").toDate();
    console.log(events.value[i]);
    array.push(events.value[i])
  }
    // return events;
    return array;
  }


  
  export async function createEvent(accessToken){
    
    
    const client = getAuthenticatedClient(accessToken);
    
    const event = {
      subject: "Discussion on MS teams integration",
      body: {
        contentType: "HTML",
        content: "Discussion on ms teams integration."
      },
      start: {
          dateTime: "2020-05-03T16:00:00",
          timeZone: "India Standard Time"
      },
      end: {
          dateTime: "2020-05-03T16:30:00",
          timeZone: "India Standard Time"
      },
      attendees: [
        // {
        //   emailAddress: {
        //     address: "abhay.chandramouli@publicissapient1.com",
        //     name: "Abhay C"
        //   },
        //   type: "Required"
        // },
        // {
        //   emailAddress: {
        //     address: "rohit.gopalakrishnan@publicissapient1.com",
        //     name: "Rohit Gopala"
        //   },
        //   type: "Required"
        // },
        // {
        //   emailAddress: {
        //     address: "ananya.prakash@publicissapient1.com",
        //     name: "Ananya P"
        //   },
        //   type: "Required"
        // }
      ],
      isOnlineMeeting: true,
       onlineMeetingProvider: "teamsForBusiness",
      location: {
        displayName: "MS Teams",
        locationType: "Default"
      }
    };
    
    let res = await client.api('/me/events')
      .post(event);
    console.log(res);
    // return res;
  }