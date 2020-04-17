import React, {Component} from 'react';
import {signup} from "../auth";
import { Link } from 'react-router-dom';

class Signup extends Component {


    constructor(props){
        super(props)


        this.clickSubmit = this.clickSubmit.bind(this);
        //this.signup = this.signup.bind(this);
        this.signupForm = this.signupForm.bind(this);
        
        this.state = {
            name: "",
            email: "",
            password:"",
            error: "",
            open: false
        }
    }

    handleChange = name => event => {
        this.setState(
            {error:'',
            open : false
        });
        this.setState({ [name]: event.target.value});
    }


    clickSubmit = event => {
        event.preventDefault();
        const {name, email, password} = this.state;
        const user = {
            name,
            email,
            password
        };
        // console.log(user); 

        signup(user)
        .then(data => {
            if(data.error) this.setState({error:data.error})
            else this.setState({
                error: '',
                name:'',
                email:'',               
                password: '',
                open: true
                
            });
        });       
    };
  
    signupForm = (name, email, password) =>(
        <form>
        <div className ="form-group">
            <label className ="text-muted">Name</label>
            <input onChange ={this.handleChange('name')} value={name} type="text" className ="form-control"/>
        </div>

        <div className ="form-group">
            <label className ="text-muted">Email</label>
            <input onChange ={this.handleChange('email')} value={email} type="email" className ="form-control"/>
        </div>

        <div className ="form-group">
            <label className ="text-muted">Password</label>
            <input onChange ={this.handleChange('password')} value={password} type="password" className ="form-control"/>
            </div>
            <div>
            <button  onClick = {this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
        </div>
    </form>
    )


    render(){
        const {name, email, password, error, open} = this.state;
        return (
            <div className ="container">
                <h2 className ="mt-5 mb-5">Signup page</h2>

                <div className ="alert alert-danger"
                     style ={{display: error ? "" : "none"}}>
                    {error}
                </div>


                <div className ="alert alert-primary"
                     style ={{display: open ? "" : "none"}}>
                    New accout was sucssesfully created, please <Link to="/signin">Sign In!</Link>
                </div>

                {this.signupForm(name, email, password)}


               
            </div>


        );
    }
}

export default Signup;