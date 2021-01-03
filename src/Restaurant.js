import React from 'react'

const Restaurant = (props) => {
    const {name, positivity, star_rating} = props.restaurant
    return (
        <>
            <h1>{name} // {positivity} % // Rating: {star_rating}</h1>
        </>
    );
}

export default Restaurant

