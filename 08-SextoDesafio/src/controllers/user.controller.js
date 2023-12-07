const showProfile = (req, res) => {
    let user = {
      layout: "profile",
      name: req.session.name,
      email: req.session.email,
      rol:req.session.rol,
    };
    console.log(user);
    res.render("index", { user });
  };
  
  export { showProfile };