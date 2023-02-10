import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { SchoolData } from '../DemoTrainerData'
// import ClipLoader from 'react-spinners/ClipLoader';
import { SchoolModel } from '../PopupModels/SchoolModel'

export default function Schools() {
    //State variables
    const [curKey, setCurKey] = useState()
    const [SchoolData, setSchoolData] = useState([])
    const [school, setSchool] = useState({
        schoolName: '',
        region: '',
        am: '',
        om: '',
        catagory: '',
    })

    //################## Handelling the changes and storing into state variables ##########################

    const handleChange = (e) => {
        setSchool({
            ...school, [e.target.name]: e.target.value
        })
    }

    /* ########################### Sending School Data to Back-End ####################################### */

    const saveSchoolDetails = async () => {
        const schoolDetails = new FormData()
        schoolDetails.append('school', school.schoolName)
        schoolDetails.append('region', school.region)
        schoolDetails.append('am', school.am)
        schoolDetails.append('om', school.om)
        schoolDetails.append('catagory', school.catagory)
        console.log(schoolDetails)
        await axios(
            {
                method: 'post',
                url: 'http://localhost:8000/schooldata',
                data: schoolDetails
            }
        ).then((response) => {
            console.log(response.data)
        }).catch((e) => {
            console.log(e.response.data)
        })
    }


    //######################################### Detelte School Info Based of ID ####################################

    const detelteData = (id) => {
        axios.delete(`http://localhost:8000/schooldata/${id}`)
    }

    /* ######################################## Fetching Data From API ############################################## */

    useEffect(() => {
        axios.get('http://localhost:8000/schooldata')
            .then((response) => {
                setSchoolData(response.data);
            })
    }, [SchoolData])


    if (SchoolData.length === 0) {
        return (
            <div className='container d-flex justify-content-center align-item-center'>
                <h1>Loading ......</h1>
            </div>
        )
    }

    return (
        <div className='my-5'>
            <div className="container d-flext justify-content-center my-4">
                <div className="my-3">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add School</button>
                </div>

                <hr className='border border-primary border-3 opacity-50 my-2' />

                {/*################################ Model Starts ######################################### */}
                <SchoolModel id={curKey} />

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add School</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <form>
                                    {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                                    <div className="row mb-2">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form6Example1">School Name</label>
                                                <input type="text" id="form6Example1" className="form-control" name='schoolName' onChange={handleChange} required />
                                            </div>
                                        </div>

                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form6Example2">Region</label>
                                                <input type="text" id="form6Example2" className="form-control" name='region' onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- AM --> */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form6Example3">Academic Manager</label>
                                        <input type="text" id="form6Example3" className="form-control" name='am' onChange={handleChange} required />
                                    </div>

                                    {/* <!-- OM --> */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form6Example4">Operation Manager</label>
                                        <input type="url" id="form6Example4" className="form-control" name='om' onChange={handleChange} required />
                                    </div>


                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form6Example5">School Catagory</label>
                                        <select className="form-select" aria-label="Default select example" name='catagory' onChange={handleChange} required>
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

                {/*###################################### Popup Model End ############################################# */}

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">SchoolID</th>
                            <th scope="col">School Name</th>
                            <th scope="col">Region</th>
                            <th scope="col">Academic Manager</th>
                            <th scope="col">Operations Manager</th>
                            <th scope="col">Catagory</th>
                            <th scope='col'>Delete</th>
                            <th scope='col'>Modity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            SchoolData.map((school) => {

                                return <tr key={school.id}>
                                    <th scope="row">{school.id}</th>
                                    <td>{school.school}</td>
                                    <td>{school.region}</td>
                                    <td>{school.am}</td>
                                    <td>{school.om}</td>
                                    <td>{school.catagory}</td>
                                    <td><button className='btn btn-danger' onClick={(e) => detelteData(school.id)}>Delete</button></td>
                                    <td><button className='btn btn-warning' data-bs-toggle="modal" onClick={() => setCurKey(school.id)} data-bs-target="#examp2">Modify</button></td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>

            </div>
        </div>
    )
}
