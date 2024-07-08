console.log(localStorage);

// localStorage.clear();

if ( localStorage.length > 0 ) {
    for(let i=0; localStorage.length > i; i++){
        const memo = localStorage.getItem('item' + (i + 1));
        write(memo);
    }
}

function write(e){
    $('.content:first-child').after(
    `
        <div class="content" data-tab=item` + e + `>
            <textarea placeholder="메모">` + e + `</textarea>
            
            <div class="btns">
                <button class="edit" onclick="edit(event);">수정</button>
                <button class="delete" onclick="contentDelete(event);">삭제</button>
            </div>
        </div>
    `
    );
}

function save(e){
    const text = $(e.target).parent().siblings().val();
    let keyLength = $('.content').length;

    if ( text == null || text == undefined || text == '' ) {
        alert('fail');
        return false;
    }else {
        reset(e);
        localStorage.setItem("item" + keyLength , text);
        write(text);
        console.log(localStorage);
    }
}

function reset(e) {
    $(e.target).parent().siblings().val('');
}

function contentDelete(e){
    const dataKey = $(e.target).parents('.content').attr('data-tab');
    localStorage.removeItem(dataKey);
    $(e.target).parents('.content').remove();
}