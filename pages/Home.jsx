import NavBar from '../cmps/NavBar.jsx';
const { Link } = ReactRouterDOM;

export default class Home extends React.Component {

    render() {
        return (
            <React.Fragment>
                <header className="header-container flex justify-center align-center">
                    <NavBar></NavBar>
                </header>
                <section className="home-main-section flex justify-center align-center">
                   <Link to="/email"> <div className="flex justify-center align-center"><img className="home-gmail" /> </div></Link>
                   <Link to="/misskeep">  <div className="flex justify-center align-center"><img className="home-keep" /> </div></Link>
                   <Link to="/missbooks"> <div className="flex justify-center align-center"><img className="home-books" /> </div></Link>
                    
                </section>
            </React.Fragment>
        )
    }
}

