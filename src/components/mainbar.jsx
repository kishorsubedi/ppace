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
        deletePostIds: [],
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
            id="titleStandard"
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
            id="eventdateStandard"
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
        if(!this.state.postTitle || !this.state.postContent || !this.state.eventDate){
            return false;
        }
        var newPost = {"PostTitle": this.state.postTitle, "EventDate": this.state.eventDate, "PostContent": this.state.postContent, "CreatorName": this.props.username};
        console.log(this.props.username);
        this.addPostFrontend(newPost);
        this.addPostBackend(newPost);
    }

    addPostFrontend(newPost){
        // console.log("Adding post to div");
        
        this.state.data.push(newPost); //adding newlycreatedPost in state.data

        //clearing textfield
        this.setState({
            postTitle: '',
            eventDate: '',
            postContent: ''
        });
    }

    generateRandomHash() {
        var length = 15;
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    addPostBackend(newPost){
        newPost["PostId"]  = this.generateRandomHash();
        // console.log(JSON.stringify(newPost));

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        };
        fetch(`https://ppace.azurewebsites.net/posts`, requestOptions)
            .then(async response => {
                const data = await response;
            })
            .catch(error => {
                // this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });

    }

    createPostBox(){
        var ifTrue = 
        <form>
            <div>
                <div className="PostsDelete PostsCreate">
                                <input type="button" onClick={() => this.addPost()} value="Create" className="PostsCreate"/> 
                </div>
                <div className="Posts">
                    <div className="PostTopbar">
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

    deletePostBackend(PostId){
        var postId = {PostId: PostId};
        //remove from backend
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postId)
        };
        fetch(`https://ppace.azurewebsites.net/posts`, requestOptions)
            .then(async response => {
                const data = await response;
            })
            .catch(error => {
                // this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    deletePostFrontend(PostId){
        // console.log("this.state.data");
        this.setState({ 
            deletePostIds: this.state.deletePostIds.concat([PostId])
          })
        console.log(this.state.deletePostIds);
    }

    deletePost(PostId){
        // console.log("deleting", PostId);
        this.deletePostFrontend(PostId);
        this.deletePostBackend(PostId);
    }

    deletePostBox(el){
        if(this.props.admin){
            return(<div className="PostsDelete"><input type="button" onClick={() => this.deletePost(el.PostId)} value="Delete" className="PostsDelete"/> </div>);
        }
        return (<div></div>);
    }

    PostBox(el){
        if(!this.state.deletePostIds.includes(el.PostId)){
            return (
                <div>
                    {this.deletePostBox(el)}
                    <div className="Posts">
                        <div className="PostTopbar">
                        <div className="CreatorNameClass"> By: {el.CreatorName} </div> 
                        <div className="PostTitleClass">  Title: {el.PostTitle} </div> 
                        <div className="EventDateClass"> Event Date: {el.EventDate}</div>  
                        </div>     
                        <br></br>
                        <div className="PostContentClass"> {el.PostContent} </div>
                    </div> 
                </div>
            );
        }
        return (<div></div>);
    }

    allOtherPostsBox(){
        var dataCopy = this.state.data.slice().reverse();
        // this.state.data.reverse();
        var ctr = 0;
        return(<div> 
            {dataCopy.map(el => (
                    <div key={ctr++}>
                        {this.PostBox(el)}
                    </div>
                           
                ))}  
        </div>)
    }

    render() { 
        return (<React.Fragment>
            <div className="mainbar">
                {this.createPostBox()}            
                {this.allOtherPostsBox()}         
            </div>
        </React.Fragment> );
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
