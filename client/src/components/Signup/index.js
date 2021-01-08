import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'

const Signup = () => {

   const [name, setName] = useState();
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   const [userData, setUserData] = useState({});
   const history = useHistory();

   const submit = async (e)=>{
       e.preventDefault();

           const signupUser = {name, email, password};
           const signupRes = axios.post(
               'http://localhost:5000/signup',{
                   name: name,
                   email: email,
                   password: password
               }
           ).then((res)=>{
               setUserData({
                   user: res.data.user,
               })
               console.log(res);
               history.push('/signin');    
           },(err)=>{
               console.log(err);
           })

   }

    return (
        <div>
            <h2>
           SignUp 
           </h2>
           <form>
               <label for="name">Enter your name: </label>
               <input type="name" id="name" name="name" onChange={(e)=>setName(e.target.value)} required />

               <br></br><label for="email">Enter your email: </label>
               <input type="email" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} required />
               
               <br></br><label for="password">Enter your password: </label>
               <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} required />

               <br></br><button type="submit" onClick={submit}> Submit </button>
           </form>
        </div>
    )
}

export default Signup