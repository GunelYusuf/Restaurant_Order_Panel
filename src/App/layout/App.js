import Dashboard from  './Dashboard'
import '../../assets/scss/style.sass';
import {useDispatch,useSelector } from 'react-redux';
import {mealsCal} from '../../features/meals/mealsSlice';
import {ordersSet} from '../../features/order-list/orderListSlice';
import httpAgent from '../api/httpAgent';
import React, {useEffect} from 'react';
import {ToastContainer} from 'react-toastify';
function App() {

    const {meals} = useSelector((state) => state.meals)
    const dispatch = useDispatch();

    useEffect(() => {
        httpAgent.Order.list().then((orderList) => {
            orderList.sort(function(x, y) {
                return (x.status.completed === y.status.completed)? 0 : x.status.completed? 1 : -1;
            });
            dispatch(ordersSet([...orderList]))
        }).catch((err) => {
            console.log(err)
        })
    },[dispatch])

    useEffect(() => {
        httpAgent.Meals.list().then((body) => {
            dispatch(mealsCal([...meals,...body]))
        }).catch((err) => {
            console.log(err)
            });
    },[])

  return (
  <>
      <ToastContainer/>
      <Dashboard/>
  </>
  );
}

export default App;
