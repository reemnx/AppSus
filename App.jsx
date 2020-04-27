const Router = ReactRouterDOM.HashRouter
const { Route, Switch} = ReactRouterDOM
import Home from './pages/Home.jsx'
import MissKeepApp from './apps/MissKeep/cmps/MissKeepApp.jsx'
import MisterEmail from './apps/MisterEmail/cmps/MisterEmail.jsx'
export class App extends React.Component {

    render() {
        return (
            <Router>
                    <main>
                        <Switch>
                            <Route component={MissKeepApp} path="/misskeep" />
                            <Route component={MisterEmail} path="/misteremail/:label/:email" />
                            <Route component={MisterEmail} path="/misteremail/:label" />
                            <Route component={Home} path="/" />
                        </Switch>
                    </main>
            </Router>
        )
    }
}

