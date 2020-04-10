import React from 'react'
import * as bs from 'react-bootstrap'
import { Formik, Form, Field, } from 'formik'
import axios from "axios";
import $ from 'jquery';
import AppContext from './context.js'


// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js'


function Checkout(props) {
    // we'll add Stripe's Elements component here later

    const context = React.useContext(AppContext)
    const cams = context.campaigns
    console.log(context.campaigns)

    return (
        <CheckoutController />

    )
}
export default Checkout


const CheckoutController = props => {

    const context = React.useContext(AppContext)

    return (
        <Formik
            initialValues={{
                goal: 100000,
                days_active: 90,
                title: 'Mom is sick',
                description: 'My mom has corona virus',
                has_beneficiary: true,
                visible_in_search: true,
                is_charity: true,
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validate={values => {
                const errors = {}
                return errors
            }}
            onSubmit={async (values, actions) => {
                console.log(values)
                //context.setDonor("100")
                axios.defaults.withCredentials = true;
                //const resp = await axios.get('api/azure')
                const resp = await axios.post('api/azurep/', values)
                let stringData = resp.data
                let start = stringData.search("Values")
                let end = stringData.search("]]}}}}")
                start += 11
                end = end - start

                let data = stringData
                data = data.substr(start, end)
                data = parseInt(data)
                context.setDonor(Math.abs(data))

                const resp2 = await axios.post('api/azurem/', values)
                let stringData2 = resp2.data
                let start2 = stringData2.search("Values")
                let end2 = stringData2.search("]]}}}}")
                start2 += 11
                end2 = end2 - start2

                let data2 = stringData2
                data2 = data2.substr(start2, end2)
                data2 = parseFloat(data2)
                data2 = data2.toFixed(2)
                context.setMoney(Math.abs(data2))

                console.log("Response from api: ", resp)
                console.log("String data: ", stringData)
                console.log("Start: ", start, "end: ", end)
                console.log("Spliced data: ", data)


            }}
        >{form => (
            <PaymentForm form={form} total={1} />
        )}</Formik>
    )
}


// MERGE THE DETAILS PAGE INTO THIS PROP. FIX ISSUE WITH ROUTE MATCH AND PULLING CAMS OBJECT

const PaymentForm = props => {

    const context = React.useContext(AppContext)

    return (
        <div>

        <bs.Container className="p-5">
            <Form>
                <bs.Row>
                    <bs.Col className="px-0 " style={{ borderRadius: "20px" }}>
                        <h3 className="text-center p-2 border " style={{ backgroundColor:"#01b964", borderRadius: "20px 20px 0px 0px", marginBottom: "0", color: "white", fontFamily: "Arial Black, Gadget, sans-serif" }}>Build Your Own Campaign</h3>
                        <div className="p-2 border" >
                            <bs.Row>
                            <bs.Col>
                            <b><Input title="Goal" name="goal" type="text" style={{fontFamily: "Arial Black, Gadget, sans-serif"}} disabled={props.form.isSubmitting} /></b>
                            <b><Input title="Days Active" name="days_active" type="text" disabled={props.form.isSubmitting} /></b>
                            <b><Input title="Title" name="title" type="text" disabled={props.form.isSubmitting} /></b>
                            <b><Input title="Description" name="description" type="text" disabled={props.form.isSubmitting} /></b>
                            </bs.Col><bs.Col>
                            <b><Input title="Does your campaign have a beneficiary?" name="has_beneficiary" type="text" disabled={props.form.isSubmitting} /></b>
                            <b><Input title="Do you want your campaign to be visible in searches?" name="visible_in_search" type="text" disabled={props.form.isSubmitting} /></b>
                            <b><Input title="Is this a real charity?" name="is_charity" type="text" disabled={props.form.isSubmitting} /></b>
                                <div className="text-center">
                                <h4>Predictions</h4>
                                <h6>Donors: {context.donors}</h6>
                                <h6>Amount Per Donoation: ${context.money}</h6>
                                </div>
                            </bs.Col>
                            </bs.Row>
                            <bs.Row>
                            <bs.Button type="submit" variant="" disabled={props.form.isSubmitting} style={{ backgroundColor:"#01b964", marginLeft: "auto", marginRight: "auto", color:"white", fontFamily: "Arial Black, Gadget, sans-serif"}}>
                                <bs.Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    hidden={!props.form.isSubmitting}
                                >
                                </bs.Spinner>
                                 <b>Submit</b></bs.Button>
                            </bs.Row>
                        </div>
                    </bs.Col>
                </bs.Row>
            </Form>
        </bs.Container>

        </div>
    )
}

/**
 * A form input.
 *   props.title - the title that shows above the input box
 *   props.type - the type of input (see React Bootstrap Form.Control)
 *   props.placeholder - placeholder text in the input.
 * This component is finished and doesn't need additional work.
 */
const Input = (props) => (
    <Field name={props.name}>{rProps => (
        <bs.Form.Group>
            {props.title &&
                <bs.Form.Label>{props.title}</bs.Form.Label>
            }
            <bs.Form.Control
                type={props.type}
                placeholder={props.placeholder}
                {...rProps.field}
                disabled={props.disabled}
            />
            {rProps.meta.touched && rProps.meta.error &&
                <div className="text-warning">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>
)

