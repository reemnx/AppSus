import MainMenu from '../../../cmps/MainMenu.jsx';
import EmailApp from './EmailApp.jsx';

export default class MisterEmail extends React.Component {

    state = {
        search: ''
    }

    handleChange= ({ target }) => {
        this.setState({ search:  target.value });
    }

    render() {
        return (
            <React.Fragment>
                <header className="e-header">
                    <div className="e-nav-container flex space-between align-center">
                        <h2 className="e-logo">MisterEmail</h2>
                        <input className="e-Search-mails" placeholder="Search" onChange={this.handleChange} />
                        <MainMenu></MainMenu>
                    </div>
                </header>
                <main>
                    <EmailApp search={this.state.search} />
                </main>
            </React.Fragment>
        )
    }
}