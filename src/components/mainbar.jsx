import React, { Component } from 'react';

class Mainbar extends Component {

    constructor() {
        super();
        //this.state = { data: [] };
    }

    state = {
        names : ['James', 'Paul', 'John', 'George', 'Ringo'],
        data: []
    }

    componentDidMount() {
        fetch(`https://ppace.azurewebsites.net/posts`)
          .then(res => res.json())
          .then(json => this.setState({ data: json }));
    }

    listofPeople(){
        return(<div>
                    {this.state.names.map(name => (
                        <li>
                        {name}
                        </li>
                    ))}
                </div>
            );
    }
    render() { 
        return (<React.Fragment>
            <div className="mainbar">
                {this.state.data.map(el => (
                    <div>
                        <div className="PostsDelete">
                            Delete
                        </div>
                        <div className="Posts">
                            <div className="CreatorNameClass"> By: {el.CreatorName} </div> 
                            <div className="PostTitleClass">  Title: {el.PostTitle} </div> 
                            <div className="EventDateClass"> Event Date: {el.EventDate}</div>  
                            <br></br>
                            <div className="PostContentClass"> {el.PostContent} </div>
                        </div> 
                        
                    </div>
                           
                ))}             
            </div>
        </React.Fragment> );
    }

    async getPosts(name) 
    {
        let response = await fetch("https://ppace.azurewebsites.net/posts");
        let data = await response.json()
        console.log(data);
    }


    // get() {
    //     console.log("Get() button clicked");
    //     //make backend request here
    //     const Http = new XMLHttpRequest();
    //     const url='https://ppace.azurewebsites.net/posts';
    //     Http.open("GET", url);
    //     Http.send();
    //     var response;
    //     Http.onreadystatechange = (e) => {
    //         if (Http.readyState === 4 && Http.status === 200)
    //         {
    //             if (Http.responseText)
    //             {
    //                     //put your code here 
    //                     response = Http.responseText
    //                     var obj = JSON.parse(response);
    //                     console.log(obj);
    //             }
    //         }         
    //     }
    // }
}
 
export default Mainbar;
