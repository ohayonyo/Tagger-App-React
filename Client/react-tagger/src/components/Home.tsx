import { MuiNavbar } from './MuiNavbar'

export const Home = () => {
  const links = [
    {
      name:'About',
      url:'/about'
    },
    {
      name:'Home',
      url:'/'
    },
    {
      name:'Login/Register',
      url:'/login'
    },   
  ]
  return (
    <MuiNavbar links={links}/>
  )
}
