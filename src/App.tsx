

import Header from './components/Header'
import Input from './components/Input'
import Todos from './components/Todos'
import './scss/main.scss'

function App() {
  

  return (
    <main className="">
      <div className="relative flex justify-center items-center">
        <div
          className="
        bg-[url('./assets/images/bg-mobile-light.jpg')]
        sm:bg-[url('./assets/images/bg-desktop-light.jpg')]
        dark:bg-[url('./assets/images/bg-mobile-dark.jpg')]
        dark:sm:bg-[url('./assets/images/bg-desktop-dark.jpg')]
        bg-no-repeat
        w-full
        bg-cover
        h-64
        md:h-[17rem]      
        "
        ></div>
        <section className="w-[90%] top-16 max-w-xl m-auto  absolute">
          <Header />
          <Input />
          <Todos />
        </section>

      </div>
    </main>
  )
}

export default App
