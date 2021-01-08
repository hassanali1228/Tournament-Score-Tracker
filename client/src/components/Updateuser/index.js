import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'

const Updateuser = () => {

   const [name, setName] = useState();
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   const [id, setId] = useState();
   const [userData, setUserData] = useState({});
   const history = useHistory();

   const submit = async (e)=>{
       e.preventDefault();

           const updateUser = {name, email, password, id};
           const updateRes = axios.put(
               'http://localhost:5000/updateuser',{
                   name: name,
                   email: email,
                   password: password,
                   id: localStorage.getItem('id')
               },{
                   headers: {
                    'auth-token': localStorage.getItem('auth-token')
                   }
               }
           ).then((res)=>{
               setUserData({
                   user: res.data.user,
               })
               history.push('/');
           },(err)=>{
               console.log(err);
           })

   }

    return (
        <div>
            <h2>
           Update Information 
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

export default Updateuser