import React, {useState} from 'react'
import './App.css';

const Restaurant = (props) => {
    const {name, positivity, reviews, img_url} = props.restaurant
    const ord = props.num;
    const [showReviews, setShowReviews] = useState(false)

    const clickHandler = () =>{
        setShowReviews(!showReviews);
    }

    if (showReviews){
            return (
            <>
                <div className="restaurant">
                    <ul className="resDetails">
                        <li>{ord}</li>
                        <li>{name}</li>
                        <li>Positivity Score: {positivity}</li>
                    </ul>
                    <img src={img_url} alt="Restaurant Image"/>
                    <div className="resReviews">
                        <button type="button" onClick={()=>clickHandler()}> Hide User Reviews</button>
                        <ul>
                            {reviews.map((rev, ii)=>{
                            return <li key={ii}>{rev}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </>
        );
    } else {
         return (
        <>
            <div className="restaurant">
               <ul className="resDetails">
                    <li>{ord}</li>
                    <li>{name}</li>
                    <li>Positivity Score: {positivity}</li>
                </ul>
                <img src={img_url} alt="Restaurant Image"/>
                <div className="resReviews">
                    <button type="button" onClick={()=>clickHandler()}> Hide User Reviews</button>
                </div>
            </div>
        </>
        );
    }

   
}

export default Restaurant

