import React from 'react'
import axios from 'axios'
import AppContext from './context'
import App from './App'
import $ from 'jquery';
import {produce} from 'immer'
/** The context provider for our app */
export default class AppProvider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            campaigns: {},
            authorized: false,   //set as false for production
            goal: 100,
            days_active: 30,
            title: 'title',
            description: 'desc',
            has_beneficiary: 'bene',
            visible_in_search: 'visible',
            location_zip: 91709,
            is_charity: false,
            donors: "",
            money: "",
        }

        this.actions = {
            getCampaign: this.getCampaign,
            setCampaign: this.setCampaign,
            authenticate: this.authenticate,
            logout: this.logout,
            setDonor: this.setDonor,
            setMoney: this.setMoney,   
            getScore: this.getScore
            // removeFromCart: this.removeFromCart,
            // getCartTotal: this.getCartTotal,
            // getProducts: this.getProducts,
            // clearCart: this.clearCart,
        }
    }

   getCampaign(id){
    const context = React.useContext(AppContext)
    const campaigns = context.campaigns
    let c

    for (let p of Object.values(campaigns)) {
        if( String(p.campaign_id) === id) {
            //if (p.id == match.params.id) {
                c = p
                console.log("this is my METHOD: --------", c)
                return c
            }
    }
   }

   authenticate = c =>{
       this.setState({ authorized: true })
       console.log("STATE CHANGE",this.state)
   }

   logout = c =>{
    this.setState({ authorized: false })
    console.log("STATE CHANGE",this.state)          
    }
    
   setCampaign = c =>{
       console.log("CHECK CCCCCCC", c)
       this.setState({
        goal: c.goal,
        days_active: c.days_active,
        title: c.title,
        description: c.description,
        has_beneficiary: c.has_beneficiary,
        visible_in_search: c.visible_in_search,
        location_zip: c.location_zip,
        is_charity: c.is_charity,

    })
   }

    setDonor = c =>{
        console.log("this is c for setDonor", c)
        this.setState({ donors: c })
    }

    setMoney = c =>{
        this.setState({ money: c })
    }

    getScore(c){
        
        let output = ""
        let fundResult = c.current_amount / c.goal
        let dayResult = c.days_active / 365
    
        if (fundResult <= .25 && dayResult >= .75) {
            output = "Bad"
            return(
               <p style={{color:"red", marginLeft: "auto", marginRight: "auto"}}>{output}</p>
                )
        } 
        else if (fundResult <= .5 && dayResult >= .5) {
            output = "Good"
            return(
                 <p style={{color:"yellow", marginLeft: "auto", marginRight: "auto"}}>{output}</p>
                )
        } 
        else if (fundResult <= .75 && dayResult >= .25) {
            output = "Very Good"
            return(
                <h5 style={{color:"#01b964", marginLeft: "auto", marginRight: "auto"}}>{output}</h5>
                )
        } 
        else {
            output = "Excellent"
            return(
                <p style={{color:"#01b964", marginLeft: "auto", marginRight: "auto"}}>{output}</p>
            )
        }

    }




    //     for (let p of Object.values(products)) {
    //         prod.push(p)
    //     }
    
    //     Object.entries(cart).forEach(c => {
    //         product = prod.find(({ id }) => id === parseInt(c[0]))
    //         allProds.push(product)
    //     })
    //     return allProds
    // }

    

    render() {


        return (
            <AppContext.Provider value={{...this.state, ...this.actions}}>
                <App />
            </AppContext.Provider>
        )
    }
    async componentDidMount() {

        const Client = axios.create();
        Client.defaults.timeout = 0;

        //var resp = await Client.get('api/campaign/') // Deployment
        var resp = await Client.get('https://intexll.herokuapp.com/api/campaign/') // testing
        .then((res) => {
            console.log('then works')
            return res.data
        })
        console.log(resp)

        this.setState({
            campaigns: resp,
            loaded: true,
        })
    }
}