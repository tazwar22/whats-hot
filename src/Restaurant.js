import React from 'react'

const Restaurant = (props) => {
    const {name, positivity, star_rating, reviews} = props.restaurant
    return (
        <>
            <ul>
                <li>Name: {name}</li>
                <li>Positivity Score: {positivity}</li>
                <li>Star Rating: {star_rating}</li>
                <ul>
                    {reviews.map((rev, ii)=>{
                    return <li key={ii}>{rev}</li>
                    })}
                </ul>
            </ul>
            <hr></hr>
        </>
    );
}

export default Restaurant

