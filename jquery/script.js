const memoArr = [];

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
        memoArr.push(sendData);
    }
}

function organize(){
    memoArr.sort((a, b) => a.key - b.key);

    memoArr.forEach((e)=>{
        const sendData = { key: e.key, text: e.text };
        write(sendData);
    })
}
organize();

// const testArr = [
//     { num: 1, text: 1},
//     { num: 3, text: 3},
//     { num: 2, text: 2},
//     { num: 5, text: 5}
// ];
// testArr.sort((a, b) => a.num - b.num );

// console.log(testArr)

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
    let newDate = new Date();
    let year = String(newDate.getFullYear());
    let month = String(newDate.getMonth() + 1);
    let date = String(newDate.getDate());
    let time = String(newDate.getHours());
    let min = String(newDate.getMinutes());
    let sec = String(newDate.getSeconds());

    let totalDate = parseInt(year + month + date + time + min + sec);
    
    let text = $(e.target).parent().siblings().val();
    let key = totalDate
    const sendData = { key: totalDate, text: text }

    memoArr.push(sendData);
    
    write(sendData);
    JSON.stringify(localStorage.setItem(key, text));
    reset(e);
    location.reload();
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