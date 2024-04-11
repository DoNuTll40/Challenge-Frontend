
import axiosApi from "axios"
import axios from "../configs/axios-path"
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faRightToBracket, faSave } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash"
import useAuth from "../hooks/UserAuth"

function Body() {

  const { user } = useAuth();
  const [list, setList] = useState([])
  const [brand, setBrand] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [edit, setEdit] = useState(false);

  const editRef = useRef(null);

  const [upList, setUpList] = useState({
    rec_regiscar: "",
    rec_brand: "",
    rec_model: "",
    rec_color: "",
    rec_detail: ""
  })
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

    if (!input.rec_brand || !input.rec_color || !input.rec_detail || !input.rec_model || !input.rec_regiscar) {
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
        hdlReset();
        setRefresh(prv => !prv)
      }
    } catch (err) {
      console.log(err)
      alert(err.response.data.message)
    }
  }

  const hdlReset = () => {
    setInput({
      rec_regiscar: "",
      rec_brand: "",
      rec_model: "",
      rec_color: "",
      rec_detail: ""
    });

    setUpList({
      rec_regiscar: "",
      rec_brand: "",
      rec_model: "",
      rec_color: "",
      rec_detail: ""
    });

    document.querySelector('select[name="rec_brand"]').selectedIndex = 0;
  }

  const hdlChange = (e) => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  const hdlChangeUp = (e) => {
    setUpList(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  const hdlDelete = async (e, id) => {
    e.preventDefault()
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

  const hdlEdit = async (e, id) => {
    e.preventDefault();
    editRef.current?.scrollIntoView({ behavior: 'smooth' });
    try {
      const rs = await axios.get(`/car/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUpList(rs.data.getId);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message)
    }
  }

  const hdlSaveEdit = async e => {
    e.preventDefault();

    const { rec_create_at, rec_update_at, user_id, rec_id, ...value } = upList
    console.log(value)
    try {
      const rs = await axios.patch(`/car/update/${upList.rec_id}`, value, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (rs.status === 200) {
        alert("แก้ไขข้อมูลเรียบร้อบแล้ว")
        hdlReset()
        setEdit(!edit)
      }
    } catch (err) {
      console.log(err)
      alert(err.response.data.message)
    }
  }


  const hdlCancel = () => {
    hdlReset()
    setEdit(!edit)
  }

  return (
    <div className="my-5">
      <div className="max-w-[80rem] min-h-[50vh] mx-auto">

        {/* add data */}
        <div className={`bg-white w-full rounded-md p-4 ${edit ? "hidden" : "block"}`} ref={editRef}>
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
                <input name="rec_model" onChange={hdlChange} value={input.rec_model} className="py-3.5 px-4 border-2 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" />
              </div>
              <div className="flex flex-col px-2 gap-1 w-full">
                <p className="pl-2 font-semibold text-[15px]">พิมพ์สีรถ</p>
                <input name="rec_color" onChange={hdlChange} value={input.rec_color} className="py-3.5 px-4 border-2 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" />
              </div>
              <div className="flex flex-col px-2 gap-1 w-full">
                <p className="pl-2 font-semibold text-[15px]">พิมพ์หมายเลขทะเบียน</p>
                <input name="rec_regiscar" onChange={hdlChange} value={input.rec_regiscar} className="py-3.5 px-4 border-2 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" />
              </div>
              <div className="flex flex-col px-2 gap-1 w-full">
                <p className="pl-2 font-semibold text-[15px]">พิมพ์รายละเอียดเพิ่มเติม</p>
                <input name="rec_detail" onChange={hdlChange} value={input.rec_detail} className="py-3.5 px-4 border-2 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" />
              </div>
            </div>
            <button className="w-full h-11 px-3 bg-green-700 text-white font-bold rounded-md mt-5 transition ease-in-out hover:bg-green-800 hover:cursor-pointer scale-[1] active:scale-[0.99] active:bg-green-800">บันทึกข้อมูล <FontAwesomeIcon icon={faSave} /></button>
          </form>
        </div>

        {/* edit data */}
        <div className={`bg-white w-full rounded-md p-4 ${!edit ? "hidden" : "block"}`} ref={editRef}>
          <h1 className="text-center font-bold mb-2">แก้ไขรายการ</h1>
          <form onSubmit={hdlSaveEdit}>
            <div className="flex">
              <div className="flex flex-col px-2 gap-1 w-full">
                <p className="pl-2 font-semibold text-[15px]">เลือกแบรนด์รถ</p>
                <select name="rec_brand" onChange={hdlChangeUp} value={upList.rec_brand} className="py-3 px-4 border-2 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none text-ellipsis">
                  <option hidden>เลือกแบรนด์</option>
                  {brand.map((el, index) => (
                    <option value={el.make} key={index + 1}>{el.make}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col px-2 gap-1 w-full">
                <p className="pl-2 font-semibold text-[15px]">พิมพ์หมายเลขรุ่น</p>
                <input name="rec_model" onChange={hdlChangeUp} value={upList.rec_model} className="py-3.5 px-4 border-2 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" />
              </div>
              <div className="flex flex-col px-2 gap-1 w-full">
                <p className="pl-2 font-semibold text-[15px]">พิมพ์สีรถ</p>
                <input name="rec_color" onChange={hdlChangeUp} value={upList.rec_color} className="py-3.5 px-4 border-2 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" />
              </div>
              <div className="flex flex-col px-2 gap-1 w-full">
                <p className="pl-2 font-semibold text-[15px]">พิมพ์หมายเลขทะเบียน</p>
                <input name="rec_regiscar" onChange={hdlChangeUp} value={upList.rec_regiscar} className="py-3.5 px-4 border-2 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" />
              </div>
              <div className="flex flex-col px-2 gap-1 w-full">
                <p className="pl-2 font-semibold text-[15px]">พิมพ์รายละเอียดเพิ่มเติม</p>
                <input name="rec_detail" onChange={hdlChangeUp} value={upList.rec_detail} className="py-3.5 px-4 border-2 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" />
              </div>
            </div>
            <button className="w-full h-11 px-3 bg-yellow-500 text-white font-bold rounded-md mt-5 transition ease-in-out hover:bg-yellow-600 hover:cursor-pointer scale-[1] active:scale-[0.99] active:bg-yellow-600">บันทึกการแก้ไข <FontAwesomeIcon icon={faSave} /></button>
          </form>
          <button className="w-full h-11 px-3 bg-rose-700 text-white font-bold rounded-md mt-2 transition ease-in-out hover:bg-rose-800 hover:cursor-pointer scale-[1] active:scale-[0.99] active:bg-rose-800" onClick={() => hdlCancel()}>ยกเลิก</button>
        </div>

        {/* show data */}
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
                  <p className="truncate text-ellipsis overflow-hidden w-[200px]" title={el.rec_detail}>หมายเหตุ {el.rec_detail}</p>
                </div>
                <div className="flex flex-col gap-3 h-full">
                  {el.users.user_id === user.user_id ? (
                    <>
                      <button className="h-1/2 border-2 border-yellow-400 text-yellow-400 hover:cursor-pointer rounded-md flex items-center justify-center w-14 disabled:opacity-50 disabled:cursor-not-allowed" disabled={edit} onClick={(e) => { setEdit(!edit); hdlEdit(e, el.rec_id); }}><FontAwesomeIcon icon={faEdit} /></button>
                      <div className={`${el.users.user_id === user.user_id ? "h-1/2" : "h-full"} border-2 border-red-600 text-red-600 hover:cursor-pointer rounded-md flex items-center justify-center w-14`} onClick={(e) => hdlDelete(e, el.rec_id)}><FontAwesomeIcon icon={faTrash} /></div>
                    </>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Body