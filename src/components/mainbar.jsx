import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class Mainbar extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        postTitle: '',
        eventDate: '',
        postContent: '',
        data: []
    }

    componentDidMount() {
        fetch(`https://ppace.azurewebsites.net/posts`)
          .then(res => res.json())
          .then(json => this.setState({ data: json }));
    }

    clear = () =>{
        // return the state to initial
        this.setState({
            postTitle: '',
            eventDate: '',
            postContent: ''
        })
      }

    titleBox(){
        return(<TextField
            value={this.state.postTitle}
            onChange={(e)=>{this.setState({postTitle: e.target.value})}}
            id="standard"
            label=""
            style={{ margin: 8 }}
            placeholder="Post Title"
            helperText=""
            required
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
    />);
    }

    EventDateBox(){
        return(<TextField
            value={this.state.eventDate}
            onChange={(e)=>{this.setState({eventDate: e.target.value})}}
            id="standard"
            label=""
            style={{ margin: 8 }}
            placeholder="Event Date"
            helperText=""
            required
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
    />);
    }

    addPost(){
        console.log("Adding post to div");
        if(!this.state.postTitle || !this.state.postContent || !this.state.eventDate){
            return;
        }
        var newPost = {"PostTitle": this.state.postTitle, "EventDate": this.state.eventDate, "PostContent": this.state.postContent};
        this.state.data.splice(0,0,newPost);

        this.setState({
            postTitle: '',
            eventDate: '',
            postContent: ''
        })
    }

    createPostBox(){
        var ifTrue = 
        <form>
            <div>
                <div className="PostsDelete PostsCreate">
                                <input type="button" onClick={() => this.addPost()} value="Create" className="PostsCreate"/> 
                </div>
                <div className="Posts">
                    <div className="CreatorNameClass"> By: {this.props.username} </div> 
                    <div className="PostTitleClass">  
                        Title:
                            <div className="InputPostTitleEventDateClass">
                                {this.titleBox()}
                            </div>
                    </div> 
                    <div className="PostTitleClass EventDateClass"> 
                        Event Date: 
                            <div className="InputPostTitleEventDateClass">
                                    {this.EventDateBox()}
                            </div>
                    </div>  
                    <br></br>
                    <div className="InputPostContentClass"> 
                        <TextField
                            value={this.state.postContent}
                            onChange={(e)=>{this.setState({postContent: e.target.value})}}
                            id="standard-full-width"
                            label=""
                            style={{ margin: 8 }}
                            placeholder="Post Content"
                            helperText=""
                            fullWidth
                            multiline
                            margin="normal"
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
            </div>
        </form>;

        var ifNotTrue = <div></div>;
        if(this.props.admin){
            return ifTrue;
        }
        return (ifNotTrue);
    }

    allOtherPostsBox(){
        var ctr = 0;
        return(<div> 
            {this.state.data.map(el => (
                    <div key={ctr++}>
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
                {this.createPostBox()}            // create post box
                {this.allOtherPostsBox()}         // posts already in db    
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
