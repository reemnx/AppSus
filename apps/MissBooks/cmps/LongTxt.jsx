export default class LongTxt extends React.Component {
    
    currDescription() {
        if (this.props.text.length <= 100) return <span>{this.props.text}</span>;
        else if (!this.props.isLongTxtShown) return <span>{this.props.text.substring(0, 99)}...<button className="expand-text-btn" onClick={() => this.props.toggleDescription()}>show more</button></span>;
        else return <span>{this.props.text}<button className="expand-text-btn" onClick={() => this.props.toggleDescription()}> show less</button></span>
    }

    render() {
        return (
            <h4>{this.currDescription()}</h4>
        )
    }
}