let now;
const textAreas = document.querySelectorAll('textarea');
const cancelBtn = document.querySelector('.cancel');
let dataArr = [];
let count = 0;
let today;

let functions = {
  list : () => {
    // localStorage.clear();
    // console.log(localStorage);
    
    functions.getDate();
    for (let i=0; i < localStorage.length; i++) {
      dataArr[i] = localStorage.getItem('memo' + i);
      functions.templates(dataArr[i]);
      count = i + 1;
    }

  },

  getDate : () => {
    const date = new Date();
    const year = date.toLocaleDateString('en-US', { year: "numeric" });
    const month = date.toLocaleDateString('en-US', { month: "2-digit" });
    const day = date.toLocaleDateString('en-US', { day: "2-digit" });
    today = String(year) + String(month) + String(day);
  },
  
  save : (e) => {
    if ( textAreas[0].value !== '' ) {
      dataArr[count] = { 'key' : 'memo' + (count) , 'text' : textAreas[0].value, 'date' : today}
      count ++;
      functions.templates(textAreas[0].value, today);
      functions.empty();

      dataArr.forEach((el, idx)=>{
        localStorage.setItem('data', el);
      });

    }else {
      alert('빈칸');
      return false;
    }
  },

  empty : () => {
    textAreas[0].value = '';
    cancelBtn.classList.remove('show');
  },

  cancel : (e) => {
    functions.empty();
    functions.change(e);
  },

  change : (e) => {
    e.target.value !== '' ? cancelBtn.classList.add('show') : cancelBtn.classList.remove('show');
  },

  templates : (el, num) => {
    document.querySelector('.wrapper').insertAdjacentHTML('beforeEnd',
    `<div class="content">
      <textarea placeholder="메모" oninput="textChange(event);" onfocus="onFocus(event);">${el}</textarea>
          
      <footer>
        <div class="date">${num}</div>

        <div class="btns">
          <button class="edit" onclick="editMemo(event);" disabled="disabled">수정</button>
          <button class="delete" onclick="remove(event);">삭제</button>
        </div>
      </footer>
    </div>`)
  }
}

functions.list();
document.scr = functions;