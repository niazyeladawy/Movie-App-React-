import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';

export default function Register(props) {
    

    

    let [user, setUser] = useState({first_name:"",last_name:"",email:"",password:"",age:""});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorList, setErrorList] = useState([]);


    function getUser(e){
        let myUser = {...user};
        myUser[e.target.name] = e.target.value;
        setUser(myUser)
    }

    async function formSubmit(e){
        e.preventDefault();
        setLoading( true);
        let validationResponse = validateRegisterationForm();


        if (validationResponse.error){
            setLoading( false);
            setErrorList(validationResponse.error.details);
        }
        else{
            
            let {data} = await axios.post(`https://route-egypt-api.herokuapp.com/signup` , user);
            
    
            if(data.errors){
                setError(data.message);
                setLoading( false);
    
            }
            else{
                setLoading( false);
                props.history.push("/login");
            }
        }
        
    } 

    function validateRegisterationForm(){
        let schema = Joi.object(
            {
                first_name : Joi.string().min(3).max(15).required(),
                last_name : Joi.string().min(3).max(15).required(),
                age: Joi.number().min(16).max(80).required(),
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
                password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            }
        );

        return schema.validate(user , {abortEarly:false});
    }

    return (
        <div>
            <div className="py-4">
                <h1 className="mb-4">Register Now</h1>
                <form onSubmit={formSubmit}>
                    {error && <div className="alert alert-danger"> {error} </div> } 

                    {errorList.map((errors,idx) =><div key={idx} className="alert alert-danger p-2" > {errors.message} </div>  ) }

                    <label htmlFor="first_name" className="mb-2">First Name</label>
                    <input  onChange={getUser} className="form-control mb-3" type="text" name="first_name" ></input>
                    
                    <label htmlFor="last_name" className="mb-2">Last Name</label>
                    <input  onChange={getUser} className="form-control mb-3" type="text" name="last_name" ></input>

                    <label htmlFor="email" className="mb-2">Email</label>
                    <input  onChange={getUser} className="form-control mb-3" type="email" name="email" ></input>

                    <label htmlFor="password" className="mb-2">Password</label>
                    <input  onChange={getUser} className="form-control mb-3" type="password" name="password" ></input>

                    <label htmlFor="age" className="mb-2">Age</label>
                    <input  onChange={getUser} className="form-control mb-3" type="number" name="age" ></input>

                    <button type="submit" className="btn btn-info mt-3 text-white">{loading ? <i className="fas fa-spinner  fa-spin"></i> : "Register"}</button>
                </form>
            </div>
        </div>
    )
}
