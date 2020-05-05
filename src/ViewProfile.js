import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ViewProfile.css'
import { MDBRow, MDBCol } from 'mdbreact'
export class ViewProfile extends Component {

    render() {
        return (
            <div>
                <div className="topComponent">
                    <div className="profilePicture">

                    </div>
                    <div className="bodyViewProfile">
                        <MDBRow className="mdRow">
                            <MDBCol className="col-One" size="3">

                            </MDBCol>
                            <MDBCol className="col-two" size="6">
                                
                            </MDBCol>
                            <MDBCol className="col-three" size="3">
                                
                            </MDBCol>
                        </MDBRow>
                        
                </div>

                </div>
                
                
            </div>
        )
    }
}

export default ViewProfile
