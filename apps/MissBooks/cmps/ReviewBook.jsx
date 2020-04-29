import StarsRate from './StarsRate.jsx'
import ReviewList from './ReviewList.jsx'


export default class ReviewBook extends React.Component {

    state = {
        reviewList: null,
        review: {
            fullName: null,
            rate: null,
            date: null,
            text: null
        },
    }

    componentDidMount() {
        this.onLoadReviews();
        this.getDate();
    }

    onLoadReviews(event) {
        if (event) event.preventDefault();
        this.props.loadReviews()
            .then(res => {
                this.setState({ reviewList: res })
            })
    }

    getReviews = () => {
        return this.state.reviewList;
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState(prevState => ({ review: { ...prevState.review, [field]: value } }))
    }

    updateRate = (val) => {
        this.setState(prevState => ({ review: { ...prevState.review, rate: val } }));
    }

    getDate() {
        let d = new Date();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;
        let date = d.getFullYear() + '-' + mm + '-' + dd;
        this.state.review.date = date;
    }

    onRemoveReview = (reviewId) => {
        this.props.removeCurrReview(reviewId)
        this.onLoadReviews()
    }

    render() {
        return (
            <div className="reviews-container">
                <button className="close-review-btn" onClick={this.props.toggleReview}>X</button>
                <h2>Add a review:</h2>
                <form onSubmit={() => { this.props.onSaveReview(this.state.review, event); this.onLoadReviews(event) }}>

                    <input className="add-review-name" type="text" placeholder="Name" name="fullName" onChange={this.handleChange} />
                    <StarsRate className="add-review-rate" updateRate={this.updateRate} />

                    <input className="add-review-date" type="date" name="date" onChange={this.handleChange} />

                    <textarea className="input-text-review" placeholder="Write your review here" type="text" name="text" onChange={this.handleChange} />
                    <button className="add-review-btn">Add review</button>
                </form>

                {this.state.reviewList && (this.state.reviewList.length > 0) && <ReviewList getReviews={this.getReviews} onRemoveReview={this.onRemoveReview} />}
            </div>
        )
    }
}
