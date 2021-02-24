import React, { useState, useEffect } from 'react'
import {
    Typography,
    Paper,
    Stepper,
    Step,
    StepLabel,
    CircularProgress,
    Divider,
    Button
} from '@material-ui/core';

import useStyles from './styles';

import { commerce } from '../../../lib/commerce';
import AdressForm from '../AdressForm';
import PaymentForm from '../PaymentForm';


const steps = ['Shipping adress', 'Payment details'];

const Checkout = ({ cart }) => {
    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                setCheckoutToken(token);

            } catch (error) {

            }
        }
        generateToken();
    }, [cart]);

    const Confirmation = () => (
        <div>confirmation</div>
    )

    const Form = () => activeStep === 0
        ? <AdressForm checkoutToken={checkoutToken} />
        : <PaymentForm />


    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography align='center' variant='h4'>
                        checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
