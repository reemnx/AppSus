import Welcome from './pages/Welcome.jsx'
import About from './pages/About.jsx'
import BookApp from './pages/BookApp.jsx'
import BookDetails from './pages/BookDetails.jsx'
import NavBar from './cmps/NavBar.jsx'


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
const history = History.createBrowserHistory()


export default class MissBooks extends React.Component {


    render() {
        return (
            <Router className="miss-books-app">
                <header className="b-header">
                    <h1>MissBooks</h1>
                    <NavBar history={history} />
                </header>
                <main className="b-main-container">
                    <div className="b-main">
                        <Switch>
                            <Route component={BookDetails} path="/missbooks/books/:theBookId" />
                            <Route component={BookApp} path="/missbooks/books" />
                            <Route component={About} path="/missbooks/about" />
                            <Route component={Welcome} path="/missbooks/welcome" />
                        </Switch>
                    </div>
                </main>
                <footer className="b-footer">
                    coffeerights 2020 &copy;
                </footer>
            </Router>
        )
    }
}

