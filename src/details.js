import React from 'react'
import * as bs from 'react-bootstrap'
//import PRODUCTS from './products.js'
import { useRouteMatch } from 'react-router-dom'
import AppContext from './context.js'
//import { BsPrefixComponent } from 'react-bootstrap/helpers'
import { Link, useHistory } from "react-router-dom";


// donations = 2999
// goal = 3000
// daysActive = 10


// console.log(fundResult)
// console.log(dayResult)
// console.log(output)


function ProductDetail(props) {

    //const PRODUCTS_AR = Object.values(PRODUCTS)
    const context = React.useContext(AppContext)
    const authorized = React.useContext(AppContext).authorized
    let history = useHistory()
    console.log("THIS IS WHAT THEY SAY AUTH IS----", authorized)
    if(!authorized){history.push('/login')}

    const campaigns = context.campaigns
    let match = useRouteMatch("/details/:id")
    let c
    let found = false
    let goal 
    let verifiedClass = ''
    
   

    for (let p of Object.values(campaigns)) {
       if( String(p.campaign_id) === match.params.id) {
        //if (p.id == match.params.id) {
            c = p
            found = true
            console.log(Math.round((c.goal / c.current_amount)*100))
        }
    }

    let output = ""
    let fundResult = c.current_amount / c.goal
    let dayResult = c.days_active / 365

    if (fundResult <= .25 && dayResult >= .75) {
        output = "Bad"
    } else if (fundResult <= .5 && dayResult >= .5) {
        output = "Good"
    } else if (fundResult <= .75 && dayResult >= .25) {
        output = "Very Good"
    } else {
        output = "Excellent"
    }
    

    const [imgIdx, setImgIdx] = React.useState(1)

    if (found) {

        if(c.is_charity && c.charity_valid){
            verifiedClass = 'fas fa-check-circle'
        }

        if((c.current_amount/c.goal) > 1){
            goal = 100
        }
        else{
            goal = (c.current_amount/c.goal)*100
        }
        goal = goal.toString()
        goal = goal + "%"
        return (
            <bs.Container >
                <bs.Row className="" >
                    <bs.Col md="7" lg="7" style={{marginTop:"20px"}}>
                      <bs.Image src={c.campaign_image_url} style={{width: '100%', height: '100%', objectFit: 'cover'}} ></bs.Image>
                    </bs.Col>
                    <bs.Col md="4" lg="4" className="offset-1 shadow bg-light" style={{marginTop:"88px", height: "350px"}}>
                        <div>
                            <h4 style={{marginTop: "20px", fontFamily: "Arial Black, Gadget, sans-serif"}}><big><b>${c.current_amount}</b></big> <small>raised of ${c.goal} goal!</small></h4>
                            <div class="progress" style={{height: "7px"}}>
                                <div class="progress-bar bg-success" role="progressbar" style={{width: goal.toString() }} aria-valuenow={'50'} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <bs.Container>
                                <bs.Row style={{marginBottom: "1px"}}>
                                    <bs.Col>
                                        <p className="text-center" style={{marginTop: "50px", marginBottom: "1px", fontFamily: "Arial Black, Gadget, sans-serif"}}>Donors</p>
                                    </bs.Col>
                                    <bs.Col>
                                        <p className="text-center" style={{marginTop: "50px", marginBottom: "1px", fontFamily: "Arial Black, Gadget, sans-serif"}}><i class="fas fa-heart text-danger"></i></p>
                                    </bs.Col>
                                    <bs.Col>
                                        <p className="text-center" style={{marginTop: "50px", marginBottom: "1px", fontFamily: "Arial Black, Gadget, sans-serif"}}>Shares</p>
                                    </bs.Col>
                                </bs.Row>
                                <bs.Row>
                                <bs.Col>
                                        <p className="text-center" style={{marginTop: "1px", fontFamily: "Arial Black, Gadget, sans-serif"}}>{c.donators}</p>
                                    </bs.Col>
                                    <bs.Col>
                                        <p className="text-center" style={{marginTop: "1px", fontFamily: "Arial Black, Gadget, sans-serif"}}>{c.campaign_hearts}</p>
                                    </bs.Col>
                                    <bs.Col>
                                        <p className="text-center" style={{marginTop: "1px", fontFamily: "Arial Black, Gadget, sans-serif"}}>{c.social_share_total}</p>
                                    </bs.Col>
                                </bs.Row>
                                <bs.Row className="text-center mx-auto"style={{ fontSize:"20px", marginLeft: "auto", marginRight: "auto"}}>
                                    <h5 className="text-center" style={{marginLeft: "auto", marginRight: "auto"}}>Our Rating: </h5>
                                </bs.Row>
                                <bs.Row className="text-center mx-auto" style={{marginLeft: "auto", marginRight: "auto"}}>
                                 {context.getScore(c)}
                                </bs.Row>
                                <bs.Row className="text-center" style={{marginTop:"15px", marginBottom:"3px"}}>
                                <a href={c.url} class="btn btn-primary btn-warning" role="button" aria-disabled="true" style={{color:"white", fontSize:"20px", marginLeft: "auto", marginRight: "auto"}}><b>GoFundMe Page</b></a>
                                </bs.Row>
                            </bs.Container>

                    </div>
                    </bs.Col>
                </bs.Row>
                <bs.Row className="" >
                    <bs.Col md="7" lg="7">
                        <h1>{c.title}</h1>
                        <bs.Container className="" style={{borderBottom:".05px solid", borderBottomColor: "#c4c4c4", borderTop:".05px solid", borderTopColor: "#c4c4c4", paddingLeft: "0px"}}>
                            <bs.Row style={{marginTop:"5px", marginBottom: "1px"}}>
                                <bs.Col>
                                    <h4>Created by {c.user_first_name} {c.user_last_name}</h4>
                                 </bs.Col>
                                 <bs.Col>
                                    <h5><i class="fas fa-tag text-secondary"></i>  {c.category}</h5>
                                 </bs.Col>
                            </bs.Row>
                            <bs.Row>
                                <bs.Col>
                                    <h5 style={{paddingLeft: "15px"}}>{c.created_at}</h5>
                                </bs.Col>
                                <bs.Col>
                                    <h5><i class={verifiedClass} style={{color:"cornflowerblue"}}></i>  {c.charity_name}</h5>
                                </bs.Col>
                            </bs.Row>
                        </bs.Container>
                    </bs.Col>

                    {/* --------------------- FORMIK FORM HOPE THIS WORKS
                    <bs.Col md="4" lg="4" className="offset-1" style={{marginTop:"48px"}}>
                    </bs.Col> */}
                </bs.Row>
                <bs.Row>
                <p><emsp/>{c.description}</p>
                </bs.Row>





            </bs.Container>
        )
    }
    else {
        return (
            <h1>Not Found</h1>
        )
    }

}
export default ProductDetail