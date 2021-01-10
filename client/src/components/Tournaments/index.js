import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'

const TournamentCreate = () => {

   const [name, setName] = useState();
   const [location, setLocation] = useState();
   const [creator, setCreator] = useState();
   const [admin_id, setAdmin_id] = useState();
   const [tournamentData, setTournamentData] = useState({});
   const history = useHistory();

   const submit = async (e)=>{
       e.preventDefault();

           const createTournament = {name, location, creator, admin_id};
           const createRes = axios.post(
               'http://localhost:5000/tournaments',{
                   name: name,
                   location: location,
                   creator: creator,
                   admin_id: localStorage.getItem('id')
               }
           ).then((res)=>{
                setTournamentData({
                   tournamentData: res.data.tournament,
               })
               console.log(res.data.id);
               localStorage.setItem('tournament-id', res.data.id);
               history.push('/');
           },(err)=>{
               console.log(err);
           })
   }

    return (
        <div>
            <h2>
           Create Tournament 
           </h2>
           <form>
               <label for="name">Enter tournament name: </label>
               <input type="name" id="name" name="name" onChange={(e)=>setName(e.target.value)} required />

               <br></br><label for="location">Enter tournament location: </label>
               <input type="location" id="location" name="location" onChange={(e)=>setLocation(e.target.value)} required />

               <br></br><label for="creator">Enter tournament host: </label>
               <input type="creator" id="creator" name="creator" onChange={(e)=>setCreator(e.target.value)} required />

               <br></br><button type="submit" onClick={submit}> Submit </button>
           </form>
        </div>
    )
}

export default TournamentCreate