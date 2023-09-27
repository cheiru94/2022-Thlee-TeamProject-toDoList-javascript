async function getTasks() {
  const url = `/api/tasks/`;
  const res = await fetch(url);
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}

async function pushTask(status) {
  const url = `/api/tasks/`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(status)
  };

  const res = await fetch(url, options);
  const data = await res.json();
  
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}

async function removeTask(status) {
  const url = `/api/tasks/`;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(status)
  };

  const res = await fetch(url, options);
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}

async function updateTask(status) {
  const url = `/api/tasks/`;
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(status)
  };

  const res = await fetch(url, options);
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}
// when Connect api server and get data(tasks)
getTasks().then((datas) => {
  // bring Elements
  datas.forEach(data => {
    const task = new Task(data);
    tasks.push(task);
    todo_list.appendChild(task.getElement());
  });
});

const tasks = new Array();


const btnAddTask = document.querySelector('#addTask');

// TODO: template view file doesn't exist element yet
// const btnPopTask = document.querySelector('#popTask');

const todo_list = document.querySelector('.todo-list');

// 'New task' button을 누르면 db에 새로운 task의 row를 만들고 해당 body와 complete값을 반환한다.
btnAddTask.addEventListener('click', () => {
  pushTask({body: '', complete: false})
    .then((data) => {
      const task = new Task(data);
      tasks.push(task);
      todo_list.appendChild(task.getElement());
    });
});


// user press [ctrl + s] event
document.addEventListener('keydown', (e) => {
  if ((e.keyCode == '115' || e.keyCode == '83') && (e.ctrlKey || e.metaKey)) {
    e.preventDefault(); // 기존에 입력하면 동작이 이루어진 것들을 초기화함.
    save();
  }
});


function save() {
  tasks.forEach((task) => {
    task.updateElement();
    updateTask(task.status);
  });
}
class Task {
  taskElement = document.createElement('div');
  eleCompleted = document.createElement('input');
  eleLabel = document.createElement('label');
  eleBody = document.createElement('input');
  eleDelete = document.createElement('input');

  constructor(argStatus) {
    this.status = {
      id: argStatus.id,
      body: argStatus.body,
      complete: argStatus.complete
    };
  }

  getElement() {
    this.taskElement.className = 'task';
    this.taskElement.addEventListener('click', () => {
      this.updateElement();
      save();
    });

    this.eleCompleted.type = 'checkbox';
    this.eleCompleted.className = 'completed';
    this.eleCompleted.checked = this.status.complete;

    this.eleLabel.className = 'labelCompleted';
    if (this.eleCompleted.checked) {
      this.eleLabel.classList.add('checked');
    }
    
    this.eleBody.type = 'text';
    this.eleBody.placeholder = "包み込むように....";
    this.eleBody.id = 'body';
    this.eleBody.value = this.status.body;
    this.eleBody.addEventListener('keydown', function(e) {
      if (e.keyCode === 13) save();
    });

    this.eleDelete.type = 'button';
    this.eleDelete.value = 'x';
    this.eleDelete.className = 'delete';
    this.eleDelete.addEventListener('click', () => {
      removeTask(this.status);  // 삭제하는 task의 정보를 보내서 db에 일치하는 task를 지운다.
      this.taskElement.remove();
    });

    this.eleLabel.appendChild(this.eleCompleted);
    this.taskElement.appendChild(this.eleLabel);
    this.taskElement.appendChild(this.eleBody);
    this.taskElement.appendChild(this.eleDelete);

    return this.taskElement;
  }

  updateElement() {
    this.status = {
      id: this.status.id,
      body: this.eleBody.value,
      complete: this.eleCompleted.checked,
    };
    if (this.status.complete) {
      this.eleLabel.classList.add('checked');
    } else {
      this.eleLabel.classList.remove('checked');
    }
  }
}