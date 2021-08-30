import Link from 'next/link'
import router from 'next/router'
import { logout } from '../services/userService'

export default function Layout({ children, home }) {

  let backClick = () => {
    router.back()
  }

  let logoutClick = () => {
    logout();
  }
  

  return (
    <>
    <div>
        <div className={"flex justify-center bg-gray-50"}>
          <div className="flex flex-row-reverse justify-between pt-2 pb-2 border-b-2 w-3/12">
            <div onClick={() => logoutClick()} className="font-sans block cursor-pointer hover:text-yellow-700 place-self-end">
              Logout
            </div>
            { 
            !home && <div onClick={() => backClick()} className="cursor-pointer hover:text-yellow-700" >
              ←
            </div>
            }
            
          </div>
        </div>

      <main>{children}</main>
    </div>
    </>
    
  )
}
