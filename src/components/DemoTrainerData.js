import axios from "axios"
import { useEffect, useState } from "react"
export function TrainerData() {
    const [TrainerData, setTrainerData] = useState([])
    useEffect( () =>{
        axios.get('http://localhost:8000/trainerdata')
        .then((res) => {
            setTrainerData(res.data)
        })
    },[])
    return TrainerData
}