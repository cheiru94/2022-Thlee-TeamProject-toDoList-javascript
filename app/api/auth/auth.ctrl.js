const bcrypt = require('bcrypt');
const Member = require('../../models/member');

/**
 * Login Method
 * @param { userId, password } req
 * @param 
 */
exports.login = async (req, res) => {
  const { userId, password } = req.body;
    
  try {
    const findMember = await Member.findOne({
      where: { userId: userId }
    });

    // Find member doesn't exist
    if (!findMember) {
      res.send({status: 'noExists'});
    }

    // Login Attempts condition
    if (findMember.thoughtCount > 5) {
      res.send({status: 'exceedTry'});
    }

    // is it password correct?
    const isValidPassword = await bcrypt.compare(password, findMember.password);
    if (isValidPassword) {
      req.session.member = { userId: userId, password: password };
      findMember.thoughtCount = 0;
      await findMember.save();
      res.send({status: 'success'});
    } else {
      findMember.thoughtCount++;
      await findMember.save();
      res.send({status: 'failed'});
    }

  } catch (e) {
    res.status(500);
  }

};


/**
 * Register Method
 * @param { expect userId, password } req
 */
exports.register = async (req, res) => {
  const { userId, password } = req.body;

  const existsMember = await Member.findOne({
    where: { userId: userId }
  });

  // is exists? -> can't register same userId
  if (existsMember) {
    res.send(false);
  }

  // Objectify to store new member data
  const newMember = { 
    userId: userId,
    password: password 
  };

  try {
    await Member.create(newMember);
    res.send(true);
    // TODO: /* generate session token */ 
  } catch (e) {
    res.status(500).send();
  }

};

exports.logout = async (req, res) => {
  req.session.destroy(() => {
    req.session;
  });
  res.redirect('/');
};