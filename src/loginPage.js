import React from 'react'
import * as bs from 'react-bootstrap'
import { Formik, Form, Field, } from 'formik'
import axios from "axios";
import $ from 'jquery';
import AppContext from './context.js'
import { Link, useHistory } from "react-router-dom";


// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js'


function Checkout(props) {
    // we'll add Stripe's Elements component here later

    return (
        <CheckoutController />

    )
}
export default Checkout


const CheckoutController = props => {
    const context = React.useContext(AppContext)
    let history = useHistory()


    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validate={values => {
                const errors = {}
                if (values.username != 'mgmt') {
                    errors.username = "Username Incorrrect"
                }
                if (values.password != 'intex') {
                    errors.password = "Password Incorrrect"
                }
                return errors
            }}
            onSubmit={async (values, actions) => {
                console.log(values)
                context.authenticate()
                history.push('/search')



            }}
        >{form => (
            <PaymentForm form={form} total={1} />
        )}</Formik>
    )
}


// MERGE THE DETAILS PAGE INTO THIS PROP. FIX ISSUE WITH ROUTE MATCH AND PULLING CAMS OBJECT

const PaymentForm = props => {


    return (
        <div >

        <bs.Container className="p-5" style={{width:"500px", borderRadius: "0px 0px 20px 20px"}}>
            <Form >
                <bs.Row>
                    <bs.Col className="px-0 " style={{ borderRadius: "20px" }}>
                        <h3 className="text-center p-2 border" style={{ backgroundColor:"#01b964", borderRadius: "20px 20px 0px 0px", marginBottom: "0", color: "white", fontFamily: "Arial Black, Gadget, sans-serif" }}>Please Login</h3>
                        <div className="p-2 border" >
                            <bs.Row>
                            <bs.Col>
                            <Input name="username" title="Username" type="text" style={{fontFamily: "Arial Black, Gadget, sans-serif"}} disabled={props.form.isSubmitting} />    
                            <Input name="password" type="password" title="Password" disabled={props.form.isSubmitting} />
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
                                 <b>Login</b></bs.Button>
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
                <div className="text-danger">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>
)

