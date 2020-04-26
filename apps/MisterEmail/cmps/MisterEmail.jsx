import MainMenu from '../../../cmps/MainMenu.jsx';
import EmailApp from './EmailApp.jsx';

export default class MisterEmail extends React.Component {
    render() {
        return (
            <React.Fragment>
                <header className="e-header">
                    <div className="e-nav-container flex space-between align-center">
                        <h2 className="e-logo">MisterEmail</h2>
                        <MainMenu></MainMenu>
                    </div>
                </header>
                <main>
                    <EmailApp />
                </main>
            </React.Fragment>
        )
    }
}