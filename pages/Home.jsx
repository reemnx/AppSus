import NavBar from '../cmps/NavBar.jsx';
const history = History.createBrowserHistory();;
export default class Home extends React.Component {

    render() {
        return (
            <React.Fragment>
                <header className="header-container flex justify-center align-center">
                    <NavBar history={history}></NavBar>
                </header>
                <h2>This is home</h2>
            </React.Fragment>
        )
    }
}