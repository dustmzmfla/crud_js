const memoArr = [];

if ( localStorage.length > 0) {
    for(let i=0; localStorage.length > i; i++) {
        const memoData = JSON.parse(localStorage.getItem('data' + (i + 1)));
        memoArr.push(memoData);
    }
    memoArr.forEach((e)=>{
        write(e);
    });
}

function resetStorage(e){
    localStorage.clear(e);
}

function reset(e) { $(e.target).parent().siblings().val(''); };

function write(e){
    $('.content:first-child').after(
        `
            <div class="content" data-tab="data` + e.keyVal + `">
                <textarea placeholder="메모">` + e.text + `</textarea>
                
                <div class="btns">
                    <button class="edit" onclick="edit(event);">수정</button>
                    <button class="delete" onclick="contentDelete(event);">삭제</button>
                </div>
            </div>
        `
    );
};

function contentDelete(e){
    const dataKey = ($(e.target).parents('.content').attr('data-tab'));
    $(e.target).parents('.content').remove();
    localStorage.removeItem(dataKey);
}

function save(e){
    const text = $(e.target).parent().siblings().val();

    if (text == null || text == "" || text == undefined) {
        alert('빈칸');
        return false;
    }else {
        let dataLength = localStorage.length + 1;
        const send = { text: text, keyVal: dataLength }
        memoArr.push(send);
        localStorage.setItem('data' + dataLength , JSON.stringify(send));
        write(send);
        reset(e);
    }
}