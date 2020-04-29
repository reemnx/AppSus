export default class BookFilter extends React.Component {
    state = {
        filter: {
            title: '',
            maxPrice: '',
            minPrice: ''
        }
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? +target.value : target.value

        this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filter)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filter)
    }

    render() {
        const { title: title, maxPrice, minPrice } = this.state.filter
        return (
            <React.Fragment>
                {/* <h1 className="search-title">Filter:</h1> */}
                <form className="filter-container" onSubmit={this.onFilter}>
                    <input type="text" name="title" placeholder="Name" value={title} onChange={this.handleChange} />
                    <input type="number" name="minPrice" placeholder="Min price" value={minPrice} onChange={this.handleChange} />
                    <input type="number" name="maxPrice" placeholder="Max price" value={maxPrice} onChange={this.handleChange} />
                </form>
            </React.Fragment>
        )
    }
}