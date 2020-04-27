export default{
    getId
}

function getId() {
    let key = '';
    for (let i = 0; i < 10; i++) {
        key += String.fromCharCode(getRandomInt(65, 91));
    }
    return key;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }