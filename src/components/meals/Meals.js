import { Avatar, Divider, List, Skeleton,InputNumber} from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import httpAgent from '../../App/api/httpAgent';
import {useDispatch,useSelector } from 'react-redux';
import {totalPrice} from '../../features/add-order/orderSlice';


const Meals = ({OrderItems}) => {

    const dispatch = useDispatch()
    const {meals} = useSelector((state) => state.meals)

    const [data, setData] = useState(meals);

    useEffect(() =>{
        OrderItems(data.filter(x=> x.count > 0 ))
        dispatch(totalPrice(data))
    },[data])

    const OnOrderChange = (index,e) => {
       setData(data.map((item,i) => (
           i===index ? {...item, count:e} : item
       )))
    }

    return (
        <div
            id="scrollableDiv"
            style={{
                height: 550,
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
                <List
                    dataSource={meals}
                    renderItem={(item,index) => (
                        <List.Item key={item.index}>
                            <List.Item.Meta
                                avatar={<Avatar src={process.env.PUBLIC_URL + item.image}/>}
                                title={item.name}
                                description={`$ ${item.price} `}
                            />
                            <div>
                                <InputNumber
                                min={0}
                                placeholder='0'
                                onChange={(e) => OnOrderChange(index,e)}
                                defaultValue={0}

                                />
                            </div>
                        </List.Item>
                       
                    )}
                />
        </div>
    );
};

export default Meals;