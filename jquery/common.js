function save(e){
    const text = $(e.target).parent().siblings().val();

    const textContent = `
        <div class="content">
            <textarea placeholder="메모">${text}</textarea>
            
            <div class="btns">
                <button class="delete" onclick="contentDelete(event);">삭제</button>
            </div>
        </div>
    `

    if ( text == null || text == undefined || text == '' ) {
        alert('fail');
        return false;
    }else {
        $('.wrapper').append(textContent);
    }
}

function contentDelete(e){
    $(e.target).parents('.content').remove();
}