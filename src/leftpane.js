import React from 'react'
import * as bs from 'react-bootstrap'
import { Link } from 'react-router-dom'

function LeftPane(props) {
    return (
        <div className="text-center p-2">
            <bs.Nav defaultActiveKey="/home" className="flex-column" >
                <Link to={`/`} style={{ color: "white", textDecoration: "none" }}>
                    Home
                </Link>
            </bs.Nav>
        </div>
    )
}
export default LeftPane
