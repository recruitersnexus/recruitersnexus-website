"use client"
import React from 'react';
import FeedbackData from '@/lib/db/feedbackData';
import useUserData from '@/lib/db/userData';

const RatingUser = ({ id }: any) => {
    const { userData } = useUserData();
    const { feedback } = FeedbackData();
    const filteredFeedback = feedback?.filter((item: any) => item?.user_id === id && item?.user_rating != null);

    //console.log("Feedback Filtered On Rating Comp: ", filteredFeedback);

    // Calculate average total_rating
    const totalRatings = filteredFeedback.map((item: any) => parseFloat(item.user_rating));
    const averageRating = totalRatings.length > 0 ? totalRatings.reduce((a, b) => a + b) / totalRatings.length : 0;

    //console.log("Total Rating User: ", totalRatings);
    //console.log("Type of totalRatings User: ", typeof totalRatings.at(0));

    // Calculate the number of full stars and half star
    //console.log("Type of Average Rating: ", typeof averageRating);
    //console.log("Average Rating: ", averageRating);

    let fullStars = Math.floor(averageRating); // Get the integer part
    const decimalPart = averageRating - fullStars; // Get the decimal part
    //console.log("Decimal Part: ", decimalPart.toPrecision(2));

    let halfStar = 0;
    if (decimalPart >= 0.25 && decimalPart < 0.75) {
        halfStar = 1;
    } else if (decimalPart >= 0.75) {
        halfStar = 1;
        fullStars++; // Increment full stars if the decimal part is more than or equal to 0.75
    }

    //console.log("Full Stars: ", fullStars);
    //console.log("Half Star: ", halfStar);

    // Create an array of stars based on fullStars and halfStar
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        if (i === fullStars - 1 && halfStar === 1) {
            // Include half star in the last full star
            stars.push(<span key={i} style={{ color: 'goldenrod', fontSize: '24px' }}>&#9733;&#9734;</span>);
        } else {
            stars.push(<span key={i} style={{ color: 'goldenrod', fontSize: '24px' }}>&#9733;</span>); // Full golden star
        }
    }

    // Fill remaining stars with empty stars
    const remainingStars = 5 - (fullStars + halfStar);
    for (let i = 0; i < remainingStars; i++) {
        stars.push(<span key={fullStars + halfStar + i} style={{ color: 'goldenrod', fontSize: '24px' }}>&#9734;</span>); // Empty star
    }

    return (
        <div>
            <div>
                {stars.map((star, index) => (
                    <span key={index}>
                        {star}
                    </span>
                ))}
            </div>
            <div>{`Average Rating: ${averageRating.toFixed(1)}`}</div>
        </div>
    );
};

export default RatingUser;

