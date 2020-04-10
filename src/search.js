import React from 'react'
import * as bs from 'react-bootstrap'
//import PRODUCTS from './products.js'
import { Link, useRouteMatch, useHistory } from "react-router-dom";
//import details from './details.js'
import AppContext from './context.js'
import { useState } from 'react';

function Home(props) {
    const context = React.useContext(AppContext)
    const authorized = React.useContext(AppContext).authorized
    let history = useHistory()
    console.log("THIS IS WHAT THEY SAY AUTH IS----", authorized)
    if (!authorized) { history.push('/login') }
    const campaigns = context.campaigns
    let match = useRouteMatch("/category/:name")
    let sortedP = []
    let cams = []
    let sortType = 'desc'

    for (let c of Object.values(campaigns)) {
        cams.push(c)
    }

    const [count, setCount] = useState(12);
    const [sort, setSort] = useState(0);

    if (sort == 1) {
        const sorted = cams.sort((a, b) => (a.current_amount - b.current_amount) * -1);
    }
    if (sort == 2) {
        const sorted = cams.sort((a, b) => (a.donators - b.donators) * -1);
    }
    if (sort == 3) {
        const sorted = []
        for (let c of Object.values(campaigns)) {
            if (c.is_charity && c.charity_valid) {
                sorted.push(c)
            }
        }
        cams = sorted
    }

    cams = cams.slice(0, count)

    if (match == null) {
        return (
            <div style={{ paddingTop: "25px" }}>
                <bs.Container>
                    <div className="bg-light mx-auto text-center shadow">
                        <bs.Row className="text-center" style={{ marginLeft: "auto", marginRight: "auto" }}><h3 style={{ marginLeft: "auto", marginRight: "auto" }}>Select a filter</h3></bs.Row>
                        <bs.Row className=" " style={{paddingTop:".5rem", paddingBottom:"1rem"}}>
                            <bs.Col md="3" lg='3' className="text-center">
                                <bs.Button className="btn-lg btn-light shadow" style={{ color: "black" }} onClick={e => { setSort(0) }} >All Campaigns</bs.Button>
                            </bs.Col>
                            <bs.Col md="3" lg='3' className="text-center">
                                <bs.Button className="btn-lg btn-light shadow" style={{ color: "black" }} onClick={e => { setSort(1) }} >Most Raised</bs.Button>
                            </bs.Col>
                            <bs.Col md="3" lg='3' className="text-center">
                                <bs.Button className="btn-lg btn-light shadow" style={{ color: "black" }} onClick={e => { setSort(2) }} >Most Donors</bs.Button>
                            </bs.Col>
                            <bs.Col md="3" lg='3' className="text-center">
                                <bs.Button className="btn-lg btn-light shadow" style={{ color: "black" }} onClick={e => { setSort(3) }} >Verified Charities</bs.Button>
                            </bs.Col>

                        </bs.Row>
                    </div>
                    <bs.Row>
                        {cams.map(c => {

                            let goal
                            if ((c.current_amount / c.goal) > 1) {
                                goal = 100
                            }
                            else {
                                goal = (c.current_amount / c.goal) * 100
                            }
                            goal = goal.toString()
                            goal = goal + "%"



                            return (
                                <bs.Col key={c.campaign_id} md='3' style={{
                                    left: 5,
                                    top: 10,
                                }}>
                                    <bs.Card>
                                        <bs.Card.Img key={c.campaign_image_url} variant="top" style={{ width: '100%', height: '15vw', objectFit: 'cover' }} src={c.campaign_image_url} />
                                        <bs.Card.Body>
                                            <bs.Card.Title key={c.title} style={{ width: '100%', height: 'auto', objectFit: 'cover', paddingBottom: "auto" }} >{c.title}</bs.Card.Title>
                                            <bs.Card.Text >
                                                <h6 style={{padding:"auto"}} >${c.current_amount} of {c.goal} raised!</h6>

                                                <div class="progress" style={{ height: "7px" }}>
                                                    <div class="progress-bar bg-success" role="progressbar" style={{ width: goal.toString() }} aria-valuenow={'50'} aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>

                                                <h6 style={{marginTop:"1rem"}}>{c.donators} Total Donors!</h6>
                                                <Link to={"/details/" + c.campaign_id} onClick={() => context.setCampaign(c)} className="btn btn-light shadow text-center" style={{ marginLeft: "auto", marginRight: "auto", marginTop: "1px" }}><b>More Info</b></Link>
                                            </bs.Card.Text>
                                        </bs.Card.Body>
                                    </bs.Card>
                                    <br></br>
                                </bs.Col>
                            )
                        })
                        }
                    </bs.Row>
                    <bs.Row md='5' classname="text-center py-20">
                        <bs.Button classname="btn btn-light shadow" variant="light shadow" onClick={() => setCount(count + 12)} style={{ marginLeft: "auto", marginRight: "auto" }}><b>Next Page</b></bs.Button>
                    </bs.Row>
                </bs.Container>
                <div style={{ paddingTop: "25px" }}></div>
            </div>
        )
    }
}
export default Home