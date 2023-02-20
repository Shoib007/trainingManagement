import axios from 'axios'
import React, { useEffect, useMemo, useRef, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../authFolder/AuthContext'
import { BASE_URL } from '../BaseUrl'

export default function Dashboard() {
  const history = useHistory()
  const authenticated = useContext(AuthContext)

  // ############ Variables for Forms and Api Data #######################

  const [trainers, setTrainers] = useState([])
  const [trainigData, setTrainingData] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)) // Default value as current date
  const [trainer, setTrainer] = useState()
  const [school, setSchool] = useState()
  const [sTime, setStime] = useState()
  const [eTime, setEtime] = useState()
  const [TraininDate, setTrainingDate] = useState()
  const [schoolApi, setSchoolApi] = useState([])

  // get the date reference
  const curDate = useRef()

  //######################################## Filter based on Date ################################

  const filterData = useMemo(() => {
    return trainigData.filter(obj => obj.TrainingDate === selectedDate);
  }, [selectedDate, trainigData])

  /* ###################################### Fetching Data from API ############################## */

  useEffect(() => {
    curDate.current.valueAsDate = new Date(); // To set the default date to current date

    axios.get(`${BASE_URL}/training`)
      .then((response) => {
        setTrainingData(response.data)
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
        console.log(e.response)
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
      console.log(response.data)
    }).catch((e) => {
      console.log(e.response.data)
      console.log(formData)
    })
  }
  if (authenticated.authData) {
    return (
      <>
        <div className='d-flext jutify-content-center container mt-5'>
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
                          <select className="form-select" aria-label="Default select example" name='trainerName' onChange={(e) => setTrainer(e.target.value)} required>
                            <option value='none' hidden>Choose Trainer</option>
                            {
                              trainers.map((trainer, i) => {
                                return <option value={parseInt(trainer.id)} key={trainer.id}>{trainer.fname}</option>
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


            {/* Filter Date */}
            <div className="mx-2 d-flex align-items-center">
              <input type="date" ref={curDate} onChange={(e) => setSelectedDate(e.target.value)} className='form-control' name="date" id="Date" />
            </div>

          </div >


          {/* Cards Section */}

          < div className='container d-flex justify-content-start align-items-center flex-wrap my-5'>
            {
              filterData.map((tData) => {
                return (
                  <div className="card mx-3 mb-3" key={tData.id} style={{ width: "18rem", zIndex: '-2' }}>
                    <div className="card-body" key={tData.id}>
                      <h5 className="card-title mb-3">{tData.schoolName}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{tData.trainerName}</h6>
                      <h6 className='card-subtitle mb-2'>{tData.TrainingDate}</h6>
                      <p className='card-subtitle mt-2'><b>Training Link :</b></p>
                      <a href="/#" className='card-link'>{tData.TrainerLink}</a>
                      <p className="card-subtitle mb-2 mt-2">Starting : {tData.startTime}</p>
                      <p className="card-subtitle mb-2">Ending : {tData.endTime}</p>
                    </div>
                  </div>
                )
              })
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
