import React ,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const [credential, setCredential] = useState({ name: "", email: "", password: "" });
    let history = useNavigate();

    const handelInput = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })

    }


    const handelSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password} = credential;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password})
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            history('/login');
            props.showAlert('SuccessFully Signup','success');

        }
        else {
            props.showAlert('Invalid','danger');
        }
    }

    return (
        <div className='container'>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credential.name} onChange={handelInput} id="name" name='name' />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" value={credential.email} onChange={handelInput} id="email" name='email' />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credential.password} onChange={handelInput} id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup
