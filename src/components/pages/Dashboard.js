import axios from 'axios'
import React, { useEffect, useMemo, useRef, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../authFolder/AuthContext'
import { BASE_URL } from '../BaseUrl';
import { MdAssignment, MdPendingActions } from 'react-icons/md';
import { AiOutlineFileDone } from 'react-icons/ai';

export default function Dashboard() {
  const history = useHistory()
  const authenticated = useContext(AuthContext)

  // ############ Variables for Forms and Api Data #######################

  const [trainers, setTrainers] = useState([])
  const [trainigData, setTrainingData] = useState([])
  // const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)) // Default value as current date
  const [trainer, setTrainer] = useState()
  const [school, setSchool] = useState()
  const [sTime, setStime] = useState()
  const [eTime, setEtime] = useState()
  const [TraininDate, setTrainingDate] = useState()
  const [schoolApi, setSchoolApi] = useState([])
  const [filter, setFilter] = useState({ selectedDate: new Date().toISOString().slice(0, 10), endingDate: '', state: '', name: '' })


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
      (!filter.selectedDate || training.TrainingDate >= filter.selectedDate) &&
      (!filter.endingDate || training.TrainingDate <= filter.endingDate) &&
      (!filter.state || training.state === filter.state) &&
      (!filter.name || training.trainerName === filter.name)
    ));
  }, [filter.selectedDate, filter.endingDate, filter.state, filter.name, trainigData]);

  const resetFilter = () => {
    setFilter({ selectedDate: new Date().toISOString().slice(0, 10), endingDate: '', state: '', name: '' })
  }

const updateTrainingState = (id) => {
  
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
        setTrainers(response.data)
      }).catch(e => {
        console.log(e.response.statusText)
      })
  }, [])

  /* ###################### Saving Assigned training data and posting to server ############################## */

  const saveTraningData = async () => {
    let formData = new FormData()
    formData.append('trainerName', trainer)
    formData.append('schoolName', school)
    formData.append('startTime', sTime)
    formData.append('endTime', eTime)
    formData.append('TrainingDate', TraininDate)

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
  }
  if (authenticated.authData) {
    return (
      <>

        {/* ################# Top Cards ################# */}

        <div className='d-flext jutify-content-center container mt-5' id='cards'>
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


          <div className="container d-flex justify-content-start">
            <div className="mx-2">

              {/* ############################## Popup Training Assign Menu ################################################*/}

              <button type="button" className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" >Assign Training</button>

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
                          <select className="form-select" aria-label="Default select example" name='name' onChange={(e) => setTrainer(e.target.value)} required>
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
                          <select className="form-select" data-live-search="true" name='schoolName' onChange={(e) => setSchool(e.target.value)} required>
                            <option value='none' hidden>Choose School</option>
                            {
                              schoolApi.map((data) => {
                                return <option value={parseInt(data.id)} key={data.id}>{data.school}</option>
                              })
                            }

                          </select>
                        </div>

                        {/* Date */}

                        <div className="mb-4 d-flex align-items-center">
                          <input type="date" onChange={(e) => setTrainingDate(e.target.value)} className='form-control' name="TrainingDate" />
                        </div>

                        <div className="form-outline mb-4">
                          <div className="row">
                            <div className="col-6">
                              <label className="form-label" htmlFor="form6Example5">Start At</label>
                              <input className='form-control' name='startTime' type="time" onChange={(e) => setStime(e.target.value)} />
                            </div>

                            <div className="col-6">
                              <label className="form-label" htmlFor="form6Example5">End At</label>
                              <input className='form-control' name='endTime' type="time" onChange={(e) => setEtime(e.target.value)} />
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

            <div className="mx-2 d-flex align-items-center">
              <input type="date" ref={curDate} value={filter.selectedDate} name="selectedDate" onChange={handelChange} className='form-control' id="Date" />
            </div>

            {/* ############################## Ending Date Filter ###################################### */}

            <div className="mx-2 d-flex align-items-center">
              <input type="date" value={filter.endingDate} name="endingDate" onChange={handelChange} className='form-control' id="Date" />
            </div>

            {/* ################################# Trainer Filter ################################ */}
            <div className="mx-2 d-flex align-items-center">
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
            <div className="mx-2 d-flex align-items-center">
              <select className="form-select" aria-label="Default select example" name='state' value={filter.state} onChange={handelChange} required>
                <option value='none' hidden>Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* ################################# Reset Button ################################### */}
            <div className="mx-2 d-flex align-items-center">
              <input type="button" value="Reset Filter" onClick={resetFilter} className='form-control' />
            </div>

          </div >


          {/* Cards Section */}

          < div className='container d-flex justify-content-start align-items-center flex-wrap my-5'>
            {filterData.length > 0 ?
              filterData.map((tData) => {
                return (
                  <div className={`card mx-3 mb-3 ${tData.state === 'completed' ? "bg-success" : "bg-warning"}`} key={tData.id} style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title mb-3">{tData.schoolName}</h5>
                      <h6 className="card-subtitle mb-2">{tData.trainerName}</h6>
                    </div>
                    <div className='card-body text-bg-dark'>
                      <div className='row d-flex align-items-center'>
                        <div className='card-body col-6'>
                          <h6 className='card-subtitle mb-2'>{tData.TrainingDate}</h6>
                          <p className="card-subtitle mb-2 mt-2">Starting : {tData.startTime}</p>
                          <p className="card-subtitle mb-2">Ending : {tData.endTime}</p>
                        </div>
                        <div className="col-6">
                          <select className="form-select text-bg-dark" aria-label="Default select example" name='state' onChange={() => updateTrainingState(tData.id)} value={tData.state}>
                            <option value='none' hidden>Status</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </div>
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
  else {
    history.push("/")
  }
}
