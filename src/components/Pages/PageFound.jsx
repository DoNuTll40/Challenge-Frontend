import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

function PageFound() {

  const navigate = useNavigate()

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center fixed inset-0">
        <div className="bg-white h-1/4 w-1/3 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p>Oops!</p>
          <p className="text-xl font-bold">ระบบบันทึกข้อมูลรถ</p>
          <p>404 Page not found</p>
          <button className="pt-6" onClick={ () => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /></button>
        </div>
      </div>
    </div>
  )
}

export default PageFound