import axios from "axios"
import React, { useMemo, useState } from "react"

let BASE_URL = 'http://localhost:8000'

export function SchoolModel(prop) {
    const id = prop.id;
    // const [schoolData, setSchoolData] = useState([])
    const [schoolData, setSchoolData] = useState({
        school: '',
        region: '',
        am: '',
        om: '',
        catagory: ''
    })


    const handleChanges = (e) => {
        setSchoolData({
            ...schoolData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        const Data = new FormData()
        Data.append('school', schoolData.school)
        Data.append('region', schoolData.region)
        Data.append('am', schoolData.am)
        Data.append('om', schoolData.om)
        Data.append('catagory', schoolData.catagory)
        axios.put(`http://localhost:8000/schooldata/${id}`, Data)
        .catch((e) => console.log(e.response))
    }

    useMemo(() => {
        axios.get(BASE_URL + '/schooldata/' + id)
            .then((res) => {
                setSchoolData(res.data);
            }).then((e) => console.log(e))
    }, [id])





    return (
        <>

            <div className="modal fade" id='examp2' tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                            <input type="text" name="school" value={schoolData.school} id="form6Example1" className="form-control" onChange={handleChanges} required />
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form6Example2">Region</label>
                                            <input type="text" name="region" value={schoolData.region} id="form6Example2" className="form-control" onChange={handleChanges} required />
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- AM --> */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form6Example3">Academic Manager</label>
                                    <input type="text" id="form6Example3" name="am" value={schoolData.am} className="form-control" onChange={handleChanges} required />
                                </div>

                                {/* <!-- OM --> */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form6Example4">Operation Manager</label>
                                    <input type="url" id="form6Example4" name="om" value={schoolData.om} className="form-control" onChange={handleChanges} required />
                                </div>


                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form6Example5">School Catagory</label>
                                    <select className="form-select" name="catagory" value={schoolData.catagory} aria-label="Default select example" onChange={handleChanges} required>
                                        <option value='none' hidden>Catagory</option>
                                        <option value="Catagory A">Catagory A</option>
                                        <option value="Catagory B">Catagory B</option>
                                        <option value="Catagory C">Catagory C</option>
                                    </select>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary px-4" onClick={handleSubmit} data-bs-dismiss="modal">Update</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}