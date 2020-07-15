import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MDBCard, MDBRow, MDBCol } from 'mdbreact'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import "./usermgmt.css";
import Badge from 'react-bootstrap/Badge'
import { FaUserCircle } from 'react-icons/fa';
// import InfiniteScroll from 'react-infinite-scroller';
export class UserRow extends Component {
    static propTypes = {

    }

    render() {
        return (
            <Tr className="tablecustom text-center">
                 <Td>
                    <div className="TdText">
                   {this.props.user.imageUrl.length===null && <FaUserCircle style={{height:"20px"}} />}
                   {this.props.user.imageUrl.length!==null && <img src={this.props.user.imageUrl}/>}
                    </div>
                </Td>
                
                <Td>
                    <div className="TdText">
                    {this.props.user.userId}
                    </div>
                </Td>
                <Td>
                    <div className="TdText">
                    {this.props.user.firstName}
                    </div>
                </Td>
                <Td>
                    <div className="TdText">
                   {this.props.user.lastName}
                    </div>
                </Td>
                <Td>
                    <div className="TdText">
                    {this.props.user.email}
                    </div>
                </Td>
                
                
                <Td>
                    <div className="TdText">
                    {this.props.user.activeStatus && <Badge variant="success">Active</Badge>}
                    {!this.props.user.activeStatus &&  <Badge variant="danger">Inactive</Badge>}
                    </div>
                </Td>
                
                
                {/* <Td><MDBCard className="cardCustom">Tablescon</MDBCard></Td> */}
               
            </Tr>
            
        )
    }
}

export default UserRow
