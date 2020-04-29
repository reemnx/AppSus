import MainMenu from './MainMenu.jsx'

export default class NavBar extends React.Component {


    render() {
       
        return (

            <nav className="home-nav relative flex space-between align-center container">
                <h2>AppSus</h2>
                <MainMenu></MainMenu>
            </nav >
        )
    }
}
