import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook"
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub"
import { faLine } from "@fortawesome/free-brands-svg-icons/faLine"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Footer() {



  return (
    <div className="bg-slate-500 rounded-t-xl p-2 pt-5">
      <div className="max-w-[80rem] mx-auto flex gap-5">
        <div className="flex flex-col justify-center mx-auto">
          <p className="text-md text-center font-bold">ติดต่อฉัน</p>
          <div className="text-sm font-bold pl-2">
            <div className="flex gap-2 items-center my-1 hover:cursor-pointer w-fit text-ellipsis" onClick={() => window.location = 'mailto:nuttawoot.ch64@snru.ac.th'}>
              <FontAwesomeIcon icon={faEnvelope} className="bg-white p-1.5 rounded-full" />
              <p className="w-fit text-ellipsis break-normal">nuttawoot.ch64@snru.ac.th</p>
            </div>
            <div className="flex gap-2 items-center my-1 hover:cursor-pointer w-fit" onClick={() => window.location = 'mailto:iinter731@gmail.com'}>
              <FontAwesomeIcon icon={faEnvelope} className="bg-white p-1.5 rounded-full" />
              <p>iinter731@gmail.com</p>
            </div>
          </div>
          <div className="flex mt-3 justify-around text-2xl">
            <FontAwesomeIcon className="hover:text-white hover:cursor-pointer" onClick={() => window.open("https://github.com/DoNuTll40", "_blank")} icon={faGithub} />
            <FontAwesomeIcon className="hover:text-white hover:cursor-pointer" onClick={() => window.open("https://www.facebook.com/dNuttawoot.Ch", "_blank")} icon={faFacebook} />
            <FontAwesomeIcon className="hover:text-white hover:cursor-pointer" onClick={() => window.open("https://line.me/ti/p/dK4c7axgxt", "_blank")} icon={faLine} />
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