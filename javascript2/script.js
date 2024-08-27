let now;
const textAreas = document.querySelectorAll('textarea');
const cancelBtn = document.querySelector('.cancel');
let dataArr = [];
let count = 0;

const date = new Date();
const padStr = (value) => value < 10 ? '0' + value : value;
const padStr2 = (value) => value.toString().padStart(2, '0');

const getNow = (format = '-') => {
	return [
    date.getFullYear(),
    padStr(date.getMonth()),
    padStr2(date.getDate())
  ].join(format);
}

const date1 = getNow();

let functions = {
  list : () => {
    // localStorage.clear();
    // console.log(localStorage);

    functions.getDate();
  },

  getDate : () => {
    const date = new Date();
    const padStr = (value) => value < 10 ? '0' + value : value;
  },
  
  save : (e) => {
    if ( textAreas[0].value !== '' ) {
      dataArr[count] = textAreas[0].value;
      count ++;
      functions.templates(textAreas[0].value, count);
      functions.empty();
      // localStorage.clear();

      dataArr.forEach((el, idx)=>{
        localStorage.setItem('memo' + idx, el);
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