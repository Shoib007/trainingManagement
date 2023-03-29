import axios from 'axios'
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BASE_URL } from '../BaseUrl';
import { MdAssignment, MdPendingActions } from 'react-icons/md';
import { AiOutlineFileDone } from 'react-icons/ai';
import TrainingModel from '../PopupModels/TrainingModel';

export default function Dashboard() {
  const [trainers, setTrainers] = useState([])
  const [trainigData, setTrainingData] = useState([])
  const [TraininFormData, setTrainingFormData] = useState({ trainer: "", schoolName: "", sTime: "", eTime: "", TrainingDate: "", subject: "" })

  const handelTrainingData = (e) => {
    setTrainingFormData({
      ...TraininFormData, [e.target.name]: e.target.value
    });
    console.log(TraininFormData);
  }


  const [schoolApi, setSchoolApi] = useState([])
  const [filter, setFilter] = useState({ selectedDate: new Date().toISOString().slice(0, 10), endingDate: '', state: '', name: '' })
  const [trainingID, setTrainingID] = useState()


  const handelChange = (e) => {
    setFilter({
      ...filter, [e.target.name]: e.target.value
    })
    console.log(filter)
  }

  // get the date reference
  const curDate = useRef()

  //######################################## Filter based on Date ################################

  const filterData = useMemo(() => {
    return trainigData.filter(training => (
      ((!filter.selectedDate || training.TrainingDate >= filter.selectedDate) &&
      (!filter.endingDate || training.TrainingDate <= filter.endingDate) &&
      (!filter.state || training.state === filter.state) &&
      (!filter.name || training.trainerName === filter.name)) || 
      (!filter.state || filter.state === 'pending'? training.state === 'pending':undefined)
    ));
  }, [filter.selectedDate, filter.endingDate, filter.state, filter.name, trainigData]);

  const resetFilter = () => {
    setFilter({ selectedDate: new Date().toISOString().slice(0, 10), endingDate: '', state: '', name: '' })
  }


  /* ###################################### Fetching Data from API ############################## */

  useEffect(() => {
    curDate.current.valueAsDate = new Date(); // To set the default date to current date

    axios.get(`${BASE_URL}/training`)
      .then((response) => {
        setTrainingData(response.data)
        console.log(response.data)
        localStorage.setItem("pending", response.data.filter(obj => obj.state === 'pending').length);
        localStorage.setItem("completed", response.data.filter(obj => obj.state === 'completed').length);
      }).catch(e => {
        console.log(e.response.status)
      })

    axios.get(`${BASE_URL}/schooldata`)
      .then((response) => {
        setSchoolApi(response.data)
      }).catch((e) => {
        console.log(e.response.data)
      })

    axios.get(`${BASE_URL}/trainerdata`)
      .then((response) => {
        setTrainers(response.data);
      }).catch(e => {
        console.log(e.response.statusText)
      })
  }, [])


  /* ###################### Saving Assigned training data and posting to server ############################## */

  const saveTraningData = async () => {
    let formData = new FormData()
    formData.append('trainerName', TraininFormData.trainer)
    formData.append('schoolName', TraininFormData.schoolName)
    formData.append('startTime', TraininFormData.sTime)
    formData.append('endTime', TraininFormData.eTime)
    formData.append('TrainingDate', TraininFormData.TrainingDate)
    formData.append('subject', TraininFormData.subject)

    await axios(
      {
        method: 'post',
        url: `${BASE_URL}/training`,
        data: formData
      }
    ).then((response) => {
      console.log(response.data);
    }).catch((e) => {
      console.log(e.response.data);
      console.log(formData);
    })

    await axios.get(`${BASE_URL}/training`)
      .then((response) => {
        setTrainingData(response.data)
        console.log(response.data)
        localStorage.setItem("pending", response.data.filter(obj => obj.state === 'pending').length);
        localStorage.setItem("completed", response.data.filter(obj => obj.state === 'completed').length);
      }).catch(e => {
        console.log(e.response.status)
      })
  }

  return (
    <>
      {/* ################# Top Cards ################# */}

      <div className='d-flext jutify-content-center container mt-2' id='cards'>
        <div className="container text-center">
          <div className="row">
            <div className="col-4">
              <div className="card">
                <div className="card-header text-bg-danger">
                  Total Training
                </div>
                <div className="card-body">
                  <h1 className='card-title'>{trainigData.length}</h1>
                  <MdAssignment size={30} />
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="card">
                <div className="card-header text-bg-warning">
                  Pending
                </div>
                <div className="card-body">
                  <h1 className='card-title'>{localStorage.getItem('pending')}</h1>
                  <MdPendingActions size={30} />
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="card">
                <div className="card-header text-bg-success">
                  Completed
                </div>
                <div className="card-body">
                  <h1 className='card-title'>{localStorage.getItem('completed')}</h1>
                  <AiOutlineFileDone size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ################## Top-Card Over #######################*/}

        <TrainingModel id={trainingID} />

        <div className="container d-flex justify-content-start">
          <div className="mx-2">

            {/* ############################## Popup Training Assign Menu ################################################*/}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Assign Training</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form>

                      {/* Iterating Over Trainers for Dropdown Menu */}

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form6Example5">Select Trainer</label>
                        <select className="form-select" aria-label="Default select example" name='trainer' onChange={handelTrainingData} required>
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
                        <select className="form-select" data-live-search="true" name='schoolName' onChange={handelTrainingData} required>
                          <option value='none' hidden>Choose School</option>
                          {
                            schoolApi.map((data) => {
                              return <option value={parseInt(data.id)} key={data.id}>{`${data.school} : (${data.subject})`}</option>
                            })
                          }

                        </select>
                      </div>


                      {/* Subject */}


                      <div className="form-outline mb-4">
                        <label className="selectpicker" htmlFor="form6Example5">Select School</label>
                        <select className="form-select" data-live-search="true" name='subject' onChange={handelTrainingData} required>
                          <option value='none' hidden>Select Subject</option>
                          <option value="Computer Science"> Computer Science</option>
                          <option value="Robotics"> Robotics</option>
                          <option value="Aeromodelling">Aeromodelling</option>
                        </select>
                      </div>

                      {/* Date */}

                      <div className="mb-4 d-flex align-items-center">
                        <input type="date" onChange={handelTrainingData} className='form-control' name="TrainingDate" />
                      </div>

                      <div className="form-outline mb-4">
                        <div className="row">
                          <div className="col-6">
                            <label className="form-label" htmlFor="form6Example5">Start At</label>
                            <input className='form-control' name='sTime' type="time" onChange={handelTrainingData} />
                          </div>

                          <div className="col-6">
                            <label className="form-label" htmlFor="form6Example5">End At</label>
                            <input className='form-control' name='eTime' type="time" onChange={handelTrainingData} />
                          </div>
                        </div>

                      </div>


                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={saveTraningData}>Assign</button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* ############################## Starting Date Filter ###################################### */}
          <div className='d-flex flex-wrap justify-content-around'>
            <button type="button" className='btn btn-primary mt-3' data-bs-toggle="modal" data-bs-target="#exampleModal" >Assign Training</button>
            <div className="mx-2 mt-3">
              <input type="date" ref={curDate} value={filter.selectedDate} name="selectedDate" onChange={handelChange} className='form-control' id="Date" />
            </div>

            {/* ############################## Ending Date Filter ###################################### */}

            <div className="mx-2 mt-3">
              <input type="date" value={filter.endingDate} name="endingDate" onChange={handelChange} className='form-control' id="Date" />
            </div>

            {/* ################################# Trainer Filter ################################ */}
            <div className="mx-2 mt-3">
              <select className="form-select" aria-label="Default select example" value={filter.name} name='name' onChange={handelChange} required>
                <option value='none' hidden>Choose Trainer</option>
                {
                  trainers.map((trainer) => {
                    return <option value={trainer.fname} key={trainer.user}>{trainer.fname}</option>
                  })
                }
              </select>
            </div>
            {/* ################################## State Filter ################################# */}
            <div className="mx-2 mt-3">
              <select className="form-select" aria-label="Default select example" name='state' value={filter.state} onChange={handelChange} required>
                <option value='none' hidden>Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* ################################# Reset Button ################################### */}
            <div className="mx-2 mt-3">
              <input type="button" value="Reset Filter" onClick={resetFilter} className='form-control' />
            </div>
          </div>

        </div >


        {/* Cards Section */}

        < div className='container d-flex justify-content-start align-items-center flex-wrap my-3'>
          {filterData.length > 0 ?
            filterData.map((tData) => {
              return (
                <div className={`card mx-3 mb-3 ${tData.state === 'completed' ? "bg-success" : "bg-warning"}`} key={tData.id} style={{ width: "18rem" }}>
                  <div className="card-body">
                    <div className='row'>
                      <h5 className="card-title mb-2">{tData.schoolName}</h5>
                    </div>
                    <h6 className="card-subtitle fw-bold mb-2">{tData.trainerName}</h6>
                    <p className='card-subtitle'>{tData.subject}</p>
                  </div>
                  <div className='card-body text-bg-dark'>
                    <div className='d-flex align-items-center'>
                      <div className='card-body'>
                        <h6 className='card-subtitle mb-2'>{tData.TrainingDate}</h6>
                        <p className="card-subtitle mb-2 mt-2">Starting : {tData.startTime}</p>
                        <p className="card-subtitle mb-2">Ending : {tData.endTime}</p>
                      </div>
                    </div>

                    <button className={`btn btn-danger w-100 ${tData.state === 'completed' ? 'disabled' : ""}`} onClick={() => setTrainingID(tData.id)} data-bs-toggle="modal" data-bs-target="#updateTraining">Modify</button>
                  </div>
                </div>
              )
            }) : <h1>No Data Found</h1>
          }

        </div >
      </div >
    </>
  )
}
