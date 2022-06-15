import React, { useState } from 'react'
import {Tabs} from 'antd';
import 'antd/dist/antd.css';
import Meals from '../../components/meals/Meals'
import {useSelector } from 'react-redux';

const { TabPane } = Tabs;

const AddOrder = ({OrderItems}) => {

    const {totalPrice} = useSelector((state) => state.order)

    return (
        <>
            <div className="container">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="" key="1">
                             <Meals OrderItems={OrderItems}/>

                            <div className='totalPrice' style={{marginTop:'10px', fontSize:"20px", fontWeight:"bold"}}>
                                <h3>Total: {totalPrice} </h3>

                            </div>

                       </TabPane>
                    </Tabs>
            </div>

        </>
    )
}

export default AddOrder;