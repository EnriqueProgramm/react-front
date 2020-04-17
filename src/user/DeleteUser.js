import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { remove } from './apiUser'
import { signout } from "../auth"



export class DeleteUser extends Component {

    state = {
        redirect:false
    };

    deleteAccount = () => {
        const token = isAuthenticated().token;
        const userId = this.props.user;
        remove(userId, token)
        .then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                signout(() => console.log("User is deleted"));
                
                this.setState({ redirect: true})
            }
        })
    };

    deleteConfirmed = () => {
        let answer = window.confirm("are you sure you want to delete your account");
        if(answer){
            this.deleteAccount();
        }
    };
    render(){
        if(this.state.redirect){
            return <Redirect to ="/" />
        }
        return (
            <div onClick = {this.deleteConfirmed} className ="btn btn-raised btn-danger">
                Delete Profile
            </div>
        );
    }
}


export default DeleteUser
