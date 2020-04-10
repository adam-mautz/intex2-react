import React from 'react'
import * as bs from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AppContext from './context.js'


function HeaderContainer(props) {

    const context = React.useContext(AppContext)
    const authorized = React.useContext(AppContext).authorized
    console.log("THIS IS WHAT THEY SAY AUTH IS----", authorized)
    if(authorized) {
        return (

            <bs.Navbar  variant="" style={{backgroundColor: "white"}}>
            <Link to="/search"> <bs.Navbar.Brand>
                    <bs.Image src={process.env.PUBLIC_URL + "/gfm1.png"} style={{width:"auto", height:"32px"}}></bs.Image>
                </bs.Navbar.Brand></Link>
                <Link to="/search" style={{textDecoration: "none"}} ><h4 style={{color: "#01b964", marginBottom: "0"}}>Analytics Tool</h4></Link>
                <bs.Nav className="ml-auto mx-3" >                <Link to="/search" style={{textDecoration: "none"}} ><h5 style={{color: "#01b964", marginBottom: "0", margin:"auto"}}>Home</h5></Link>
                </bs.Nav>
                <bs.Nav className="ml-5 mx-3" style={{marginLeft:""}}>
                <Link to="/search" style={{textDecoration: "none"}} onClick={e => { context.logout() }} ><h4 style={{color: "#01b964", marginBottom: "0"}}>Log Out</h4></Link>
                </bs.Nav>
            </bs.Navbar>
        )
    }
    else{
        return (

            <bs.Navbar  variant="" style={{backgroundColor: "white"}}>
            <Link to="/home"> <bs.Navbar.Brand>
            <bs.Image src={process.env.PUBLIC_URL + "/gfm1.png"} style={{width:"auto", height:"32px"}}></bs.Image>
                </bs.Navbar.Brand></Link>
                <Link to="/home" style={{textDecoration: "none"}} ><h4 style={{color: "#01b964", marginBottom: "0"}}>Campaign Calculator</h4></Link>
                <bs.Nav className="ml-auto mx-3" style={{marginLeft:""}}>
                <Link to="/login" style={{textDecoration: "none"}}  ><h4 style={{color: "#01b964", marginBottom: "0"}}>Employee Log-In</h4></Link>
                </bs.Nav>
            </bs.Navbar>
        )
    }
}
export default HeaderContainer