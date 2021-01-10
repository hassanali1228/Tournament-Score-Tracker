import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'

const MatchCreate = () => {

   const [team1_id, setTeam1_id] = useState();
   const [team2_id, setTeam2_id] = useState();
   const [score1, setScore1] = useState();
   const [score2, setScore2] = useState();
   const [fouls1, setFouls1] = useState();
   const [fouls2, setFouls2] = useState();
   const [matchData, setMatchData] = useState({});
   const history = useHistory();

   const submit = async (e)=>{
       e.preventDefault();

           const createMatch = {team1_id, team2_id, score1, score2, fouls1, fouls2, matchData};
           const createRes = axios.post(
               'http://localhost:5000/matches',{
                   team1_id: team1_id,
                   team2_id: team2_id,
                   score1: 0,
                   score2: 0,
                   fouls1: 0,
                   fouls2: 0
               }
           ).then((res)=>{
                setMatchData({
                   matchData: res.data.match,
               })
               history.push('/');
           },(err)=>{
               console.log(err);
           })
   }

    return (
        <div>
            <h2>
           Create Match 
           </h2>
           <form>
               <label for="first team">Select first team: </label>
               <input type="team" id="first team" name="first team" onChange={(e)=>setTeam1_id(e.target.value)} required />

               <br></br><label for="second team">Select second team: </label>
               <input type="second team" id="second team" name="second team" onChange={(e)=>setTeam2_id(e.target.value)} required />

               <br></br><button type="submit" onClick={submit}> Submit </button>
           </form>
        </div>
    )
}

export default MatchCreate