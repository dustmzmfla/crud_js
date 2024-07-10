let memoData = '';

for (let i = 0; localStorage.length > i; i++) {
    const textData = JSON.parse(localStorage.getItem('data' + (i + 1))).text;
    const keyData = JSON.parse(localStorage.getItem('data' + (i + 1))).keyVal;
    const send = { text: textData, keyVal: keyData }

    write(send);
}

function resetStorage(e){
    localStorage.clear();
    location.reload();
}

function reset(e) { $(e.target).parent().siblings().val(''); };

function write(e){
    $('.content:first-child').after(
        `
            <div class="content" id="data` + e.keyVal + `">
                <textarea placeholder="메모">` + e.text + `</textarea>
                
                <div class="btns">
                    <button class="edit" onclick="edit(event);">수정</button>
                    <button class="delete" onclick="contentDelete(event);">삭제</button>
                </div>
            </div>
        `
    );
};


const memoArr = [];

function contentDelete(e){
    if ( $('.content').length == 2 ) {
        localStorage.clear();
    }

    let count = 0;
    
    const dataKey = $(e.target).parents('.content').attr('id');
    localStorage.removeItem(dataKey);
    $(e.target).parents('.content').remove();
    
    // for(let i=0; localStorage.length + 1 > i; i++) {
    //     let memoData = JSON.parse(localStorage.getItem('data' + (i + 1)));
    //     if ( memoData !== null) {
    //         const newArr = { text: memoData.text, keyVal: (i + 1) };
    //         memoArr.push(newArr);
    //     }
    // }
    
    // localStorage.clear();
    // memoArr.forEach((el)=>{
    //     count++;
    //     localStorage.setItem('data' + count, JSON.stringify(el));
    // });

    // location.reload();

    console.log(localStorage)
}

function edit(e){
    const text = $(e.target).parent().siblings().val();
    const dataKey = ($(e.target).parents('.content').attr('id'));
    let cut = parseInt(dataKey.replace('data', ""));
    const send = { text: text, keyVal: cut }
    localStorage.setItem(dataKey , JSON.stringify(send));
}

function save(e){
    const text = $(e.target).parent().siblings().val();

    if (text == null || text == "" || text == undefined) {
        alert('빈칸');
        return false;
    }else {
        let dataLength = localStorage.length + 1;
        const send = { text: text, keyVal: dataLength }
        localStorage.setItem('data' + dataLength , JSON.stringify(send));
        write(send);
        reset(e);
    }
}