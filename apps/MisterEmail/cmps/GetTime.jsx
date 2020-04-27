export default function GetTme(props) {

    function timeToReturn() {
        const unConvertedTime = props.sentAt;
        if (moment(unConvertedTime).format('ll') === moment(Date.now()).format('ll')) return moment(unConvertedTime).format('LT');
        else return moment(unConvertedTime).format('ll');
    }

    return timeToReturn();
    
}