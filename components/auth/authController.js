const authService=require('./authService')
exports.login = async (req, res) => {

  res.render('login',{wrongLogin: req.query.wrongLogin !== undefined});
  //res.render('./loginView/login',);
}
exports.signup = async (req, res) =>{
  const {email, password, username} =req.body;
  try{
    if(!email || !password){
      res.render('login');
    }
    else{
      const user = await authService.signup(email,  password, username);
      //login after create
      req.login(user, function(err) {
        if (err) { return next(err); }
        let userID= user._id;
        let url = '/myaccount/' + userID +'/editAccount';
        return res.redirect(url);
      });
    }
  }catch(Error){
    res.render('Error');
  }
}