import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Footer() {



  return (
    <div className="bg-slate-500 rounded-t-xl p-2 pt-5">
      <div className="max-w-[80rem] mx-auto flex gap-5">
        <div className="w-1/2">
          <p className="text-md font-bold">ตัวเลือก</p>
          <div className="pl-2 flex flex-col gap-1.5 mt-1.5">
            <p className="hover:text-white hover:cursor-pointer transition ease-in-out duration-200 w-fit hover:font-bold">ดูข้อมูล</p>
            <p className="hover:text-white hover:cursor-pointer transition ease-in-out duration-200 w-fit hover:font-bold">เพิ่มข้อมูล</p>
            <p className="hover:text-white hover:cursor-pointer transition ease-in-out duration-200 w-fit hover:font-bold">แก้ไขข้อมูล</p>
            <p className="hover:text-white hover:cursor-pointer transition ease-in-out duration-200 w-fit hover:font-bold">ลบข้อมูล</p>
          </div>
        </div>
        <div className="w-1/2">
          <p className="text-md font-bold">ติดต่อฉัน</p>
          <div className="text-sm font-bold pl-2">
            <div className="flex gap-2 items-center my-1 hover:cursor-pointer w-fit text-ellipsis" onClick={ () => window.location = 'mailto:nuttawoot.ch64@snru.ac.th'}>
              <FontAwesomeIcon icon={faEnvelope} className="bg-white p-1.5 rounded-full"/>
              <p className="w-fit text-ellipsis break-normal">nuttawoot.ch64@snru.ac.th</p>
            </div>
            <div className="flex gap-2 items-center my-1 hover:cursor-pointer w-fit" onClick={ () => window.location = 'mailto:iinter731@gmail.com'}>
              <FontAwesomeIcon icon={faEnvelope} className="bg-white p-1.5 rounded-full"/>
              <p>iinter731@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-3">
        <p className="text-[11px] font-semibold">Copyright <sup>&copy;</sup> 2024 64CS125_Nuttawoot_Chawna</p>
      </div>
    </div>
  )
}

export default Footer