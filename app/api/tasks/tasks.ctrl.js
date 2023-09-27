const Task = require('../../models/task');

/**
 * New Task
 * @param { body, complete } req 
 * @param { id, body, complete } res new task's props 
 */
exports.write = async (req, res) => {
  const { body, complete } = req.body;

  const newTask = { body: body, complete: complete };

  try {
    const task = await Task.create(newTask);
    res.send(task);     // 새로 만들어진 task의 row의 정보를 보낸다.
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

/**
 * Update Task
 * @param { id, body, complete } req 
 */
exports.update = async (req, res) => {
  const { id, body, complete } = req.body;
  
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      res.status(404).send();
    }

    task.body = body;
    task.complete = complete;

    await task.save();
    res.send(task);

  } catch(e) {
    console.error(e);
    res.status(500).send();
  }
};

// Get all task
/**
 * Bring all Tasks
 * @param {*} req 
 * @param { { id, body, complete }, { id, body, complete }... } res Tasks Data
 */
exports.list = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.send(tasks);
  } catch(e) {
    console.error(e);
    res.status(500).send();
  }
};

/**
 * Task remove from DB
 * @param { id, } req  
 * @param {*} res 
 */
exports.remove = async (req, res) => {
  const { id, } = req.body;
  try {
    const task = await Task.findByPk(id);

    if (!task) {
      res.status(404).send();
    }
    
    await task.destroy();
    res.send();
  } catch(e) {
    res.status(500);
  }
};