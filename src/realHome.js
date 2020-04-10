import React from 'react'
import * as bs from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AppContext from './context.js'


function Landing(props) {


        return (
            <bs.Container>
                <bs.Row>
                    <bs.Col md="9" className="bg-light offset-2 text-center shadow" style={{maxWidth:"700px", marginTop:"50px", borderRadius: "20px", height:"300px"}}>
                    <h1 style={{color:"#01b964"}}><big>Welcome to GoFundMe</big></h1>
                    <h3 style={{marginTop:"40px"}}>View the Campaign Calculator</h3>
                    <bs.Row>
                    <Link to={"/home" } className="btn shadow text-center" style={{backgroundColor:"#01b964", marginLeft: "auto", marginRight: "auto", marginTop: "5px", marginBottom:"5px", color:"white"}}><b>Calculator</b></Link>
                    </bs.Row>
                    <h3 style={{marginTop:"20px"}}>Employees Log in</h3>
                    <Link to={"/login" } className="btn shadow text-center" style={{backgroundColor:"#01b964", marginLeft: "auto", marginRight: "auto", marginTop: "1px", color:"white"}}><b>Log in</b></Link>
                
            </bs.Col>
            </bs.Row>  
            </bs.Container>
        )
    
}
export default Landing