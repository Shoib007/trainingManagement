import React, { useState } from 'react'
import { TrainerData } from '../DemoTrainerData';
import axios from 'axios';

export default function TrainerDetails() {

  //State variables
  const [fName, setFname] = useState()
  const [lname, setLname] = useState()
  const [pNumber, setPnumber] = useState()
  const [mLink, setMlink] = useState()
  const [email, setEmail] = useState()
  const [trainerType, setTrainerType] = useState()
  const [departmen, setDepartment] = useState()

  const addTrainer = async () => {
    const trainerData = new FormData()
    trainerData.append('fname', fName)
    trainerData.append('lname', lname)
    trainerData.append('contact', pNumber)
    trainerData.append('trainerLink', mLink)
    trainerData.append('email', email)
    trainerData.append('trainer_type', trainerType)
    trainerData.append('department', departmen)
    console.log(`
    Fname : ${fName}
    Lname : ${lname}
    contact:${pNumber}
    Meeting ID : ${mLink}
    TrainerType : ${trainerType}
    Department : ${departmen}
    `)

    await axios(
      {
        method: 'post',
        url: 'http://127.0.0.1:8000/trainerdata',
        data: trainerData
      }
    ).then( (response) => {
      console.log(response.data)
    }
    ).catch( (e) => {
      console.log(e.response.data)
    }

    )

  }


  return (
    <>
      <div className="container d-flext jutify-content-center my-5">
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Trainer</button>

        {/* Model Starts */}

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
                        <input type="text" id="form6Example1" className="form-control" name='fname' onChange={ (e) => setFname(e.target.value) } required />
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example2">Last name</label>
                        <input type="text" id="form6Example2" className="form-control" name='lname' onChange={ (e) => setLname(e.target.value)} required />
                      </div>
                    </div>
                  </div>

                  {/* <!-- Phone number --> */}
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form6Example3">Phone Number</label>
                    <input type="number" id="form6Example3" className="form-control" name='PhoneNumber' onChange={(e) => setPnumber(e.target.value)} required />
                  </div>

                  {/* <!-- Meeting Link --> */}
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form6Example4">Meeting Link</label>
                    <input type="url" id="form6Example4" className="form-control" name='mLink' onChange={(e) => setMlink(e.target.value)} required />
                  </div>

                  {/* <!-- Email input --> */}
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form6Example5">Email</label>
                    <input type="email" id="form6Example5" className="form-control" name='email' onChange={(e) => setEmail(e.target.value)} required />
                  </div>

                  <div className="row">

                    {/* Trainer Type */}
                    <div className="col">
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form6Example5">Select Trainer Type</label>
                        <select className="form-select" aria-label="Default select example" name='trainerType' onChange={e => setTrainerType(e.target.value)} required>
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
                        <select className="form-select" aria-label="Default select example" name='department' onChange={e => setDepartment(e.target.value)} required>
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

        <hr style={{ zIndex: '-2' }} />
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
            </tr>
          </thead>
          <tbody>
            {TrainerData.map((data) => (
              <tr>
                <th scope='row'>{data.TrainerID}</th>
                <td>{data.FirstName}</td>
                <td>{data.LastName}</td>
                <td>{data.PhoneNumber}</td>
                <td><a className='text-decoration-none' href={data.MeetingLink}>{data.MeetingLink}</a></td>
                <td>{data.Email}</td>
                <td>{data.TrainerType}</td>
                <td>{data.Department}</td>

              </tr>
            )

            )}
          </tbody>
        </table>

      </div>
    </>
  )
}
