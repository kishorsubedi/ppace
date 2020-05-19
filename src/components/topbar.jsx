import React, { Component } from 'react';
import ppace from '../assets/ppace.png';
import Login from './login';

class Topbar extends Component {
    state = { 
        announcement: "Announcement:   Covid 19 warning: Please stay indoors, and submit this form!"
     }

    styles = {fontSize: 20, fontWeight: 'bold', color: 'white', display:'block'};

    postsStyles = {fontSize: 10};

    render() { 
        return (<React.Fragment> 

                <div className="topBarContainer">
                    <div className="imgFlex"> 
                        <img className="image" src={ ppace } style={{height:"110px",width:"200px",marginTop:"30px",marginLeft:"30px"}}/>
                    </div>

                    <div className="announcementFlex">
                        <p style={this.styles}> PPACE Announcements </p>
                    </div>

                    <div className="loginFlex">
                        <div className="loginBox">
                            <Login handleChange={this.props.handleChange} setAdminState={this.props.setAdminState} username={this.props.username} password={this.props.password}/>
                        </div>
                    </div>
                </div> 

        </React.Fragment> );
    }

}
 
export default Topbar;