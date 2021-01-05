import React, {useState} from 'react'
import './App.css';

const Restaurant = (props) => {
    const {name, positivity, reviews, img_url} = props.restaurant
    const [showReviews, setShowReviews] = useState(false)

    const clickHandler = () =>{
        setShowReviews(!showReviews);
    }

    if (showReviews){
            return (
            <>
                <ul className="restaurant">
                    <div className="resDetails">
                        <li>Name: {name}</li>
                        <li>Positivity Score: {positivity}</li>
                        <img src={img_url} alt="Restaurant"/>
                    </div>
                    <div className="resReviews">
                        <button type="button" onClick={()=>clickHandler()}> Hide User Reviews</button>
                        <ul>
                            {reviews.map((rev, ii)=>{
                            return <li key={ii}>{rev}</li>
                            })}
                        </ul>
                    </div>
                </ul>
                <hr></hr>
            </>
        );
    } else {
         return (
        <>
            <ul className="restaurant">
               <div className="resDetails">
                    <li>Name: {name}</li>
                    <li>Positivity Score: {positivity}</li>
                    <img src={img_url} alt="Restaurant"/>
                </div>
                <div className="resReviews">
                    <button type="button" onClick={()=>clickHandler()}> Hide User Reviews</button>
                </div>
            </ul>
            <hr></hr>
        </>
        );
    }

   
}

export default Restaurant

