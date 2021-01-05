import React, {useState, useEffect} from 'react'
import Restaurant from './Restaurant'
import Loading from './Loading'

const RestaurantList = (props) => {

    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getRestaurants = async () =>{
        setIsLoading(true);
        const url = `/api/restaurants?id=${props.queryID}`
        const response = await fetch(url);
        const cuisines = await response.json();
        setRestaurants(cuisines);
        setIsLoading(false);
    }
    useEffect(()=>{
        getRestaurants();
    }, [])

    if (isLoading){
        return <Loading></Loading>
    }else{
        return (
                <>
                    <h1 className="resListHeader">{props.name}</h1>
                    <ol className="restaurantsList" style={{listStyle: "none"}}>
                        {restaurants.map((res, ii)=>{
                            return <li key={res.id} style={{borderBottom: "0px solid #080708"}}><Restaurant restaurant={res} num={ii+1}></Restaurant></li>
                        })}
                    </ol>
                </>
        );
    }
}

export default RestaurantList
