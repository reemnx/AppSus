const Router = ReactRouterDOM.HashRouter
const { Route, Switch} = ReactRouterDOM
import Home from './pages/Home.jsx'
import MissKeepApp from './apps/MissKeep/cmps/MissKeepApp.jsx'
export class App extends React.Component {

    render() {
        return (
            <Router>
                    <main>
                        <Switch>
                            <Route component={Home} exact path="/" />
                            <Route component={MissKeepApp} exact path="/misskeep" />
                        </Switch>
                    </main>
            </Router>
        )
    }
}

