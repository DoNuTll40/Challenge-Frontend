
import { faAddressCard, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faKey, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../configs/axios-path';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate()
    const [input, setInput] = useState({
        user_firstname: '',
        user_lastname: '',
        user_email: '',
        user_phone: '',
        user_password: '',
        confirmPassword: ''
    })

    const hdlChange = e => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    };

    const hdlSubmit = async e => {
        e.preventDefault();
        try {
            const rs = await axios.post('/auth/register', input);
            if(rs.status === 200){
                alert("กรุณา login เพื่อเข้าสู่ระบบ")
                navigate('/')
            }
        } catch(err) {
            console.log(err)
            alert(err.response.data.message)
        }
    }

    return (
        <div className="h-screen">
            <div className="flex items-center">
                <div className="bg-white h-[38rem] w-[30rem] mx-auto mt-12 rounded-lg p-6 shadow-md">
                    <div className="mb-2">
                        <p className="text-center font-bold">สร้างบัญชีผู้ใช้งาน</p>
                        <p className="text-center text-sm my-2 mb-5">โปรดป้อนข้อมูลให้ครบเพื่อ</p>
                    </div>
                    <form onSubmit={hdlSubmit}>
                        <div className="w-full flex gap-2">
                            <div className="flex flex-col gap-2 w-1/2 relative">
                                <p className="text-[14px] font-semibold px-0.5">ชื่อจริง</p>
                                <input className="w-full text-sm h-11 px-3 pl-10 rounded-md border-2 font-semibold" type="text" name="user_firstname" onChange={hdlChange} placeholder="กรอกชื่อจริง"></input>
                                <FontAwesomeIcon className="absolute top-[2.5rem] left-3 text-xl text-gray-400" icon={faAddressCard} />
                            </div>
                            <div className="flex flex-col gap-2 w-1/2 relative">
                                <p className="text-[14px] font-semibold px-0.5">นามสกุล</p>
                                <input className="w-full text-sm h-11 px-3 pl-10 rounded-md border-2 font-semibold" type="text" name="user_lastname" onChange={hdlChange} placeholder="กรอกนามสกุล"></input>
                                <FontAwesomeIcon className="absolute top-[2.5rem] left-3 text-xl text-gray-400" icon={faAddressCard} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <p className="text-[14px] font-semibold px-0.5">อีเมล์</p>
                            <input className="w-full text-sm h-11 px-3 pl-10 rounded-md border-2 font-semibold" type="email" name="user_email" onChange={hdlChange} placeholder="example@domain.com"></input>
                            <FontAwesomeIcon className="absolute top-[2.5rem] left-3 text-xl text-gray-400" icon={faEnvelope} />
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <p className="text-[14px] font-semibold px-0.5">เบอร์โทร</p>
                            <input className="w-full text-sm h-11 px-3 pl-10 rounded-md border-2 font-semibold" type="text" name="user_phone" onChange={hdlChange} placeholder="กรอกเบอร์โทร" maxLength={10}></input>
                            <FontAwesomeIcon className="absolute top-[2.5rem] left-3 text-xl text-gray-400" icon={faPhone} />
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <p className="text-[14px] font-semibold px-0.5">รหัสผ่าน</p>
                            <input className="w-full text-sm h-11 px-3 pl-10 rounded-md border-2 font-semibold" type="password" name="user_password" onChange={hdlChange} placeholder="กรุณากรอกรหัสผ่าน"></input>
                            <FontAwesomeIcon className="absolute top-[2.7rem] left-3 text-[18px] text-gray-400" icon={faKey} />
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <p className="text-[14px] font-semibold px-0.5">ยืนยันรหัสผ่าน</p>
                            <input className="w-full text-sm h-11 px-3 pl-10 rounded-md border-2 font-semibold" type="password" name="confirmPassword" onChange={hdlChange} placeholder="กรุณากรอกรหัสผ่าน"></input>
                            <FontAwesomeIcon className="absolute top-[2.7rem] left-3 text-[18px] text-gray-400" icon={faKey} />
                        </div>
                        <button className="w-full h-11 px-3 bg-blue-700 text-white font-bold rounded-md my-5 transition ease-in-out hover:bg-blue-800 hover:cursor-pointer scale-100 active:scale-95 active:bg-blue-800 shadow-md" type="submit">สร้างบัญชี</button>
                    </form>
                    <div>
                        <button className="border-2 p-2 px-3 rounded-full scale-100 hover:scale-105 shadow-md" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register