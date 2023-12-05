
import { MuiNavbar } from './MuiNavbar'

export const UserNavbar = () => {
  const url = window.location.href;
  const urlPatrs = url.split('/');
  const username = urlPatrs[3];
  const prefixUrl = 'http://localhost:3000/'+username;

  const links = [
    {
      name:'Home',
      url:prefixUrl+'/home',
    },
    {
      name:'About',
      url:prefixUrl+'/about',
    },
    {
      name:'Upload Image',
      url: prefixUrl+'/upload_image',
    },
    {
      name:'My Tags',
      url:prefixUrl+'/my_tags',
    },
    {
      name:'Logout',
      url:'/'
    },   
  ]
  return (
    <MuiNavbar links={links}/>
  )
}


