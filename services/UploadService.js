export default{
    onImgInput
}

function onImgInput(ev) {
    loadImageFromInput(ev)
}
function loadImageFromInput(ev) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.src = event.target.result;
        return Promise.resolve(img.src)
    }
    reader.readAsDataURL(ev.target.files[0]);

}


