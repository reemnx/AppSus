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
            <div className="flex row-reverse">
                <button onClick={this.onMenuToggle}>Icon</button>
                {isMenuShown && <div className="apps-container">
                    <NavLink exact to="/misskeep">K</NavLink>
                    <NavLink exact to="/email">E</NavLink>
                    <NavLink exact to="/missbook">B</NavLink>
                </div>}
            </div>
        )
    }
}

