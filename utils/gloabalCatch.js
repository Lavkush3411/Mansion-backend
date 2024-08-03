export const gloabalCatch=(err, req, res, next) => {
    console.log(err);
    res.json({ msg: "Global Server Error " });
  }