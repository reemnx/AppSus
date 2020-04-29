export default class EmailFilter extends React.Component {
    state = {
        toggleClass: 'e-toggle-off',
    }

    readToggle() {
        this.setState(prevState => ({ toggleClass: prevState.toggleClass === 'e-toggle-off' ? 'e-toggle-on' : 'e-toggle-off' }));
        this.props.onlyUnreadToggle();
    }

    onSortBy({target}){
        this.props.onSortBy(target.value)   
    }

    render() {
        return (
            <div className="e-toggle-filter-container flex space-between align-center">
                <select className="e-sory-by-select" onChange={(event) => this.onSortBy(event)}>
                    <option value='sentAt'>Date</option>
                    <option value='subject'>Title</option>
                </select>
                <div className="flex align-center">
                    <h5>Unread only</h5>
                    <div className={`${this.state.toggleClass} e-toggle-filter`} onClick={() => this.readToggle()}>
                        <div className="e-filter-by-read no-select">⚪</div>
                    </div>
                </div>
            </div>
        )
    }
}