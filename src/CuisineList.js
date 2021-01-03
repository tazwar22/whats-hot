import React, {useState, useEffect} from 'react'
import RestaurantList from './RestaurantList'

const CuisineList = () => {
    const [data, setData] = useState([]);

    const getCusines = async () =>{
        const response = await fetch('/api/cuisines');
        const cuisines = await response.json();
        setData(cuisines);
    }
    useEffect(()=>{
        getCusines();
    }, [])
    

    //Flag to say whether or not a Cusine has been selected
    const [isSelected, setIsSelected] = useState(false);
    //Cusine ID to query
    const [cusID, setCusID] = useState(0);

    const handleClick = (id) =>{
        setCusID(id);
        setIsSelected(true);
    }

    return (
        <>
            {!isSelected ? (
                <div>
                    <h1>Cuisines in Vancouver (BC)</h1>
                    <ul>
                    {data.map((cuisine)=>{
                        const {id, name} = cuisine;
                        return <li key={id}>
                                    <a href="#" onClick={()=>handleClick(id)}>{name}</a>
                                </li>
                    })}
                    </ul>  
                </div>
            )
            :(
                <>
                    <RestaurantList queryID={cusID}></RestaurantList>
                    <button type="button" onClick={()=>setIsSelected(false)}>Search again</button>
                </>
            )}
             
        </>
    );
}

export default CuisineList
