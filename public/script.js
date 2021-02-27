console.log('Shalom lachem');

function sendData() {
  let name = document.getElementById('name').value;
  let comment = document.getElementById('comment').value;
  let userdata = {
    name,
    comment
  };
  location.reload();
  fetch('http://localhost:3000/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userdata)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
}

function showData() {
  fetch('http://localhost:3000/show')
    .then(res => res.json())
    .then(data => {
      printAll(data);
    })
    .catch(err => {
      console.log(err);
    });
}

showData();

function printAll(data) {
  let show = document.getElementById('root');
  for (let i = 0; i < data.length; i++) {
    //console.log(data[i].name);
    // Guest name
    let guest = document.createElement('div');
    let buttonDelete = document.createElement('button');
    buttonDelete.addEventListener('click', function() {
      deleteGuest(data[i].id);
    });
    buttonDelete.innerText = 'Delete Entry';
    buttonDelete.className = 'deleteButton';
    // let guestName = document.createElement('div');
    guest.innerHTML = `<p class="myTime">Date:${data[i].created_at.slice(
      0,
      10
    )} Time:${data[i].created_at.slice(
      11,
      19
    )}</p><h3 class="myTitel">Guest name: ${
      data[i].name
    }</h3><p class="myComment">Comment: ${data[i].comment}</p>`;
    guest.appendChild(buttonDelete);
    show.appendChild(guest);
  }
}

function deleteGuest(rowID) {
  console.log(rowID);
  fetch('http://localhost:3000/delete/' + rowID)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
}
