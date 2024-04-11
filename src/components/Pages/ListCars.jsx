
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../configs/axios-path'
import { useEffect, useState } from "react"
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'

function ListCars() {

  const [list, setList] = useState([])
  const [refresh, setRefresh] = useState(false)

  let token = localStorage.getItem('token')

  useEffect(() => {
    const getList = async () => {
      const rs = await axios.get('/car', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setList(rs.data.get)
    }
    getList();
  }, [refresh])

  const hdlDelete = async (e, id) => {
    e.preventDefault();
    if (confirm("คุณต้องการลบข้อมูลที่บันทึกหรือไม่")) {
      try {
        const rs = await axios.delete(`/car/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (rs.status === 200) {
          alert("ลบข้อมูลเรียบร้อยแล้ว")
          setRefresh(prv => !prv)
        }
      } catch (err) {
        console.log(err)
        alert(err.response.data.message)
      }
    } else {
      alert("ยกเลิกการลบเสร็จสิ้น")
    }
  }

  return (
    <div className="max-w-[80rem] mx-auto p-4">
      <div className="flex flex-col gap-4 ">
        <div className="shadow-md bg-white p-4 rounded-md my-2 border-2">
          <p className='font-bold text-lg'>รายการที่บันทึกทั้งหมด</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-md mb-2 border-2 min-h-[45.5vh] overflow-x-scroll">
          <hr />
          <table className='w-[75.8rem] my-2'>
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>แบรนด์รถ</th>
                <th>หมายเลขรุ่น</th>
                <th>สีรถ</th>
                <th>หมายเลขทะเบียน</th>
                <th>รายละเอียดเพิ่มเติม</th>
                <th>วัน-เวลา ที่เพิ่ม</th>
                <th>การแก้ไข</th>
                <th>ผู้ใช้งาน</th>
                <th>ตัวเลือก</th>
              </tr>
            </thead>
            <tbody>
              {list.map((el, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{el.rec_brand}</td>
                  <td>{el.rec_model}</td>
                  <td>{el.rec_color}</td>
                  <td>{el.rec_regiscar}</td>
                  <td>{el.rec_detail}</td>
                  <td>{new Date(el.rec_create_at).toLocaleString('th-TH')}</td>
                  <td>{el.rec_create_at !== el.rec_update_at ? "มีการแก้ไข" : "ไม่มีการแก้ไข"}</td>
                  <td>{el.users.user_firstname}</td>
                  <td><button className='w-full flex items-center justify-center' onClick={(e) => hdlDelete(e, el.rec_id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
        </div>
      </div>
    </div>
  )
}

export default ListCars