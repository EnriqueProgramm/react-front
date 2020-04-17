import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuthenticated, signout} from "../auth"


const isActive = (history, path) => {
    if(history.location.pathname === path) return {color : "#ff9900"}
    else return {color: "#ffffff"}
};


const Menu = ({history})=> (
    <div>
        <ul className="nav nav-tabs bg bg-primary">
            <li className="nav-item">
                <Link className="nav-link active" style={isActive(history, "/")} to ="/">Home</Link>
            </li>  

            <li className="nav-item">
                <Link className="nav-link active" style={isActive(history, "/users")} to ="/users">Users</Link>
            </li> 


            <li className="nav-item">
                <Link to={`/post/create`} style={isActive(history, `/post/create`)} className="nav-link"> Create Post </Link>
            </li>         
            
           { !isAuthenticated() && (
               <>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/signin")} to ="/signin">Signin</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/signup")} to ="/signup">Signup</Link>   
            </li>
            </>)}  
            
            {isAuthenticated() && (
                <>

                <li className="nav-item">
                        <Link
                            to={`/findpeople`}
                            style={isActive(history, `/findpeople`)}
                            className="nav-link"
                        >
                            Find People
                        </Link>
                </li>
                  
                <li className="nav-item">
                    <span                 
                    className="nav-link" 
                    style={
                        (isActive(history, "/Signup"),  {cursor: "pointer", color: "#fff"})
                        }
                    onClick={() => signout(() => history.push('/'))}
                    >
                    Sign out
                    </span>   
                </li>

                <li className="nav-item">
                    
                        <Link                         
                        to={`/user/${isAuthenticated().user._id}`} 
                        style ={
                            (isActive(
                            history,
                             `/user/${isAuthenticated().user._id}`
                             ))
                             } 
                             className="nav-link"                  >
                            {`${isAuthenticated().user.name}'s profile`}
                            {console.log(`/user/${isAuthenticated().user._id}`)}
                        </Link>                   
                </li>
                </>
                )}

            {/* {JSON.stringify(props.history)} */}
        </ul>
    </div>

)


export default withRouter(Menu);

