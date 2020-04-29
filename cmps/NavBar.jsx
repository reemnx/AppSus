import MainMenu from './MainMenu.jsx'

export default class NavBar extends React.Component {


    render() {
       
        return (

            <nav className="home-nav relative flex space-between align-center container">
                <img className="MK-logo"></img>
                <MainMenu></MainMenu>
            </nav >
        )
    }
}
