import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as CrownLogo } from '../../assets/crownLogo.svg'
import {UserContext} from '../../contexts/user.context'
import './navigation.styles.scss'
import { signOutUser } from '../../Utils/firebase/firebase.utils'

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const signOutHandler = async () => {
        await signOutUser()
        setCurrentUser(null)

    }
    // console.log('currentUser navigation -> ', currentUser)
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrownLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        Shop
                    </Link>
                    {
                    currentUser ? (<span className="nav-link" onClick ={signOutHandler}> SIGN OUT</span>) : (
                        <Link className="nav-link" to='/auth'>
                            SIGN IN
                        </Link>
                    )}
                   
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation