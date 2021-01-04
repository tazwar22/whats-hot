import React, {useState, useEffect} from 'react'
import RestaurantList from './RestaurantList'
import Loading from './Loading'

const CuisineList = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getCusines = async () =>{
        setIsLoading(true)
        const response = await fetch('/api/cuisines');
        const cuisines = await response.json();
        setData(cuisines);
        setIsLoading(false);
    }
    useEffect(()=>{
        getCusines();
    }, [])
    

    //Flag to say whether or not a Cusine has been selected
    const [isSelected, setIsSelected] = useState(false);
    //Cusine ID to query
    const [cusID, setCusID] = useState(0);
    //Cuisine Name being Queried
    const [cusName, setCusName] = useState("");

    const handleClick = (id, name) =>{
        setCusID(id);
        setIsSelected(true);
        setCusName(name);
    }

    if (isLoading){
        return <Loading></Loading>
    } else if (!isSelected){
        return (
            <div>
                <h1>Cuisines in Vancouver (BC)</h1>
                <ul  className="cuisinesList">
                {data.map((cuisine)=>{
                    const {id, name, image_url, description} = cuisine;
                    return <li key={id}>
                                <a href="#" onClick={()=>handleClick(id, name)}>{name}</a>
                                <img src={image_url} alt="Food"></img>
                                <h4>{description}</h4>
                            </li>
                })}
                </ul>  
            </div>
        );
    } else {
        return (
            <>
                <RestaurantList queryID={cusID} name={cusName}></RestaurantList>
                <button type="button" onClick={()=>setIsSelected(false)}>Search again</button>
            </>
        );
    }
}

export default CuisineList
