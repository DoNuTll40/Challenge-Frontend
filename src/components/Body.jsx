
import axiosApi from "axios"
import axios from "../configs/axios-path"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightToBracket, faSave } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash"

function Body() {

  const [list, setList] = useState([])
  const [brand, setBrand] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [input, setInput] = useState({
    rec_regiscar: "",
    rec_brand: "",
    rec_model: "",
    rec_color: "",
    rec_detail: ""
  })

  let token = localStorage.getItem('token')

  useEffect(() => {
    const getAll = async () => {
      const rs = await axios.get('/car', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setList(rs.data.get)
    }
    getAll()

    const getBrand = async () => {
      const rs = await axiosApi.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?group_by=make&limit=143')
      setBrand(rs.data.results)
    }

    getBrand();

  }, [refresh])

  const hdlSubmit = async (e) => {
    e.preventDefault();

    if (!input.rec_brand && !input.rec_color && !input.rec_detail && !input.rec_model && !input.rec_regiscar) {
      return alert("โปรดกรอกข้อมูลให้ครบ")
    }

    try {
      const rs = await axios.post('/car/add', input, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (rs.status === 200) {
        alert("เพิ่มข้อมูลเรียบร้อยแล้ว")
        setRefresh(prv => !prv)
      }
    } catch (err) {
      console.log(err)
      alert(err.response.data.message)
    }
  }

  const hdlChange = (e) => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  const hdlDelete = async (e, id) => {
    e.preventDefault()
    if(confirm("คุณต้องการลบข้อมูลที่บันทึกหรือไม่")){
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
    }else{
      alert("ยกเลิกการลบเสร็จสิ้น")
    }
  }

  return (
    <div className="my-5">
      <div className="max-w-[80rem] min-h-[50vh] mx-auto">
        <div className="bg-white w-full rounded-md p-4">
          <h1 className="text-center font-bold mb-2 ">เพิ่มรายการบันทึก</h1>
          <form onSubmit={hdlSubmit}>
            <div className="flex">
              <div className="flex flex-col px-2 gap-1 w-full">
                <p className="pl-2 font-semibold text-[15px]">เลือกแบรนด์รถ</p>
                <select name="rec_brand" onChange={hdlChange} className="py-3 px-4 border-2 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none text-ellipsis">
                  <option hidden>เลือกแบรนด์</option>
                  {brand.map((el, index) => (
                    <option value={el.make} key={index + 1}>{el.make}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col px-2 gap-1 w-full">
                <p className="pl-2 font-semibold text-[15px]">พิมพ์หมายเลขรุ่น</p>
                <input name="rec_model" onChange={hdlChange} className="py-3.5 px-4 border-2 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" />
              </div>
              <div className="flex flex-col px-2 gap-1 w-full">
                <p className="pl-2 font-semibold text-[15px]">พิมพ์สีรถ</p>
                <input name="rec_color" onChange={hdlChange} className="py-3.5 px-4 border-2 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" />
              </div>
              <div className="flex flex-col px-2 gap-1 w-full">
                <p className="pl-2 font-semibold text-[15px]">พิมพ์หมายเลขทะเบียน</p>
                <input name="rec_regiscar" onChange={hdlChange} className="py-3.5 px-4 border-2 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" />
              </div>
              <div className="flex flex-col px-2 gap-1 w-full">
                <p className="pl-2 font-semibold text-[15px]">พิมพ์รายละเอียดเพิ่มเติม</p>
                <input name="rec_detail" onChange={hdlChange} className="py-3.5 px-4 border-2 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" />
              </div>
            </div>
            <button className="w-full h-11 px-3 bg-green-700 text-white font-bold rounded-md mt-5 transition ease-in-out hover:bg-green-800 hover:cursor-pointer scale-[1] active:scale-[0.99] active:bg-green-800">บันทึกข้อมูล <FontAwesomeIcon icon={faSave} /></button>
          </form>
        </div>
        <div className="my-3 bg-white p-4 rounded-md">
          <p className="font-bold">รายการที่บันทึก</p>
          <div className="flex gap-3 my-3 flex-wrap w-full">
            {list.map((el, index) => (
              <div key={index + 1} className="bg-white rounded-md p-2 shadow-md border-2 w-[302px] flex justify-between items-center">
                <div>
                  <p>หมายเลขทะเบียบ {el.rec_regiscar}</p>
                  <p className="truncate text-ellipsis overflow-hidden w-[200px]" title={el.rec_brand}>ชื่อแบรนด์รถ {el.rec_brand}</p>
                  <p>หมายเลขรุ่นรถ {el.rec_model}</p>
                  <p>สีของรถ {el.rec_color}</p>
                  <p>หมายเหตุ {el.rec_detail}</p>
                </div>
                <div className="h-full border-2 border-red-600 text-red-600 hover:cursor-pointer rounded-md flex items-center justify-center w-14" onClick={(e) => hdlDelete(e, el.rec_id)}><FontAwesomeIcon icon={faTrash} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Body