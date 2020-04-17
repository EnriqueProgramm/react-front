import React, {Component} from 'react';
import {isAuthenticated} from '../auth'
import {read, update, updateUser} from "./apiUser"
import { Redirect } from 'react-router-dom';
import avatar from "../Pictures/avatar.jpg"

class EditProfile extends Component {

    constructor(props){
        super(props)
        this.state = {
            id:'',
            name: '',
            email: '',
            password:'',
            redirectToProfile: false,
            error: '',
            fileSize: 0,
            loading: false,            
            about: ""
            
        }
    }




    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token)
        .then(data => {
            if(data.error) {
                this.setState({redirectToProfile: false});
            } else {
                this.setState({id: data._id, name: data.name, email: data.email, error: '', about: data.about});
            }
        }); 
    };

    componentDidMount(){
        this.userData = new FormData();
        const userId = this.props.match.params.userId; 
        this.init(userId);
    } 

    isValid = () => {
        const {name, email, password, fileSize} = this.state
        if(fileSize > 100000){
            this.setState({error: "File size should be less than 100 kb"});
            return false
        }
        if(name.length === 0){
            this.setState({error: "Name is required"})
            return false
        }
        // email@domain.com
        if(! /.+.+\..+/.test(email)){
            this.setState({error: "A valid Email is required"})
            return false
        }
        if(password.length >= 1 && password.length <=5) {
            this.setState({error: "Password must be at least 6 characters long"})
            return false;
        }

        return true;
        
    }
    





    handleChange = name => event => {
              this.setState({ error: ""});
              const value = name === 'photo' ? event.target.files[0] : event.target.value
              
              const fileSize = name === 'photo' ? event.target.files[0].size : 0;
              
              this.userData.set(name, value)
              this.setState({ [name]: value, error: '', loading: false, fileSize});

              const userId = this.props.match.params.userId;       
            const token = isAuthenticated().token;


              update(userId, token, this.userData)
              .then(data => {
                  if(data.error) this.setState({error:data.error})
                  else
                  updateUser(data, () =>{
                      this.setState({
                          redirectToProfile: false               
                       });
                  })               
                  
              });  


              
    }


    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading: true})
        
        if(this.isValid()){
            // const {name, email, password} = this.state;
            // const user = {
            //     name,
            //     email,
            //     password: password || undefined
            // };
            // console.log(user); 
            const userId = this.props.match.params.userId;       
            const token = isAuthenticated().token;
    
            update(userId, token, this.userData)
            .then(data => {
                if(data.error) this.setState({error:data.error})
                else
                updateUser(data, () =>{
                    this.setState({
                        redirectToProfile: true               
                     });
                })
                
                
            });  
        }      
       
    };

    

    signupForm = (name, email, password, about) =>(
        <form>

        <div className ="form-group">
            <label className ="text-muted">Profile Photo</label>
            <input onChange ={this.handleChange('photo')}
             accept= "image/*" 
             type="file" 
             className ="form-control"/>
        </div>

        <div className ="form-group">
            <label className ="text-muted">Name</label>
            <input onChange ={this.handleChange('name')} value={name} type="text" className ="form-control"/>
        </div>

        <div className ="form-group">
            <label className ="text-muted">Email</label>
            <input onChange ={this.handleChange('email')} value={email} type="email" className ="form-control"/>
        </div> 
        <div className ="form-group">
            <label className ="text-muted">Few words about me</label>
            <textarea onChange ={this.handleChange('about')} value={about} type="text" className ="form-control"/>
        </div>    
        <div className ="form-group">
            <label className ="text-muted">Password</label>
            <input onChange ={this.handleChange('password')} value={password} type="password" className ="form-control"/>
            </div>
            <div>
            <button  onClick = {this.clickSubmit} className="btn btn-raised btn-primary">Update</button>
        </div>   
    </form>
    )
    
    




    render(){

        const {id, name, email, password, redirectToProfile, error, loading, about} = this.state;

        if(redirectToProfile){
         
            return <Redirect to={ `/user/${id}`} />
        }

        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : avatar;   
           


        return (
            <div className = "container"> 
            <h2 className ="mt-5 mb-5">Edit Profile</h2>
            


            <div className ="alert alert-danger"
               style ={{display: error ? "" : "none"}}>
               {error}
             </div>  

             { loading & !(error) ? ( <div className ="jumbotron text-center"> 
                <h2>Loading...</h2> </div>): ""}

            <img style ={{height: "200px", width: "auto"}} 
            className = "img-thumbnail" 
            src={photoUrl} 
            onError = {i => i.target.src =`${avatar}`} 
            alt={name} />
          

            <div>{this.signupForm(name, email, password, about)}</div> 
            </div>

          
               
            

            
        );
    }

}

export default EditProfile;