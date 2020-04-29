export default class StarsRate extends React.Component {

    state = {
        starClass: ['star', 'star', 'star', 'star', 'star']
    }

    setRate(val) {
        let stars = this.state.starClass.slice();
        stars = stars.map((star, idx) => {
            if (idx < val) return star = 'star rated';
            else return star = 'star';
        })
        this.setState({ starClass: stars });
        this.props.updateRate(val);
    }

    render() {
        return (
            <div className="stars">
                <span name="rate" className={this.state.starClass[0]} onClick={() => { this.setRate(1) }}></span>
                <span name="rate" className={this.state.starClass[1]} onClick={() => { this.setRate(2) }}></span>
                <span name="rate" className={this.state.starClass[2]} onClick={() => { this.setRate(3) }}></span>
                <span name="rate" className={this.state.starClass[3]} onClick={() => { this.setRate(4) }}></span>
                <span name="rate" className={this.state.starClass[4]} onClick={() => { this.setRate(5) }}></span>
            </div>
        )
    }
}