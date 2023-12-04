
import { MuiNavbar } from './MuiNavbar'

export const UserHomePage = () => {
  const url = window.location.href;
  const urlPatrs = url.split('/');
  console.log(url);
  for(let i=0;i<urlPatrs.length;i++){
    console.log('i=',i,urlPatrs[i])
  }

  const username = urlPatrs[3];
  const prefixUrl = 'http://localhost:3000/'+username;

  console.log('prefixUrl',prefixUrl)
  
  const links = [
    {
      name:'Home',
      url:url,
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


