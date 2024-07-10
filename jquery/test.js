let count = 0;

function resetStorage(e){
    localStorage.clear();
    location.reload();
}

if (localStorage.length > 0) {
    for(let i = 0; localStorage.length > i; i++) {
        let getData = JSON.stringify(localStorage.key((i)));
        let getKey = getData.slice(1, length-1);
        let getText = JSON.stringify(localStorage.getItem(getKey)).slice(1, length-1);
        
        const sendData = { key: getKey, text: getText };
        write(sendData)
    }

}

function write(e){
    $('.content:first-child').after(
        `
            <div class="content" data-tab=${e.key}>
                <textarea placeholder="메모">${e.text}</textarea>
                
                <div class="btns">
                    <button class="edit" onclick="edit(event);">수정</button>
                    <button class="delete" onclick="remove(event);">삭제</button>
                </div>
            </div>
        `
    );
};

function reset(e){ $(e.target).parent().siblings().val(""); }

function save(e){
    let text = $(e.target).parent().siblings().val();
    let key = text;
    const sendData = { key: key, text: text }
    
    write(sendData);
    JSON.stringify(localStorage.setItem(key, text));
    reset(e);
}

function edit(e){
    let getData = $(e.target).parents('.content').attr('data-tab');
    let getText = $(e.target).parent().siblings().val();
    JSON.stringify(localStorage.setItem(getData, getText));
}

function remove(e){
    let getData = $(e.target).parents('.content').attr('data-tab');
    localStorage.removeItem(getData);
    location.reload();
}