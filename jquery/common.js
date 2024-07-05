
function save(e){
    const text = $(e.target).parent().siblings().val();

    if ( text == null || text == undefined || text == '' ) {
        alert('fail');
        return false;
    }else {
        console.log('asd');
    }
}