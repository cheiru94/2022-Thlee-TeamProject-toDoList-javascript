const validNoti = document.querySelector('.validNoti');

// btnSignin이 눌러졌을 때,
const btnSignin = document.querySelector('#btnSignin');
btnSignin.addEventListener('click', login);

function login() {
  const inputUserId = document.querySelector('.account').value;
  const inputUserPassword = document.querySelector('.password').value;
  const userData = { userId: inputUserId, password: inputUserPassword };

  authLogin(userData)
    .then(res => {
      const loginStatus = res.status;
      // login handle
      switch (loginStatus) {
      case 'success':
        window.location.href = '/todo';
        break;
      case 'noExists':
        validNoti.classList.add('err');
        validNoti.innerText = "We cannot find on account with that User ID";
        break;
      case 'exceedTry':
        validNoti.classList.add('err');
        validNoti.innerText = "Login Attempts Exceed";
        break;
      case 'failed':
        validNoti.classList.add('err');
        validNoti.innerText = "You entered wrong password";
        break;
      }
    });
}


async function authLogin(body) {
  const url = `/api/auth/login`;
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
    login();
  }
});
