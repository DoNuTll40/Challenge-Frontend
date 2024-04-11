
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faAt, faKey, faMailBulk, faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from '../configs/axios-path';
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/UserAuth";

function Login() {

    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [input, setInput] = useState({
        user_email: "",
        user_password: ""
    });

    const hdlChange = e => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    };

    const hdlSubmit = async e => {
        e.preventDefault();
        try {
            const rs = await axios.post('/auth/login', input);
            localStorage.setItem('token', rs.data.token)
            const rs1 = await axios.get('/auth/me', {
                headers: {
                    Authorization: `Bearer ${rs.data.token}`
                }
            })
            if(rs1.data !== ""){
                alert("เข้าสู่ระบบสำเร็จ")
                setUser(rs1.data)
            }
        } catch(err) {
            console.log(err)
            alert(err.response.data.message)
        }
    }

  return (
    <div className="h-screen">
        <div className="flex items-center">
            <div className="bg-white h-[31rem] w-[25rem] mx-auto mt-20 rounded-lg p-6 shadow-md">
                <p className="text-xl text-center font-bold mt-2">ระบบบันทึกข้อมูลรถ</p>
                <p className="text-sm text-center font-semibold mt-2">โปรดป้อนข้อมูลเพื่อเข้าสู่ระบบ</p>
                <form className="mt-6 flex flex-col gap-5" onSubmit={hdlSubmit}>
                    <div className="flex flex-col gap-2 relative">
                        <p className="text-[14px] font-semibold px-0.5">อีเมล์</p>
                        <input className="w-full text-sm h-11 px-3 pl-10 rounded-md border-2 font-semibold" type="email" name="user_email" onChange={hdlChange} placeholder="example@domain.com"></input>
                        <FontAwesomeIcon className="absolute top-[2.5rem] left-3 text-xl text-gray-400" icon={faEnvelope}/>
                    </div>
                    <div className="flex flex-col gap-2 relative">
                        <p className="text-[14px] font-semibold px-0.5">รหัสผ่าน</p>
                        <input className="w-full text-sm h-11 px-3 pl-10 rounded-md border-2 font-semibold" type="password" name="user_password" onChange={hdlChange} placeholder="กรุณากรอกรหัสผ่าน"></input>
                        <FontAwesomeIcon className="absolute top-[2.7rem] left-3 text-[18px] text-gray-400" icon={faKey}/>
                    </div>
                    <button className="w-full h-11 px-3 bg-green-700 text-white font-bold rounded-md mt-5 transition ease-in-out hover:bg-green-800 hover:cursor-pointer scale-100 active:scale-95 active:bg-green-800">เข้าสู่ระบบ <FontAwesomeIcon icon={faRightToBracket}/></button>
                </form>
                <div className="relative mt-5">
                    <p className="text-center w-fit mx-auto">หรือยังไม่มีบัญชี</p>
                </div>
                <button className="w-full h-11 px-3 bg-blue-700 text-white font-bold rounded-md mt-5 transition ease-in-out hover:bg-blue-800 hover:cursor-pointer scale-100 active:scale-95 active:bg-blue-800" onClick={() => navigate('register')}>ลงทะเบียน</button>
            </div>
        </div>
    </div>
  )
}

export default Login