const jwt = require("jsonwebtoken");
const User = require("../models/users");

// vérifier que le token est valide
module.exports = async (req, res, next) => {
  try {
    // stocker le token
    const token = req.headers.authorization;
    // décoder le token
    const decodedToken = jwt.verify(token, "USER_TOKEN_SECRET");
    // le stocker dans l'userid
    const userId = decodedToken.userId;
    // trouver l'user avec la fonction dans les controllers
    let result = await User.findOne(userId);
    // l'user est dans un tableau avec l'indice 0 et c'ets le 1er indice du tableauq ue l'on veut
    const user = result[0][0];
    req.auth = user;
    // si on ne toruve pas le resultat, erreur, sinon next
    if (!result) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: new Error("Unauthorized request"),
    });
  }
};
