import { Link } from 'react-router-dom';
import { BsCaretRightFill } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../BaseUrl';


export default function Profile(prop) {
    const fileButton = useRef();
    const [imageFile, setImageFile] = useState('')
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userDetail')))

    const fileHandle = (e) => {
        setImageFile(e.target.files[0]);
        axios({
            method:'post',
            url:`${BASE_URL}/setprofile`,
            data: imageFile,
        }).then(res => console.log(res.data))
        .catch(err => console.log(err.status))
        console.log(imageFile);
    }

    const handleClick = () => {
        fileButton.current.click();
    }

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem('userDetail')))
    }, [])

    return (
        <div>
            <div className="container rounded bg-white mb-5">
                <div className='container d-flex shadow-sm align-items-center mt-3'>
                    <Link to="/dashboard" className='fs-4 mx-3 mt-3 mb-3 text-decoration-none'> Dashboard </Link>
                    <BsCaretRightFill className='mx-3' />
                    <span className='fs-4 mx-3'>Profile</span>
                </div>
                <div className="row">
                    <div className="d-flex justify-content-start align-items-center mx-5 mt-3">
                        <h4 className="text-right">User Name</h4>
                    </div>
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3">
                            <input type='file' ref={fileButton} onChange={fileHandle} style={{display:'none'}} accept="image/png, image/jpeg"/>
                            <img className="rounded-circle mt-5" width="150px" alt='profile' src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                            <button className='btn btn-success'onClick={handleClick}>Add Image</button>
                        </div>
                    </div>
                    <div className="col-md-5 border-right">
                        <div className="p-3">

                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <label className="labels">Full Name</label>
                                    <input type="text" value={userInfo ? userInfo.name : ""} className="form-control" placeholder="first name" readOnly />
                                </div>
                                
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Mobile Number</label>
                                    <input type="text" className="form-control mb-3" value={userInfo ? userInfo.phoneNumber : ""} placeholder="enter phone number" readOnly />
                                </div>

                                <div className="col-md-12">
                                    <label className="labels">Email ID</label>
                                    <input type="text" value={userInfo ? userInfo.email : ""} className="form-control mb-3" placeholder="enter email id" readOnly />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
