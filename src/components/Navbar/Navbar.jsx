import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../images/logo.webp'

export default function Navbar(props) {
    return (
        <div>
            <nav className="d-flex justify-content-between p-3 align-items-center">
                <ul className="list-unstyled d-flex">
                    <li className="px-2"><NavLink to='/home'><img src={logo} alt="logo " className=" logo"></img></NavLink></li>
                    {props.loginUser? 

                        <>
                            <li className="px-2"><NavLink to='/home' activeClassName="active">Home</NavLink></li>
                            <li className="px-2"><NavLink to='/movies'>Movies</NavLink></li>
                            <li className="px-2"><NavLink to='/people'>People</NavLink></li>
                            <li className="px-2"><NavLink to='/tv'>Tv</NavLink></li>
                        </>:""
                    }
                    
                </ul>

                <ul className="list-unstyled d-flex">
                    <li className="px-2"><a href="https://www.facebook.com/"><i className="fab fa-facebook-f "></i></a></li>
                    <li className="px-2"><a href="https://github.com/niazyeladawy" target="blank"><i className="fab fa-github "></i></a></li>
                    <li className="px-2"><a href="https://www.facebook.com/"><i className="fab fa-twitter "></i></a></li>
                    
                    {
                        props.loginUser?<li className="px-2 logout" onClick={props.logOut}>Logout</li>:<>
                        <li className="px-2"><NavLink to='/register'>Register</NavLink></li>
                    <li className="px-2"><NavLink to='/login'>Login</NavLink></li>
                        </>
                    }
                    
                </ul>
            </nav>
        </div>
    )
}
