import {Fragment} from 'react'
import {Outlet, Link} from 'react-router-dom'

const Navigation =()=>{
    return(
      <Fragment>
        <div className="nav">
            <Link className="logo-container" to='/'>
            <div>Logo</div>
            </Link>
          <div className="links-container"></div>
            <Link className="nav-link" to='/shop'>
            Shop
            </Link>
        </div>
        <Outlet/>
      </Fragment>
      )
  }

  export default Navigation