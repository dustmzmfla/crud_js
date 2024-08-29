
const textArea = document.querySelector('#mainText');
const cancelBtn = document.querySelector('.cancel');
let dataArr = [];
let today;
let changeDate;
let addContents;
let count = 0;
let datas;

let functions = {
  list : () => {
    // localStorage.clear();
    if ( localStorage.length > 0 ) {
      datas = JSON.parse(localStorage.getItem('data'));
      functions.template(datas);
      count = Number(datas[0].key.split('memo')[1]) + 1;
    }
  },

  getDate : () => {
    const date = new Date();
    const year = date.toLocaleDateString('en-US', { year: "numeric" });
    const month = date.toLocaleDateString('en-US', { month: "2-digit" });
    const day = date.toLocaleDateString('en-US', { day: "2-digit" });
    today = String(year) + String(month) + String(day);
  },
  
  save : () => {
    functions.getDate();

    if ( textArea.value !== '' ) {
      dataArr.unshift({
        key : 'memo' + count,
        text : textArea.value,
        date : today
      });

      functions.template(dataArr);
      functions.empty();
      
      localStorage.setItem('data', JSON.stringify(dataArr));
      count++;

    }else {
      alert('빈칸');
      return false;
    }
  },

  empty : () => {
    textArea.value = '';
    cancelBtn.classList.remove('show');
  },

  cancel : (e) => {
    functions.empty();
    functions.change(e);
  },

  change : (e) => {
    e.target.value !== '' ? cancelBtn.classList.add('show') : cancelBtn.classList.remove('show');
  },

  left : () => {
    addContents = document.querySelectorAll('.added');
    
    if ( addContents.length > 0 ) {
      for (let i=0; i < addContents.length; i++ ) {
        addContents[i].remove();
      }
    }
  },

  template : (el) => {
    functions.left();
    el.forEach((i)=>{
      changeDate = i.date.slice(0,4) + '-' + i.date.slice(4,6) + '-' + i.date.slice(6,8);
      document.querySelector('.wrapper').insertAdjacentHTML('beforeEnd',
      `<div class="content added">
        <textarea placeholder="메모" oninput="textChange(event);">${i.text}</textarea>
          
        <footer>
          <div class="date">${changeDate}</div>
  
          <div class="btns">
            <button class="edit" disabled="disabled">수정</button>
            <button class="delete">삭제</button>
          </div>
        </footer>
      </div>`
      );
    });
  },
}

functions.list();
document.scr = functions;