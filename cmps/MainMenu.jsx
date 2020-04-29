const { NavLink } = ReactRouterDOM;


export default class MainMenu extends React.Component {

    state = {
        isMenuShown: false
    }

    onMenuToggle = () => {
        this.setState(prevState => ({ isMenuShown: !prevState.isMenuShown }))
    }

    render() {

        const { isMenuShown } = this.state

        return (
            <div className="flex relative row-reverse">
                <img className="MK-menu" onClick={this.onMenuToggle} />
                {isMenuShown && <div className="apps-container flex space-between align-center">
                    <NavLink exact to="/misskeep"><img className="MK-logo" /></NavLink>
                    <NavLink exact to="/email"><img className="MK-Gmail" /></NavLink>
                    <NavLink exact to="/missbooks/welcome"><img className="MK-books" /></NavLink>
                </div>}
            </div>
        )
    }
}

