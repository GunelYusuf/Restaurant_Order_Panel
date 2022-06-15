import React, {useEffect, useState} from 'react';
import { Table ,Button} from 'antd';
import {useParams} from "react-router-dom";
import httpAgent from "../../App/api/httpAgent";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function SingleOrder() {
    const { id } = useParams();
    const[order, setOrder]=useState([])
    const[update, setUpdate]=useState(false);

    useEffect(()=>{
        httpAgent.Order.ById(id).then((order)=>{
            setOrder(order)
        })
    },[update])


   function cancelOrderItem(name){
      httpAgent.Order.update(id,
          {
              ...order,
              "orderItems":  order.orderItems.map(obj => {
                  if (obj.name === name) {
                      return {...obj,status: 'refusal', wait:'refusal'};
                  }
                  return obj;
              })
          }
      ).then(()=>{
          toast.success(`${name} was canceled`)
          setUpdate(true)
      })
    }

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Meal's name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity"
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Order Hour",
            dataIndex: "orderHour",
            key: "orderHour"
        },
        {
            title: "Waiting",
            dataIndex: "wait",
            key: "wait",
            render: (wait) => <p>{(typeof(wait) === 'number') ? wait + ' min' : 'refusal'}</p>
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Back",
            dataIndex: "name",
            key: "name",
            render: (name,status) => { return status.status === 'refusal' ? <p>Cancel</p> : <Button type="danger" style={{borderRadius:"5px"}}  onClick={() => cancelOrderItem(name)}>Cancel Meal</Button>}
        }
    ]

    function finalizeOrder()
    {
        httpAgent.Order.update(id,
            {
                ...order,
                "orderDate": Date("YYYY-AA-GGTSS-DD-SSZ").slice(3,21),
               status: {
                   "completed": true
               },
            }
        ).then(()=> {
            toast.success('Order completed')
            setUpdate(true)
        })
    }
    function  cancelOrder(){
        httpAgent.Order.delete(id).then((res)=>{
        })
    }

    const isFound = order?.orderItems?.some(
        element => {
            if(element.status === 'received')
            {
                return true
            }
            return false
        }
    )
    console.log(isFound)
    return (
        <>
            <Table
                columns={columns}
                dataSource={order?.orderItems}
                rowKey="id"
            />
            <h2 style={{marginLeft:"35px"}}>Total: {Math.round(order?.orderItems?.reduce((sum,item) => (
                item.status!=='refusal' ? sum += item.price * item.quantity : sum
            ),0) * 100)/100}</h2>
            {order.status?.completed !== true && isFound ?
                <Button size={"large"} style={{marginLeft:"35px",borderRadius:"4px"}} type="danger" onClick={() => order?.orderItems?.length > 0 ? finalizeOrder() : cancelOrder()}>
                    {order?.orderItems?.length > 0 ? 'Final Order' : 'Cancel Order'}
                </Button>
                :
                <>
                </>
            }
        </>
    );
}

export default SingleOrder;






