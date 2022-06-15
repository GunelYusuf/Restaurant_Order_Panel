import React, {useEffect, useState} from 'react';
import { Table } from 'antd';
import {useSelector } from 'react-redux';
import httpAgent from '../../App/api/httpAgent';
const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "Table",
        dataIndex: "table",
        key: "table"
    },
    {
        title: "Waiter",
        dataIndex: "waiter",
        key: "waiter"
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => <p>{status.completed===true ? 'completed' : 'not completed'}</p>
    },
    {
        title: "Price",
        dataIndex: "totalAmount",
        key: "totalAmount"
    },
    {
        title: "Order Date",
        dataIndex: "orderDate",
        key: "orderDate",
        render: (orderDate) =><p>{orderDate===null ? "--" : orderDate}</p>
    },
    {
        title: "Action",
        dataIndex: "id",
        key: "id",
        render: (id) => <a style={{border:"1px solid darkblue",backgroundColor:"lightsteelblue",padding:"7px",borderRadius:"5px",color:"darkblue"}} href={`/order/${id}`}>View</a>
    }

]

function Index() {
    const[allOrders, setAllOrders]=useState()


   useEffect(()=>{
       httpAgent.Order.list().then((order)=>{
           order.sort(function(x, y) {
               return (x.status.completed === y.status.completed)? 0 : x.status.completed? 1 : -1;
           });
           setAllOrders(order)
       })

       },[])

    return (
        <>
            <Table
                columns={columns}
                dataSource={allOrders}
                rowKey="id"
            />
            <h2 style={{marginLeft:"35px"}}>Total: {Math.round(allOrders?.reduce((sum,item) => (
                sum += item.totalAmount
            ),0) * 100)/100} </h2>

         </>
    );
}

export default Index;






