import React, { Component } from "react";
import PropTypes from "prop-types";
// import ListOfUser from "./ListOfUser";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./usermgmt.css";
import Card from "react-bootstrap/Card";
import { MDBCol,MDBRow } from "mdbreact";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import FormControl from 'react-bootstrap/FormControl';
import UserRow from "./UserRow";
// import InfiniteScroll from "react-infinite-scroller";
// import { MDBRow } from "mdbreact";
export class UserList extends Component {
  constructor(props){
    super(props);
    this.state = {
        users:[],
        batches: ['PSI 2020 Gurgaon', 'PSI 2020 Bangalore']
    }
}

componentWillReceiveProps(props){
  this.setState({
    users:props.users
  })
}

  render() {
    // const userList = this.props.users.map(user => {
    //   return <UserRow user={user}/>
  // })

    return (
      <div className="Table">
        {/* //  <div style={{textAlign:"center"}}> <h3>All Users</h3><br></br></div>
        //  <div style={{marginLeft:"200px"}} className="filters">
        //         <ButtonGroup className="mr-2" aria-label="Second group">
        //           <DropdownButton
        //             variant="batch"
        //             as={ButtonGroup} 
        //             title="Select Batch"
        //           >
        //             {this.state.batches.map((batch, i) => (
        //               <Dropdown.Item
        //                 key={i}
        //                 onClick={() => this.batchclick(batch)}
        //               >
        //                 {batch}
        //               </Dropdown.Item>
        //             ))}
        //           </DropdownButton>
        //         </ButtonGroup>
        //         <ButtonGroup className="mr-2" aria-label="Second group">
        //           <DropdownButton
        //             variant="category"
        //             as={ButtonGroup}
        //             title="Select Category"
        //             id="bg-nested-dropdown"
        //           >
        //             <Dropdown.Item>Product Engineering</Dropdown.Item>
        //             <Dropdown.Item>Quality Engineering</Dropdown.Item>
        //           </DropdownButton>
        //         </ButtonGroup>
        //       </div> */}
        <MDBRow>
          <MDBCol size="2"></MDBCol>
          <MDBCol size="8">
            <Card className="tablecard1">
              <Table className="tableContainer1">
                <Thead>
                  <Tr className="TableHeader text-center">
                    <Th>
                      <div className="TdText"></div>
                    </Th>
                    <Th>
                      <div className="TdText">User Id</div>
                    </Th>
                    <Th>
                      <div className="TdText">First Name</div>
                    </Th>
                    <Th>
                      <div className="TdText">Last Name</div>
                    </Th>

                    <Th>
                      <div className="TdText">Email</div>
                    </Th>
                    <Th>
                      <div className="TdText">Status</div>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                
                {/* {userList} */}
                
                  
                </Tbody>
              </Table>
            </Card>
          </MDBCol>
          
        </MDBRow>
      </div>
    );
  }
}

export default UserList;
