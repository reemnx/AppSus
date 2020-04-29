import NavBar from '../cmps/NavBar.jsx';

export default class Home extends React.Component {

    render() {
        return (
            <React.Fragment>
                <header className="header-container flex justify-center align-center">
                    <NavBar></NavBar>
                </header>
                <section></section>
            </React.Fragment>
        )
    }
}