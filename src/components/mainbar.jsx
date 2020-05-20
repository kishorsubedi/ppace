import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

class Mainbar extends Component {

    constructor() {
        super();
    }

    state = {
        names : ['James', 'Paul', 'John', 'George', 'Ringo'],
        data: [],
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

    titleAndEventDateBox(){
        return(<TextField
            id="standard"
            label=""
            style={{ margin: 8 }}
            placeholder="Post Title"
            helperText=""
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
    />);
    }

    createPostBox(){
        var ifTrue = 
        <div>
            <div className="PostsDelete PostsCreate">
                            Create
            </div>
            <div className="Posts">
                <div className="CreatorNameClass"> By: {this.props.username} </div> 
                <div className="PostTitleClass">  
                    Title:
                        <div className="InputPostTitleEventDateClass">
                            {this.titleAndEventDateBox()}
                        </div>
                </div> 
                <div className="EventDateClass"> 
                    Event Date: 
                        <div className="InputPostTitleEventDateClass">
                                {this.titleAndEventDateBox()}
                        </div>
                </div>  
                <br></br>
                <div className="InputPostContentClass"> 
                    <TextField
                        id="standard-full-width"
                        label=""
                        style={{ margin: 8 }}
                        placeholder="Post Content"
                        helperText=""
                        fullWidth
                        multiline
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
            </div>
        </div>;

        var ifNotTrue = <div></div>;
        if(this.props.admin){
            return ifTrue;
        }
        return (ifNotTrue);
    }

    handlePostContentChange(){

    }

    allOtherPostsBox(){
        return(<div> 
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
        </div>)
    }

    render() { 
        console.log(this.props.admin);
        return (<React.Fragment>
            <div className="mainbar">
                {this.createPostBox()}
                {this.allOtherPostsBox()}              
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
