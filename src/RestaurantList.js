import React, {useState, useEffect} from 'react'
import Restaurant from './Restaurant'

const RestaurantList = (props) => {

    const [restaurants, setRestaurants] = useState([]);
    const getRestaurants = async () =>{
        const url = `/api/restaurants?id=${props.queryID}`
        const response = await fetch(url);
        const cuisines = await response.json();
        setRestaurants(cuisines);
    }
    useEffect(()=>{
        getRestaurants();
    }, [])

    return (
        <>
            <h1>Getting Restaurants... for {props.name}</h1>
            <ol>
                {restaurants.map((res)=>{
                    return <li key={res.id}><Restaurant restaurant={res}></Restaurant></li>
                })}
            </ol>
        </>
    );
}

export default RestaurantList
