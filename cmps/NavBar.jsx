import MainMenu from './MainMenu.jsx'

export default class NavBar extends React.Component {


    render() {
       
        return (

            <nav className="relative flex space-between align-center container">
                <div className="logo">LOGO</div>
                <MainMenu></MainMenu>
            </nav >
        )
    }
}
