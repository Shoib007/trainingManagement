import React from 'react'
import axios from 'axios'

export function YesNoPopUps(prop) {
    const detelteData = (id) => {
        axios.delete(`http://localhost:8000/${prop.path}/${id}`)
        .then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err.response.data);
        })
    }

    return (
        <div>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h4 className='text-danger'>Data can not be recovered</h4>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal">Go Back</button>
                            <button type="button" onClick={(e) => detelteData(prop.id)} className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
