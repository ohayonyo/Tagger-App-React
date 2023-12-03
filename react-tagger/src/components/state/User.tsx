import { useState } from "react"

type AuthUser = {
  username:string
  email:string
}

export const User = ({username,email}:AuthUser) => {
  const [user, setUser] = useState<AuthUser|null>(null)
  const handleLogin = () =>{
    setUser({
      username:username,
      email:email
    })
  }

  const handleLogout = () =>{
    setUser(null)
  }
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <div>User name is:{user?.username}</div>
      <div>Email is:{user?.email}</div>
    </div>
  )
}
