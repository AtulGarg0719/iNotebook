import React ,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {

    const [credential,setCredential] = useState({email:"",password:""});
    let history = useNavigate();

    const handelInput = (e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})

    }


    const handelSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credential.email,password:credential.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken);
            history('/');
            props.showAlert('Logged in ','success');

        }
        else{
            props.showAlert('Invalid','danger');

        }
    }
    return (
        <div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credential.email} onChange={handelInput} id="email" name='email' />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credential.password} onChange={handelInput} id="password" name="password" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
