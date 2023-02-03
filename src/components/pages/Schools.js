import axios from 'axios'
import React, { useState } from 'react'
import { SchoolData } from '../DemoTrainerData'

export default function Schools() {

    //State variables
    const [schoolName, setSchoolName] = useState()
    const [region, setRegion] = useState()
    const [am, setAm] = useState()
    const [om, setOm] = useState()
    const [catagory, setCatagory] = useState()

    const saveSchoolDetails = async () => {
        const schoolDetails = new FormData()
        schoolDetails.append('school', schoolName)
        schoolDetails.append('region', region)
        schoolDetails.append('am', am)
        schoolDetails.append('om', om)
        schoolDetails.append('catagory', catagory)

        await axios(
            {
                method: 'post',
                url: 'http://localhost:8000/schooldata',
                data : schoolDetails
            }
        ).then( (response) => {
            console.log(response.data)
        } ).catch( (e) => {
            console.log(e.response.data)
        } )
    }

    return (
        <div className='my-5'>
            <div className="container d-flext justify-content-center my-4">

                <div className="my-3">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add School</button>
                </div>

                <hr className='border border-primary border-3 opacity-50 my-2'/>

                {/* Model Starts */}

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add School</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <form>
                                    {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                                    <div class="row mb-2">
                                        <div class="col">
                                            <div class="form-outline">
                                                <label class="form-label" for="form6Example1">School Name</label>
                                                <input type="text" id="form6Example1" class="form-control" onChange={e => setSchoolName(e.target.value)} required />
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="form-outline">
                                                <label class="form-label" for="form6Example2">Region</label>
                                                <input type="text" id="form6Example2" class="form-control" onChange={e => setRegion(e.target.value)} required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- AM --> */}
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form6Example3">Academic Manager</label>
                                        <input type="text" id="form6Example3" class="form-control" onChange={e => setAm(e.target.value)} required />
                                    </div>

                                    {/* <!-- OM --> */}
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form6Example4">Operation Manager</label>
                                        <input type="url" id="form6Example4" class="form-control" onChange={e => setOm(e.target.value)} required />
                                    </div>


                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form6Example5">School Catagory</label>
                                        <select class="form-select" aria-label="Default select example" onChange={e => setCatagory(e.target.value)} required>
                                            <option value='none' hidden>Catagory</option>
                                            <option value="Catagory A">Catagory A</option>
                                            <option value="Catagory B">Catagory B</option>
                                            <option value="Catagory C">Catagory C</option>
                                        </select>
                                    </div>
                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary px-4" data-bs-dismiss="modal" onClick={saveSchoolDetails}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popup Model End */}

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">SchoolID</th>
                            <th scope="col">School Name</th>
                            <th scope="col">Region</th>
                            <th scope="col">Academic Manager</th>
                            <th scope="col">Operations Manager</th>
                            <th scope="col">Catagory</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            SchoolData.map(school => {

                                return <tr>
                                    <th scope="row">{school.schoolID}</th>
                                    <td>{school.schoolName}</td>
                                    <td>{school.Region}</td>
                                    <td>{school.AM}</td>
                                    <td>{school.OM}</td>
                                    <td>{school.Catagor}</td>
                                </tr>

                            })
                        }

                    </tbody>
                </table>

            </div>
        </div>
    )
}
