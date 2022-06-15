import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddOrder from '../add-order/AddOrder';
import CreateOrder from '../add-order/CreateOrder';
import  { useState} from 'react'
import httpAgent from '../../App/api/httpAgent';
import {useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify";

const steps = ['Create Order', 'Add Meals'];

const theme = createTheme();

const orderLength = httpAgent.Order.list().length;

export default function Checkout(){

    let navigate = useNavigate();
    const {totalPrice} = useSelector((state) => state.order)
    const[ order, setOrder ] = useState(
        {
            "id":orderLength ,
            "status":
            {
                "completed": false
            },
            "orderItems": [],
            "orderDate":null
        }
    );

    function OrderItems (order){
        setOrder((prev)=> ({...prev,"totalAmount": totalPrice,orderItems:
             order.map((order,index) => {
                 return   {
                     "id":index+1,
                     "name": order.name,
                     "orderHour": "21:45",
                     "quantity": order.count,
                     "wait": 0,
                     "status": "received",
                     "price": order.price
                 }
             })
            }))
    }

    function  WaitersTables(waitersTables){
        setOrder((prev)=> ({...prev,...waitersTables}))
    }

    function submitOrder(){
        httpAgent.Order.create(order)
            .then(() => {
                toast.success('Successfully order')
                navigate("/")
            })
            .catch((err) => console.log(err))
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <CreateOrder WaitersTables={WaitersTables}/>;
            case 1:
                return <AddOrder OrderItems={OrderItems}/>;

            default:
                throw new Error('Unknown step');
        }
    }

    function submitDisabled(){
        if (activeStep ===  0) {
            return order.table !== undefined || order.waiter !== undefined ? false : true;
        } else {
            return order.orderItems.length > 0 ? false : true;
        }
    }

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {

        if(activeStep === steps.length-1)
        {
             submitOrder();
             setActiveStep(activeStep+1)
        }
        else
        {
            setActiveStep(activeStep + 1);
        }

    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                     <Stepper activeStep={activeStep} sx={{ pt: 3}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === 2 ? (
                            <React.Fragment>

                            </React.Fragment>
                        ) : (
                            <>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        disabled={submitDisabled()}
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </Box>
                            </>
                        )}
                    </React.Fragment>
            </Container>
        </ThemeProvider>
    );
}