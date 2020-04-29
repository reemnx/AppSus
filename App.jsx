const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
const history = History.createBrowserHistory();;
import Home from './pages/Home.jsx'
import MissKeepApp from './apps/MissKeep/cmps/MissKeepApp.jsx'
import EmailApp from './apps/MisterEmail/cmps/EmailApp.jsx'
import MissBooks from './apps/MissBooks/MissBooks.jsx'


export class App extends React.Component {

    render() {
        return (
            <Router history={history}>
                <main className="app-main">
                    <Switch>
                        <Route component={EmailApp} path="/email/label/:label" />
                        <Route component={EmailApp} path="/email" />
                        <Route component={MissKeepApp} path="/misskeep" />
                        <Route component={MissBooks} path="/missbooks" />

                        <Route component={Home} path="/" />
                    </Switch>
                </main>
            </Router>
        )
    }
}

