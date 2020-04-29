export default function ReviewList(props) {
    const { getReviews, onRemoveReview } = props
    let reviews = getReviews()
    function getStarsRate(val) {
        let stars = '';
        for (var i = 0; i < val; i++) {
            stars += '★';
        }
        return stars;
    }
    return (
        <div className="review-list">
            <h2>Reviews</h2>
            {reviews.map((review, idx) => {
                return <div key={idx} className="review">
                    <h3 className="review-name">By: {review.fullName} ({review.date})</h3>
                    <h3 className="review-rate">{getStarsRate(review.rate)}</h3>
                    <h4 className="review-text">{review.text}</h4>
                    <button className="review-remove" onClick={() => onRemoveReview(idx)}>Delete</button>
                </div>
            })}
        </div>
    )
}