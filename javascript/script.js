const memoArr = JSON.parse(localStorage.getItem('memo')) || [];

let newDate = new Date();
let year = newDate.getFullYear();
let month = newDate.getMonth() + 1;
let date = newDate.getDate();
let format = year + "-" + (("00" + month.toString()).slice(-2)) + "-" + (("00" + date.toString()).slice(-2));

if ( memoArr.length > 0 ) {
    memoArr.forEach((i) => {
        document.querySelector('.wrapper').insertAdjacentHTML('beforeend',
            `<div class="content">
                <textarea placeholder="메모" oninput="textChange(event);" onfocus="onFocus(event);">${i.memo}</textarea>
                
                <footer>
                <div class="date">${i.format}</div>

                <div class="btns">
                    <button class="edit" onclick="editMemo(event);" disabled="disabled">수정</button>
                    <button class="delete" onclick="remove(event);">삭제</button>
                </div>
                </footer>
            </div>`
        );
    });
}

document.querySelector('.cancle').addEventListener('click', function(){
    this.parentNode.parentNode.previousSibling.previousSibling.value = '';
});


let previousMemo = '';
let nextMemo = '';

function remove(e){
    const alarm = confirm('삭제하시겠습니까?');
    if (alarm) {
        previousMemo = e.target.parentNode.parentNode.previousElementSibling.value;
    
        for ( let i = 0; memoArr.length > i; i++ ) {
            if ( memoArr[i].memo == previousMemo ) {
                memoArr.splice(i, 1);
            }
        }
    
        localStorage.clear();
        localStorage.setItem('memo', JSON.stringify(memoArr));

        location.reload();
    }else {
        return false;
    }
}

function textChange(e){
    nextMemo = e.target.value;
    
    if ( previousMemo !== nextMemo ) {
        e.target.nextElementSibling.children[1].children[0].disabled = false;
    }else {
        e.target.nextElementSibling.children[1].children[0].disabled = true;
    }
}

function editMemo(e){
    nextMemo = e.target.parentNode.parentNode.previousElementSibling.value;
    if ( previousMemo !== nextMemo ) {
        memo = nextMemo;

        for ( let i = 0; memoArr.length > i; i++ ) {
            if ( memoArr[i].memo == previousMemo ) {
                memoArr.splice(i, 1, {memo, format});
            }
        }

        localStorage.clear();
        localStorage.setItem('memo', JSON.stringify(memoArr));
    }else {
        return false;
    }
    e.target.disabled = true;
}

function onFocus(e){
    previousMemo = e.target.value;
}

document.querySelector('.save').addEventListener('click',function(){
    let memo = this.parentNode.parentNode.previousSibling.previousSibling.value;
    
    if (memo == '' || memo == null || memo == undefined) {
        alert('빈칸');
        return false;
    }else {
        document.querySelector('.wrapper').insertAdjacentHTML('beforeend',
            `<div class="content">
                <textarea placeholder="메모" oninput="textChange(event);" onfocus="onFocus(event);">${memo}</textarea>
                
                <footer>
                    <div class="date">${format}</div>

                    <div class="btns">
                        <button class="edit" onclick="editMemo(event);" disabled="disabled">수정</button>
                        <button class="delete" onclick="remove(event);">삭제</button>
                    </div>
                </footer>
            </div>`
        );

        this.parentNode.parentNode.previousSibling.previousSibling.value = '';
        
        memoArr.push({memo, format});
        console.log(memoArr);
        localStorage.setItem('memo', JSON.stringify(memoArr));
    }
});
