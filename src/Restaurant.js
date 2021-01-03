import React, {useState} from 'react'
import './App.css';

const Restaurant = (props) => {
    const {name, positivity, reviews} = props.restaurant
    const [showReviews, setShowReviews] = useState(false)

    const clickHandler = () =>{
        setShowReviews(!showReviews);
    }

    if (showReviews){
            return (
            <>
                <ul className="restaurant">
                    <li>Name: {name}</li>
                    <li>Positivity Score: {positivity}</li>
                    <button type="button" onClick={()=>clickHandler()}> Hide User Reviews</button>
                    <ul>
                        {reviews.map((rev, ii)=>{
                        return <li key={ii}>{rev}</li>
                        })}
                    </ul>
                </ul>
                <hr></hr>
            </>
        );
    } else {
         return (
        <>
            <ul className="restaurant">
                <li>Name: {name}</li>
                <li>Positivity Score: {positivity}</li>
                <button type="button" onClick={()=>clickHandler()}> Show User Reviews</button>
            </ul>
            <hr></hr>
        </>
        );
    }

   
}

export default Restaurant

