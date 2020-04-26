import { eventBus } from '../../../services/eventBusService.js'


export default class UserMsg extends React.Component {
    state = { msg: null }

    componentDidMount() {
        this.unsubscribeFromEventBus = eventBus.on('show-msg', (data) => {
            this.setState({ msg: data })
            setTimeout(() => {
                this.setState({ msg: null })
            }, 3000)
        })
    }
    componentWillUnmount() {
        // Note: for demo purpose, 
        // this will never happen, as the UserMsg is always there
        this.unsubscribeFromEventBus();
    }
    render() {
        const { msg } = this.state

        return (!msg) ? <React.Fragment></React.Fragment> : 
        <section className="MK-user-msg">
            <h4>{msg}</h4>
        </section>
    }
}