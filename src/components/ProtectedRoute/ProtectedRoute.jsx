import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function ProtectedRoute(props) {

    
    if (localStorage.getItem('userToken')) {
        
        if(props.contex){
            return (
                <props.contex>
                    <Route path={props.path}> <props.component /> </Route>
                </props.contex>
            
            )
        }
        
    }
    else {
        return (<Redirect to='/login' />)

    }
}
