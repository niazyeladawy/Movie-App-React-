import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useState } from 'react';

export default function Login(props) {
 
   
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorList, setErrorList] = useState([]);

    let [user, setUser] = useState({email:'',password:''});

    function getUser(e){
        let myUser = {...user};
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
    }

    async function formSubmit(e){
        e.preventDefault();
        setLoading( true);
        let validationResponse = validateRegisterationForm();


        if (validationResponse.error){
            
            setErrorList(validationResponse.error.details);
            setLoading( false);
        }
        else{
            
            let {data} = await axios.post(`https://route-egypt-api.herokuapp.com/signin` , user);
            
            
            if(data.message === "success"){

                localStorage.setItem("userToken",data.token);
                props.getUserInfo();
                props.history.push("/home");
                setLoading( false);
            }
            else{
                setLoading( false);
                setError(data.message);
            }
    
        }
        
    } 

    function validateRegisterationForm(){
        let schema = Joi.object(
            {
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
                password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            }
        );

        return schema.validate(user , {abortEarly:false});
    }

    useEffect(() => {
        
        return () => {
            
        }
    }, [])

    return (
        <div>
            <div className="py-4">
                <h1 className="mb-4">Login</h1>
                <form onSubmit={formSubmit}>
                    {error && <div className="alert alert-danger"> {error} </div> } 

                    {errorList.map((errors,idx) => idx === 1? <div key={idx} className="alert alert-danger p-2"> wrong password</div> : 
                    <div key={idx} className="alert alert-danger p-2"> {errors.message} </div> ) }

                    <label htmlFor="email" className="mb-2">Email</label>
                    <input  onChange={getUser} className="form-control mb-3" type="email" name="email" ></input>

                    <label htmlFor="password" className="mb-2">Password</label>
                    <input  onChange={getUser} className="form-control mb-3" type="password" name="password" ></input>

                    <button type="submit" className="btn btn-info mt-3 text-white">{loading ? <i className="fas fa-spinner  fa-spin"></i> : "Login"}</button>
                </form>
            </div>
        </div>
    )
}
