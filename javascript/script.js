// const memoArr = [];

// if (localStorage.length > 0) {
//     for(let i = 0; localStorage.length > i; i++) {
//         let getData = JSON.stringify(localStorage.key((i)));
//         let getKey = getData.slice(1, length-1);
//         let getText = JSON.stringify(localStorage.getItem(getKey)).slice(1, length-1);

//         const sendData = { key: getKey, text: getText };
//         memoArr.push(sendData);
//     }
// }

// function organize(){
//     memoArr.sort((a, b) => a.key - b.key);

//     memoArr.forEach((e)=>{
//         const sendData = { key: e.key, text: e.text };
//         write(sendData);
//     })
// }
// organize();

// function write(e){
//     $('.wrapper').append(
//         `
//             <div class="content" data-tab=${e.key}>
//                 <textarea placeholder="메모">${e.text}</textarea>
                
//                 <div class="btns">
//                     <button class="edit" onclick="edit(event);">수정</button>
//                     <button class="delete" onclick="remove(event);">삭제</button>
//                 </div>
//             </div>
//         `
//     );
// };

// function reset(e){ $(e.target).parent().siblings().val(""); }

// function save(e){
//     let newDate = new Date();
//     let year = String(newDate.getFullYear());
//     let month = String(newDate.getMonth() + 1);
//     let date = String(newDate.getDate());
//     let time = String(newDate.getHours());
//     let min = String(newDate.getMinutes());
//     let sec = String(newDate.getSeconds());

//     let totalDate = parseInt(year + month + date + time + min + sec);
    
//     let text = $(e.target).parent().siblings().val();
//     let key = totalDate
//     const sendData = { key: totalDate, text: text }

//     memoArr.push(sendData);
    
//     write(sendData);
//     JSON.stringify(localStorage.setItem(key, text));
//     reset(e);
//     location.reload();
// }

// function edit(e){
//     let getData = $(e.target).parents('.content').attr('data-tab');
//     let getText = $(e.target).parent().siblings().val();
//     JSON.stringify(localStorage.setItem(getData, getText));
//     location.reload();
// }

// function remove(e){
//     let getData = $(e.target).parents('.content').attr('data-tab');
//     localStorage.removeItem(getData);
//     location.reload();
// }

document.querySelector('.save').addEventListener('click',function(){
    let memo = this.parentNode.previousSibling.previousSibling.value;
    let newDate = new Date();
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let date = newDate.getDate();

    let format = year + "-" + (("00" + month.toString()).slice(-2)) + "-" + (("00" + date.toString()).slice(-2));
    
    if (memo == '' || memo == null || memo == undefined) {
        alert('빈칸');
        return false;
    }else {
        document.querySelector('.wrapper').insertAdjacentHTML('beforeend',
            `<div class="content">
                <textarea placeholder="메모">${memo}</textarea>
                
                <footer>
                <div class="date">${format}</div>

                <div class="btns">
                    <button class="edit" onclick="edit(event);">수정</button>
                    <button class="delete" onclick="remove(event);">삭제</button>
                </div>
                </footer>
            </div>`
        );
    }
});