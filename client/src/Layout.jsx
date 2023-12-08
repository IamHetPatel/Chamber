import { Fragment } from "react"
import Navbar from "./layouts/Navbar";
const Layout = (props) => {
  return (

      <Fragment>
      <header>
        <Navbar/>
      </header>
      <main>
      {props.children}
      </main>
      </Fragment>
  )
}

export default Layout
