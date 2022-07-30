const jwt = require("jsonwebtoken");
const { secretKey } = require("../secretkeys/secretKey");

const adminAuthentification = async (req, res, next) => {
  const body = req.body;
  try {
    const token = req.header("Authorization").split(" ")[1];
    const tokenData = jwt.verify(token, secretKey);
    const data = {
      ...body,
      adminId: tokenData.id,
      user: tokenData.name,
      image: tokenData.image,
    };
    req.body = data;

    next();
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  adminAuthentification,
};
