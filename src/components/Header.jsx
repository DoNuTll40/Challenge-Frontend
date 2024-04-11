import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useAuth from "../hooks/UserAuth"
import { Link, useNavigate } from "react-router-dom";

function Header() {

  const { user, logout } = useAuth();
  const navigate = useNavigate()

  const adminNav = [
    { to: "/users", title: "รายชื่อ" },
    { to: "/cars", title: "รายการบันทึก" },
  ]

  const pathname = location.pathname

  const hdlLogout = () => {
    logout();
    navigate('/')
  }

  return (
    <>
      <div className="bg-slate-500 select-none">
        <div className="max-w-[80rem] h-14 px-2 mx-auto flex items-center justify-between">
          <div className="w-fit text-lg flex gap-8">
            <h1 className={`font-bold mb-1 hover:cursor-pointer transition ease-in-out hover:text-white ${pathname === '/' ? "text-white" : ""}`} onClick={ () => navigate('/')}>ระบบบันทึก</h1>
            <div className="flex gap-5 text-[16px] font-semibold ">
              {adminNav.map((el, index) => (
                <Link key={index + 1} className={`transition ease-in-out hover:text-white hover:underline hover:underline-offset-[1.4rem] ${pathname === el.to ? "underline underline-offset-[1.4rem] text-white" : ""}`} to={el.to}>{el.title}</Link>
              ))}
            </div>
          </div>
          <div className="w-fit flex gap-2 items-center">
            <p className="font-bold mb-1">{user.user_firstname.toUpperCase()}</p>
            <FontAwesomeIcon title="Logout" icon={faRightFromBracket} onClick={hdlLogout} className=" transition ease-in-out hover:text-white hover:ml-1 hover:cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header