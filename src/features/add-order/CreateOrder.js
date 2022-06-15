import React, { useState, useEffect } from 'react'
import {Tabs, Form,Row, Col, Card, Select} from 'antd';
import httpAgent from '../../App/api/httpAgent'
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

const { Option } = Select;

const CreateOrder = ({WaitersTables}) => {

    const [waiters,setWaiters]=useState([]);
    const [tables,setTables]=useState([]);
    const [loading, setLoading] =useState(true)

    const[waiterTable, setWaiterTable] = useState(
        {
            "table": null,
            "waiter": null,
        }
    );

    useEffect(() => {
        if(waiterTable.table !== null && waiterTable.waiter !== null)
        {
            WaitersTables(waiterTable)
        }
    },[waiterTable])

    useEffect( ()=>{
        const fetchData = async () => {
            try {
                await httpAgent.Waiters.list().then((response) =>{
                    setWaiters(response)
                    setLoading(false)
                }).finally(() =>{
                    setLoading(false)
                })

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()

    },[]);

    useEffect( ()=>{
        const fetchData = async () => {
            try {
                await httpAgent.Tables.list().then((response) =>{
                    setTables(response)
                    setLoading(false)
                }).finally(() =>{
                    setLoading(false)
                })

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()

    },[]);

 return (
        <>
         <div className="container">
              <Tabs defaultActiveKey="1" style={{marginTop: 90}}>
                   <TabPane tab="" key="1">
                            <Row gutter={16}>

                                <Col xs={24} sm={24} md={7} xl={24} >
                                    <Card title="Organization">
                                        <Form.Item  label="Table Number">
                                            <Select name='table' className="w-100" placeholder="Table Number"
                                                    onSelect={(name) => setWaiterTable((prev)=> ({...prev,table:name}) )}
                                            >
                                                {
                                                    tables.map(elm => (
                                                        <Option value={elm.table} key={elm.id}>{elm.table}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label="Waiters">
                                            <Select name='waiter' className="w-100" placeholder="Waiters"
                                                    onSelect={(name) => setWaiterTable((prev)=> ({...prev,waiter:name}) )}
                                            >
                                                {
                                                    waiters.map(elm => (
                                                      <Option   value={elm.name} key={elm.id}>{elm.name}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>

                                    </Card>
                                </Col>

                            </Row>
                        </TabPane>
                    </Tabs>
                </div>

        </>
    )
}

export default CreateOrder;