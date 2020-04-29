import BookAddedModal from './BookAddedModal.jsx'
const { NavLink } = ReactRouterDOM

export default function NavBar(props) {
    function toggleMenu() {
        const menu = document.querySelector('.nav-container ul');
        menu.classList.toggle('toggle-menu');
        }

        return (
        <React.Fragment>
                <img className="menu-bar-btn" onClick={() => toggleMenu()} />
                <nav className="nav-container">
                    <ul >
                        <li><NavLink activeClassName="nav-btn-active" onClick={() => toggleMenu()} exact to="/missbooks/welcome">Home</NavLink></li>
                        <li><NavLink activeClassName="nav-btn-active" onClick={() => toggleMenu()} to="/missbooks/books">Books</NavLink></li>
                        <li><NavLink activeClassName="nav-btn-active" onClick={() => toggleMenu()} to="/missbooks/about">About</NavLink></li>
                        <li><NavLink activeClassName="nav-btn-active" onClick={() => toggleMenu()} to="/email">Email</NavLink></li>
                        <li><NavLink activeClassName="nav-btn-active" onClick={() => toggleMenu()} to="/misskeep">Keeps</NavLink></li>
                    </ul>
                </nav>
                    <BookAddedModal />
                <img className="back-btn" onClick={() => {
                    props.history.goBack();
                }}></img>
            </React.Fragment>
    )
}