import React, {useState} from 'react'


const CuisineList = () => {
    const cuisines = [
        {id:123, name:"Trending This Week"},
        {id:277, name:"Mealshare"},
        {id:367, name:"Weekend Brunches"},
        {id:444, name:"Tasty Tacos"},
        {id:5, name:"Heated patio"},
        {id:6, name:"Perfect Poutine"},
        {id:7, name:"Hidden Gems"},
    ];
    const [data, setData] = useState(cuisines);

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
                <ul>
                {data.map((cuisine)=>{
                    const {id, name} = cuisine;
                    return <li key={id}>
                                <a href="#" onClick={()=>handleClick(id)}>{name}</a>
                            </li>
                })}
                </ul>  
            )
            :(
                <h1>Getting Restaurants... for {cusID}</h1>
            )}
             
        </>
    );
}

export default CuisineList
