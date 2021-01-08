 import React from 'react'
 import axios from 'axios'
 import {useState} from 'react'
 import {useHistory} from 'react-router-dom'
 
 const Signin = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userData, setUserData] = useState({});
    const history = useHistory();

    const submit = async (e)=>{
        e.preventDefault();

            const loginUser = {email, password};
            const loginRes = axios.post(
                'http://localhost:5000/signin',{
                    mail: email,
                    pass: password
                }
            ).then((res)=>{
                setUserData({
                    token: res.data.token,
                    user: res.data.user,
                })
                console.log(res);
                localStorage.setItem('auth-token', res.data.token);
                localStorage.setItem('id', res.data.admin.id);
                history.push('/');    
            },(err)=>{
                console.log(err);
            })

    }

     return (
         <div>
             <h2>
            SignIn 
            </h2>
            <form>
                <label for="email">Enter your email: </label>
                <input type="email" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} required />
                
                <br></br><label for="password">Enter your password: </label>
                <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} required />

                <br></br><button type="submit" onClick={submit}> Submit </button>
            </form>
         </div>
     )
 }
 
 export default Signin
    