import React, {useState} from 'react'


const CuisineList = () => {
    const cuisines = [
        {id:1, name:"Trending This Week"},
        {id:2, name:"Mealshare"},
        {id:3, name:"Weekend Brunches"},
        {id:4, name:"Tasty Tacos"},
        {id:5, name:"Heated patio"},
        {id:6, name:"Perfect Poutine"},
        {id:7, name:"Hidden Gems"},
    ];
    const [data, setData] = useState(cuisines);

    return (
        <>
            <ul>
                {data.map((cuisine)=>{
                    const {id, name} = cuisine;
                    return <li key={id}>
                                <a href="#">{name}</a>
                            </li>
                })}
            </ul>   
        </>
    );
}

export default CuisineList
