import axios from '../../configs/axios-path'
import { useEffect, useState } from "react"
import useAuth from '../../hooks/UserAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


function ListUsers() {

    const { user } = useAuth();
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState(null);
    const [refresh, setRefresh] = useState(false);

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
        if(confirm('คุณต้องการลบข้อมูลหรือไม่')){
            try {
                const rs = await axios.delete(`/admin/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if(rs.status === 200){
                    alert("ลบข้อมูลเรียบร้อยแล้ว")
                    setRefresh(prv => !prv)
                }
            }catch(err){
                console.log(err);
                alert(err.response.data.message);
            }
        }else{
            alert('ยกเลิกเรียบร้อยแล้ว')
        }
    }

    return (
        <div>
            <div className="max-w-[80rem] mx-auto min-h-[61.6vh]">
                <div className="mt-4 bg-white rounded-md p-4">
                    <p>ยินดีตอนรับคุณ {user.user_firstname} {user.user_lastname}</p>
                </div>
                <div className="flex w-full gap-5">
                    <div className="w-2/4 md:w-1/4">
                        <div className="p-4 pb-4 bg-white my-4 rounded-md shadow-md h-fit">
                            <p className="font-semibold text-[15px] mb-2 select-none">ตัวเลือก</p>
                            <hr />
                            <div className="mt-2 flex flex-col gap-1">
                                <p className="p-2 pl-2 hover:bg-slate-500 hover:rounded-md hover:font-semibold hover:text-white hover:cursor-pointer" onClick={ () => setFilter(null)}>ทั้งหมด</p>
                                <p className="p-2 pl-2 hover:bg-slate-500 hover:rounded-md hover:font-semibold hover:text-white hover:cursor-pointer" onClick={ () => setFilter("admin")}>ผู้ใช้งาน</p>
                                <p className="p-2 pl-2 hover:bg-slate-500 hover:rounded-md hover:font-semibold hover:text-white hover:cursor-pointer" onClick={ () => setFilter("users")}>ผู้ดูแลระบบ</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-3/4">
                        <div className="p-4 bg-white my-4 rounded-md shadow-md font-bold">รายชื่อผู้ใช้งานในระบบ</div>
                        <div className="p-4 bg-white my-4 rounded-md shadow-md">
                            <table className='table-auto w-full'>
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
                                    {users.filter( el => el.user_role !== filter ).map((el, index) => (
                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{el.user_firstname}</td>
                                            <td>{el.user_lastname}</td>
                                            <td>{el.user_email}</td>
                                            <td>{el.user_phone}</td>
                                            <td className='text-center'><button><FontAwesomeIcon icon={faEdit} /></button></td>
                                            <td className='text-center'><button onClick={ (e) => hdlDelete(e, el.user_id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListUsers