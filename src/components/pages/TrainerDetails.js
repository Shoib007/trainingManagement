import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { YesNoPopUps } from '../PopupModels/YesNoPopUps';
import TrainerModel from '../PopupModels/TrainerModel';
export default function TrainerDetails() {

  //############################ State Variables form Popup Model ############################
  const [TrainerData, setTrainerData] = useState([])
  const [curKey, setCurKey] = useState()
  const [formData, setFormData] = useState({})

  //########################### Handelling Form Input Data ###################################
  const handelState = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const addTrainer = async () => {
    const trainerData = new FormData()
    trainerData.append('fname', formData.fName)
    trainerData.append('lname', formData.lname)
    trainerData.append('contact', formData.contact)
    trainerData.append('trainerLink', formData.trainerLink)
    trainerData.append('email', formData.email)
    trainerData.append('trainer_type', formData.trainer_type)
    trainerData.append('department', formData.department)

    await axios(
      {
        method: 'post',
        url: 'http://127.0.0.1:8000/trainerdata',
        data: trainerData
      }
    ).then((response) => {
      console.log(response.data)
      setTrainerData([...TrainerData,response.data])
    }
    ).catch((e) => {
      console.log(e.response)
    }

    )

  }

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/trainerdata').then((response) => {
      setTrainerData(response.data)
    }
    ).catch((e) => {
      console.log(e.response.data)
    }

    )
  }, [])

  return (
    <>
      <div className="container d-flext jutify-content-center my-5">
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Trainer</button>

        {/* Model Starts */}
        <YesNoPopUps path="trainerdata" id={curKey}/>
        <TrainerModel id={curKey}/>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Assign Training</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <form>
                  {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                  <div className="row mb-2">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1">First name</label>
                        <input type="text" id="form6Example1" className="form-control" name='fName' onChange={handelState} required />
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example2">Last name</label>
                        <input type="text" id="form6Example2" className="form-control" name='lname' onChange={handelState} required />
                      </div>
                    </div>
                  </div>

                  {/* <!-- Phone number --> */}
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form6Example3">Phone Number</label>
                    <input type="number" id="form6Example3" className="form-control" name='contact' onChange={handelState} required />
                  </div>

                  {/* <!-- Meeting Link --> */}
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form6Example4">Meeting Link</label>
                    <input type="url" id="form6Example4" className="form-control" name='trainerLink' onChange={handelState} required />
                  </div>

                  {/* <!-- Email input --> */}
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form6Example5">Email</label>
                    <input type="email" id="form6Example5" className="form-control" name='email' onChange={handelState} required />
                  </div>

                  <div className="row">

                    {/* Trainer Type */}
                    <div className="col">
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form6Example5">Select Trainer Type</label>
                        <select className="form-select" aria-label="Default select example" name='trainer_type' onChange={handelState} required>
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
                        <select className="form-select" aria-label="Default select example" name='department' onChange={handelState} required>
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
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={addTrainer}>Assign</button>
              </div>
            </div>
          </div>
        </div>

        {/* Models Ends */}

        <hr/>
      </div>

      <div className='d-flext jutify-content-center container mt-5'>

        {/* Showing Data */}

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">TrainerID</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Meeting Link</th>
              <th scope="col">E-Main</th>
              <th scope="col">Trainer Type</th>
              <th scope="col">Department</th>
              <th scope='col'>Delete</th>
              <th scope='col'>Modify</th>
            </tr>
          </thead>
          <tbody>
            {TrainerData.map((data) => (
              <tr key={data.id}>
                <th scope='row'>{data.id}</th>
                <td>{data.fname}</td>
                <td>{data.lname}</td>
                <td>{data.contact}</td>
                <td><a className='text-decoration-none' href={data.trainerLink}>{data.trainerLink}</a></td>
                <td>{data.email}</td>
                <td>{data.trainer_type}</td>
                <td>{data.department}</td>
                <td><button className='btn btn-danger' onClick={() => setCurKey(data.id)} data-bs-target="#exampleModalCenter" data-bs-toggle="modal">Delete</button></td>
                <td><button className='btn btn-warning' onClick={() => setCurKey(data.id)} data-bs-target="#trainerModel" data-bs-toggle="modal">Modify</button></td>

              </tr>
            )

            )}
          </tbody>
        </table>

      </div>
    </>
  )
}
