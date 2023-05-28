import { ReactElement, useEffect, useState } from 'react'
import lightIcon from '../assets/images/icon-sun.svg'
import moonIcon from '../assets/images/icon-moon.svg'
 
const Header = () : ReactElement => {
  const [darkMode, isDarkMode] = useState(false)
  

  const handleTheme = () => {
   let htmlTag = document.querySelector('html')
    if(darkMode){
      htmlTag?.classList.add('dark')
      
    }else if(!darkMode){
      htmlTag?.classList.remove('dark')
    }
  }
      useEffect(() => {
        handleTheme()
      }, [darkMode])
    return (
      <header className='flex justify-between'>
        <h2 className='text-white text-3xl md:text-4xl font-semibold tracking-[.5rem]'>TODO</h2>
        <button className='cursor-pointer' onClick={() => isDarkMode(!darkMode)}>
          <img   src={darkMode ?  lightIcon : moonIcon } className='object-contain transition ease-in-out duration-400 ' alt="A sun icon" />
        </button>
      </header>
    )
}

export default Header