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
                            <Route component={Home} exact path="/" />
                            <Route component={MissKeepApp} exact path="/misskeep" />
                            <Route component={MisterEmail} exact path="/misteremail" />
                        </Switch>
                    </main>
            </Router>
        )
    }
}

