import React from 'react'

const Restaurant = (props) => {
    const {name, positivity} = props.restaurant
    return (
        <>
            <h1>{name} // {positivity} %</h1>
        </>
    );
}

export default Restaurant

