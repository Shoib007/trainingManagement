import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { BASE_URL } from '../BaseUrl'
import axios from 'axios'


export default function TrainingModel(prop) {
    const [schoolApi, setSchoolApi] = useState([])
    const [trainers, setTrainers] = useState([])
    const [trainingData, setTrainingData] = useState({ trainerName: '', schoolName: '', subject: '', startTime: '', endTime: '', TrainingDate: '', state: '' })

    const handelTrainingData = (e) => {
        setTrainingData({
            ...trainingData, [e.target.name]: [e.target.value]
        })
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/schooldata`)
            .then((response) => {
                setSchoolApi(response.data)
            }).catch((e) => {
                console.log(e.response.data)
            })

        axios.get(`${BASE_URL}/trainerdata`)
            .then((response) => {
                setTrainers(response.data)
            }).catch(e => {
                console.log(e.response.statusText)
            })
        axios.get(`${BASE_URL}/trainingUpdate/${prop.id}`)
            .then((res) => {
                setTrainingData(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err.statusText))
    }, [prop.id])

    return (
        <div>
            <div className="modal fade" id="updateTraining" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-bg-danger">
                            <h5 className="modal-title" id="exampleModalLabel">Update Training</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>

                                {/* Iterating Over Trainers for Dropdown Menu */}

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form6Example5">Select Trainer</label>
                                    <select className="form-select" aria-label="Default select example" value={trainingData.trainerName} name='trainerName' onChange={handelTrainingData} required>
                                        <option value='none' hidden>Choose Trainer</option>
                                        {
                                            trainers.map((trainer) => {
                                                return <option value={parseInt(trainer.user)} key={trainer.user}>{trainer.fname}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                {/* Iterating over all schools for Dropdown Menu */}

                                <div className="form-outline mb-4">
                                    <label className="selectpicker" htmlFor="form6Example5">Select School</label>
                                    <select className="form-select" data-live-search="true" value={trainingData.schoolName} name='schoolName' onChange={handelTrainingData} required>
                                        <option value='none' hidden>Choose School</option>
                                        {
                                            schoolApi.map((data) => {
                                                return <option value={parseInt(data.id)} key={data.id}>{data.school}</option>
                                            })
                                        }

                                    </select>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="selectpicker" htmlFor="form6Example5">Select Subject</label>
                                    <select className="form-select" data-live-search="true" value={trainingData.subject} name='subject' onChange={handelTrainingData}>
                                        <option value='none' hidden>Choose Subject</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Robotics">Robotics</option>
                                        <option value="Aeromodelling">Aeromodelling</option>

                                    </select>
                                </div>

                                {/* Date */}

                                <div className="mb-4 d-flex align-items-center">
                                    <input type="date" className='form-control' onChange={handelTrainingData} name="TrainingDate" value={trainingData.TrainingDate} />
                                </div>

                                <div className="form-outline mb-4">
                                    <div className="row">
                                        <div className="col-6">
                                            <label className="form-label" htmlFor="form6Example5">Start At</label>
                                            <input className='form-control' name='startTime' value={trainingData.startTime} onChange={handelTrainingData} type="time" />
                                        </div>

                                        <div className="col-6">
                                            <label className="form-label" htmlFor="form6Example5">End At</label>
                                            <input className='form-control' name='endTime' value={trainingData.endTime} onChange={handelTrainingData} type="time" />
                                        </div>
                                    </div>

                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Assign</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
