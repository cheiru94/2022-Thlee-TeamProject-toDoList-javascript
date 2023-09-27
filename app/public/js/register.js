const validNoti = document.querySelector('.validNoti');

const btnCreate = document.querySelector('#button');
btnCreate.addEventListener('click', register);

function register() {
  const inputUserId = document.querySelector('#id').value;
  const inputUserPassword = document.querySelector('#pw').value;
  const inputUserRePassword = document.querySelector('#pw_check').value;
  
  if (inputUserId.length < 4) {
    validNoti.classList.add('err');
    validNoti.innerText = 'User ID must be at least 4 characters';
    return;
  }

  if (inputUserPassword !== inputUserRePassword) {
    validNoti.classList.add('err');
    validNoti.innerText = 'Passwords do not match each other.';
    return;
  }

  const userData = { userId: inputUserId, password: inputUserPassword };

  authRegister(userData)
    .then(res => {
      // TODO:TODO: Edit Here!!!! TODO:TODO:
      if (res === true) {
        window.location.href = '/todo';
      } else if (res === false) {
        // TODO: alert to 'UserId already in use'
        validNoti.classList.add('err');
        validNoti.innerText = 'UserID already in use.';
      }
    });
}

async function authRegister(body) {
  const url = `/api/auth/register`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  };
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}

document.addEventListener('keydown', (e) => {
  validNoti.classList.remove('err');
  if (e.keyCode === 13) {
    e.preventDefault();
  }
});