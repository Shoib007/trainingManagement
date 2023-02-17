import React, { useMemo, useState } from 'react'
import axios from 'axios'

let BASE_URL = 'http://localhost:8000'
export default function TrainerModel(prop) {

    const [Trainer, setTrainer] = useState({
        fname: '', lname: '', contact: '', trainerLink: '', email: '', trainer_type: '', department: ''
    })

    const handelState = (e) => {
        setTrainer({
            ...Trainer, [e.target.name]: e.target.value
        })
    }


    const handleSubmit = () => {
        const Data = new FormData()
        Data.append('fname', Trainer.fname)
        Data.append('lname', Trainer.lname)
        Data.append('contace', Trainer.contact)
        Data.append('trainerLink', Trainer.trainerLink)
        Data.append('trainer_type', Trainer.trainer_type)
        Data.append('department', Trainer.department)
        axios.put(`${BASE_URL}/trainerdata/${prop.id}`, Data)
            .catch((e) => console.log(e.response))
    }


    useMemo(() => {
        axios.get(BASE_URL + '/trainerdata/' + prop.id)
            .then((res) => {
                setTrainer(res.data);
            }).then((e) => console.log(e))
    }, [prop.id])

    return (
        <div>

            <div className="modal fade" id="trainerModel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Training</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form>
                                {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                                <div className="row mb-2">
                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example1">First name</label>
                                            <input type="text" id="form6Example1" value={Trainer.fname} className="form-control" name='fname' onChange={handelState} required />
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Last name</label>
                                            <input type="text" id="form6Example2" value={Trainer.lname} className="form-control" name='lname' onChange={handelState} required />
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Phone number --> */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form6Example3">Phone Number</label>
                                    <input type="number" id="form6Example3" value={Trainer.contact} className="form-control" name='contact' onChange={handelState} required />
                                </div>

                                {/* <!-- Meeting Link --> */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form6Example4">Meeting Link</label>
                                    <input type="url" id="form6Example4" value={Trainer.trainerLink} className="form-control" name='trainerLink' onChange={handelState} required />
                                </div>

                                {/* <!-- Email input --> */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form6Example5">Email</label>
                                    <input type="email" id="form6Example5" value={Trainer.email} className="form-control" name='email' onChange={handelState} required />
                                </div>

                                <div className="row">

                                    {/* Trainer Type */}
                                    <div className="col">
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form6Example5">Select Trainer Type</label>
                                            <select className="form-select" aria-label="Default select example" value={Trainer.trainer_type} name='trainer_type' onChange={handelState} required>
                                                <option value='none' hidden>Trainer Type</option>
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Robotics">Robotics</option>
                                                <option value="Both">Both</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Department */}
                                    <div className="col">
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form6Example5">Department</label>
                                            <select className="form-select" aria-label="Default select example" value={Trainer.department} name='department' onChange={handelState} required>
                                                <option value='none' hidden>Select Department</option>
                                                <option value="Computer Science">Business to Business (B2B) </option>
                                                <option value="Robotics">Business to Costomer (B2C) </option>
                                                <option value="Both">Both</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </form>

                        </div>

                        <div className="modal-footer">
                            <button type="submit" className="btn btn-warning" onClick={handleSubmit} data-bs-dismiss="modal">Update</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
