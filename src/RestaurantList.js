import React, {useState} from 'react'
import Restaurant from './Restaurant'

const RestaurantList = (props) => {
     const data = [
        {id:13, name:"McDonalds", positivity:0.98},
        {id:27, name:"A & W", positivity:0.22},
        {id:67, name:"Five Guys", positivity:0.32},
        {id:4, name:"Romers", positivity:0.45},
        {id:5, name:"Finefoods", positivity:0.66},
        {id:6, name:"Hungry Burgers", positivity:0.88},
        {id:7, name:"Beetbox", positivity:0.72},
    ];
    const [restaurants, setRestaurants] = useState(data);

    return (
        <>
            <h1>Getting Restaurants... for {props.queryID}</h1>
            <ul>
                {restaurants.map((res)=>{
                    return <li key={res.id}><Restaurant restaurant={res}></Restaurant></li>
                })}
            </ul>
        </>
    );
}

export default RestaurantList
