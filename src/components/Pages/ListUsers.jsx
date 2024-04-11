import axios from '../../configs/axios-path'
import { useEffect, useState } from "react"
import useAuth from '../../hooks/UserAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';


function ListUsers() {

    const { user } = useAuth();
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState('')
    const [user_role, setUser_role] = useState({})

    let token = localStorage.getItem('token')

    useEffect(() => {
        const getUser = async () => {
            const rs = await axios.get('/admin/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUsers(rs.data.fullUser)
        }
        getUser()
    }, [refresh])

    const hdlDelete = async (e, id) => {
        e.preventDefault()
        if (confirm('คุณต้องการลบข้อมูลหรือไม่')) {
            try {
                const rs = await axios.delete(`/admin/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (rs.status === 200) {
                    alert("ลบข้อมูลเรียบร้อยแล้ว")
                    setRefresh(prv => !prv)
                }
            } catch (err) {
                console.log(err);
                alert(err.response.data.message);
            }
        } else {
            alert('ยกเลิกเรียบร้อยแล้ว')
        }
    }

    const hdlEdit = (e, id, role) => {
        e.preventDefault();
        setShowModal(true)
        setUserId(id)
        setUser_role(role)
    }

    const hdlChange = (e) => {
        setUser_role(prv => ({...prv, [e.target.name]: e.target.value}))
    }

    const hdlSaveEdit = async (e) => {
        e.preventDefault();
        try {
            const rs = await axios.patch(`/admin/users/${userId}`, user_role, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(rs.status === 200){
                alert("แก้ไขข้อมูลเรียบร้อยแล้ว");
                setShowModal(false);
                setUser_role({});
                setUserId('');
                setRefresh(prv => !prv)
            }
        }catch(err){
            console.log(err);
            alert(err.response.data.message);
        }
    }

    return (
        <div>
            <div className="max-w-[80rem] mx-auto min-h-[64.3vh]">
                <div className="mt-4 bg-white rounded-md p-4">
                    <p>ยินดีตอนรับคุณ {user.user_firstname} {user.user_lastname}</p>
                </div>
                <div className="flex w-full gap-5">
                    <div className="w-2/4 md:w-1/4">
                        <div className="p-4 pb-4 bg-white my-4 rounded-md shadow-md h-fit">
                            <p className="font-semibold text-[15px] mb-2 select-none">ตัวเลือก</p>
                            <hr />
                            <div className="mt-2 flex flex-col gap-1 select-none">
                                <p className={`p-2 pl-2 hover:bg-slate-500 hover:rounded-md hover:font-semibold hover:text-white hover:cursor-pointer ${filter === null ? "bg-slate-500 rounded-md font-semibold text-white" : ""}`} onClick={() => setFilter(null)}>ทั้งหมด</p>
                                <p className={`p-2 pl-2 hover:bg-slate-500 hover:rounded-md hover:font-semibold hover:text-white hover:cursor-pointer ${filter === "admin" ? "bg-slate-500 rounded-md font-semibold text-white" : ""}`} onClick={() => setFilter("admin")}>ผู้ใช้งาน</p>
                                <p className={`p-2 pl-2 hover:bg-slate-500 hover:rounded-md hover:font-semibold hover:text-white hover:cursor-pointer ${filter === "users" ? "bg-slate-500 rounded-md font-semibold text-white" : ""}`} onClick={() => setFilter("users")}>ผู้ดูแลระบบ</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-3/4">
                        <div className="p-4 bg-white my-4 rounded-md shadow-md font-bold">รายชื่อผู้ใช้งานในระบบ</div>
                        <div className="p-4 bg-white my-4 rounded-md shadow-md overflow-x-scroll">
                            <table className='table-auto w-full min-w-[680px] select-none'>
                                <thead className='text-left'>
                                    <tr>
                                        <th>ลำดับ</th>
                                        <th>ชื่อจริง</th>
                                        <th>นามสกุล</th>
                                        <th>อีเมล</th>
                                        <th>เบอร์โทร</th>
                                        <th className='text-center' colSpan={2}>คำสั่ง</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.filter(el => el.user_role !== filter).map((el, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{el.user_firstname}</td>
                                            <td>{el.user_lastname}</td>
                                            <td>{el.user_email}</td>
                                            <td>{el.user_phone}</td>
                                            <td className='text-center'><button className='bg-yellow-500 hover:bg-yellow-600 px-2 py-1.5 rounded-md my-1 text-white font-semibold text-sm scale-100 active:scale-95' onClick={(e) => hdlEdit(e, el.user_id, el.user_role)}><FontAwesomeIcon icon={faEdit} /> แก้ไขหน้าที่</button></td>
                                            <td className='text-center'><button className='bg-red-500 hover:bg-red-600 px-2 py-1.5 rounded-md my-1 text-white font-semibold text-sm scale-100 active:scale-95' onClick={(e) => hdlDelete(e, el.user_id)}><FontAwesomeIcon icon={faTrash} /> ลบผู้ใช้</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal */}
            {showModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-scroll">
                        <div className='h-screen backdrop-opacity-40 bg-black/40 w-screen'>
                            <div className='flex justify-center items-center fixed inset-0'>
                                <div className='w-72 h-fit bg-white p-4 rounded-lg'>
                                    <div className='flex justify-between'>
                                        <div className='font-semibold'>แก้ไขหน้าที่</div>
                                        <div>
                                            <button onClick={() => {setShowModal(false); setUser_role({}); setUserId("")}}><FontAwesomeIcon icon={faXmarkCircle} /></button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div>
                                        <select name="user_role" onChange={hdlChange} value={user_role} className='w-full mt-4 mb-1 py-3 px-3 border-2 pe-9 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none text-ellipsis'>
                                            <option value="users">ผู้ใช้งาน</option>
                                            <option value="admin">ผู้ดูแลระบบ</option>
                                        </select>
                                    </div>
                                    <button className='w-full my-1 mb-2 py-3 px-3 bg-green-700 rounded-lg text-sm font-semibold text-white' onClick={ (e) => hdlSaveEdit(e)}>บันทึกข้อมูล <FontAwesomeIcon icon={faSave}/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

        </div>
    )
}

export default ListUsers