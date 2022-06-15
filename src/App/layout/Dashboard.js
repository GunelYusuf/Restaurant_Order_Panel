import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import AddOrder from '../../features/add-order';
import SingleOrder from '../../features/order-list/SingleOrder'
import OrderList from '../../features/order-list'
import SideBar from '../../components/sidebar/SideBar'
import { Route,Routes,  BrowserRouter} from "react-router-dom";

function Dashboard() {
    return (
        <>
            <Row>
                <Col xs={24} xl={4} >
                   <SideBar/>
                </Col>
                <Col xs={24} xl={20}>
                       <Routes>
                           <Route path={'/'} exact element={<OrderList/>}/>
                           <Route path={'/add-order'} exact element={<AddOrder/>} />
                           <Route path={'/order/:id'} element={<SingleOrder/>}/>
                       </Routes>
                </Col>
           </Row>
        </>
    );
}

export default Dashboard;

