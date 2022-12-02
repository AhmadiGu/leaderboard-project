import './style.css';

// const gameID = 'X9fxHdLZsiAYP8qUTFeL';

const gameID = 'SAafjYwuy9TE9mm0ILLg';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`;
// https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/SAafjYwuy9TE9mm0ILLg/scores/

const list = document.querySelector('.recent-content');
const addForm = document.querySelector('.form');
const listTable = document.querySelector('.table');
const refreshBtn = document.querySelector('.refreshBtn');

const displayInfo = (info) => {
  listTable.innerHTML = '';
  info.forEach((e) => {
    listTable.innerHTML += `<tr>
      <td class="user"><span class="user-icon"></span> ${e.user} : ${e.score}</td>
      
      </tr>`;
  });
};

async function getInfo() {
  await fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((respones) => respones.json())
    .then((json) => displayInfo(json.result));
}

const postInfo = async (user, score) => {
  await fetch(url,
    {
      method: 'POST',

      body: JSON.stringify({
        user,
        score,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then((respones) => respones.json())
    .then((data) => {
      listTable.innerHTML = data.result;
      list.appendChild(listTable);
      getInfo();
    });
};

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = addForm.user.value;
  const scores = addForm.score.value;
  postInfo(name, scores);
  addForm.reset();
});

document.addEventListener('DOMContentLoaded', getInfo);

refreshBtn.addEventListener('click', async () => {
  listTable.innerHTML = '';
  await getInfo();
});

// const gameTitle = "LeaderBoard is My Cool First Game Enjoy it!"
// let index = 0;
// const writeText = () => {
//   document.main.innerHTML = gameTitle.slice(0,index);
//   index++;
//   if(index > gameTitle.length-1){
//     index = 0;
//   }
// }
// setInterval(writeText,100);