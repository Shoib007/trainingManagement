import axios from 'axios'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { trainigData } from '../DemoTrainerData'

export default function Dashboard() {

  // State variables

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)) // Default value as current date
  const [trainer, setTrainer] = useState()
  const [school, setSchool] = useState()
  const [sTime, setStime] = useState()
  const [eTime, setEtime] = useState()
  const [TraininDate, setTrainingDate] = useState()
  // const bgColor = 'primary'


  // get the date reference
  const curDate = useRef()

  // setting the default date value as current date
  useEffect(() => {
    curDate.current.valueAsDate = new Date();
  }, [])


  //Filtering data based on date and returining it
  const filterItems = useMemo(() => {
    return trainigData.filter(obj => obj.Data === selectedDate)
  }, [selectedDate])


  //Saving Assigned training data
  const saveTraningData = async () => {
    let formData = new FormData()
    formData.append('trainerName', trainer)
    formData.append('schoolName', school)
    formData.append('startTime', sTime)
    formData.append('endTime', eTime)
    formData.append('TrainingDate', TraininDate)
    console.log(`
    Trainer : ${trainer}
    School : ${school}
    Date : ${TraininDate}
    Start Time : ${sTime}
    End Time : ${eTime}
    `)
    await axios (
      {
        method:'post',
        url: 'http://localhost:8000/training',
        data: formData
      }
    ).then( (response) => {
      console.log(response.data)
    } ).catch( (e) => {
      console.log(e.response.data)
    } )
  }

  return (
    <>
      <div className='d-flext jutify-content-center container mt-5'>
        <div className="container d-flex justify-content-start">
          <div className="mx-2">

            {/* Popup Training Assign Menu */}

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
                            trainigData.map(trainer => {
                              return <option value={trainer.TrainerName}>{trainer.TrainerName}</option>
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
                            trainigData.map(data => {
                              return <option value={data.School}>{data.School}</option>
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
            filterItems.map(tData => {
              return (
                <div className="card text-bg-primary mx-3 mb-3" style={{ width: "18rem", zIndex: '-2' }}>
                  <div className="card-body">
                    <h5 className="card-title mb-3">{tData.School}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{tData.TrainerName}</h6>
                    <h6 className='card-subtitle mb-2'>{tData.Data}</h6>
                    <p className='card-subtitle mt-2'><b>Training Link :</b></p>
                    <a href={tData.link} className='card-link'>{tData.link}</a>
                    <p className="card-subtitle mb-2 mt-2">Starting : {tData.Start}</p>
                    <p className="card-subtitle mb-2">Ending : {tData.End}</p>
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
