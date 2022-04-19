
import React, { useEffect, useState } from 'react'
import './SimpleChart.css'
import {ComposedChart,XAxis,YAxis,Tooltip,Legend,CartesianGrid,Bar} from 'recharts'
import Btn from './graphbutton/Btn';
import HeaderNavbar from '../../headerNavbar/HeaderNavbar';
import { useDispatch, useSelector } from 'react-redux';
import Graph from '../../StoreSlice/graphthunk/graph';
import { Cookies } from 'react-cookie';

const day= [
  {
    name: 'Monday',
    sale: 4000,  
  },
  {
    name: 'Tuseday',
    sale: 3000,

  },
  {
    name: 'Wedenesday',
     sale: 2000,

  },
  {
    name: 'Thursday',
    sale: 2780,
  },
  {
    name: 'Friday',
    sale: 1890,
  },
  {
    name: 'Saturday',
    sale: 2390,
  },
  {
    name: 'Sunday',
    sale: 3490,
  },
];
const monthly = [
  {
    name: 'Jan',
    sale: 4000,  
  },
  {
    name: 'Febrary',
    sale: 3000,

  },
  {
    name: 'March',
     sale: 2000,

  },
  {
    name: 'April',
    sale: 2780,
  },
  {
    name: 'May',
    sale: 1890,
  },
  {
    name: 'June',
    sale: 2390,
  },
  {
    name: 'July',
    sale: 3490,
  },
  {
    name: 'August',
    sale: 3490,
  },
  {
    name: 'Sep',
    sale: 3490,
  },
  {
    name:'Oct',
    sale:3744,
  },
  {
    name:'Nov',
    sale:3744,
  },
  {
    name:'Dec',
    sale:3555,
  }
];
const yearly=[
  {
    name: 2015,
    sale: 3490,
  },
  {
    name: 2016,
    sale: 3490,
  },
  {
    name: 2017,
    sale: 3490,
  },
  {
    name:2018,
    sale:3844,
  },
  {
    name:2019,
    sale:3744,
  },
  {
    name:20210,
    sale:3555,
  },
  {
    name:2021,
    sale:335,
  }
]
const cookies=new Cookies()
function SimpleChart() {
  const dispatch=useDispatch();
  const [graphdata,setgraphdata]=useState(day);
  const data=useSelector(state=>state.graphslice.data);
      const Day=()=>{
        cookies.set('switch','day')
        dispatch(Graph({label:cookies.get('switch') || "day"}))
           
      }
      const Month=()=>{
        cookies.set('switch','month')
        dispatch(Graph({label:cookies.get('switch') || "day"}))
      }
      const Yearly=()=>{
           cookies.set('switch','year')
        dispatch(Graph({label:cookies.get('switch') || "day"}))     
      }
      if(!cookies.get('switch')){
        cookies.set('switch','day');
      }
      useEffect(() => {
        dispatch(Graph({label:cookies.get('switch')}))
      },[])
    return (
    <>
      <HeaderNavbar/>
    <div className="main-container">
      <Btn Day={Day} Month={Month} Yearly={Yearly}/>
      <div className="graph-container">
        <ComposedChart width={730} className='graph-inner' height={250} data={data}>
        <XAxis  dataKey="day" />
        <YAxis />
        <Tooltip content={data} />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Bar dataKey="sale" barSize={20} fill="#413ea0" />
        </ComposedChart>
      </div>
    </div>
    </>)
}

export default SimpleChart;
