export default class About extends React.Component {
    state = {
        word: ''
    }

    txtInterval = 0;
    str = 'This is About Page';
    txt = this.str.split('');
    txtIdx = 0;


    componentDidMount() {
        this.startInterval();
    }

    componentWillUnmount() {
        clearInterval(this.txtInterval)
    }


    startInterval() {
        this.txtInterval = setInterval(() => {
            this.changeTxt()
        }, 150)
    }


    changeTxt() {
        let totalTxt = this.state.word += this.txt[this.txtIdx];
        this.setState({ word: totalTxt })
        if (this.txtIdx < this.txt.length - 1) this.txtIdx++;
        else {
            clearInterval(this.txtInterval)
            setTimeout(() => {
                this.state.word = '';
                this.txtIdx = 0;
                this.startInterval();
            }, 1000)
        }
    }

    render() {
        return (
            <div className="about-page">
                <div />
                <h2>{this.state.word}</h2>
            </div>
        )
    }
}