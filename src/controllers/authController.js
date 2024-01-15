const User = require("../models/schemas/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { customError } = require("../helpers/errors");

// const { sendVerificationEmail } = require("../services/emailService");
// const { successResponse } = require("../helpers/responses");
// const { v4: uuidv4 } = require("uuid");
// const { customError } = require("../helpers/errors");

const signup = async (req, res, next) => {
  const {
    name,
    email,
    password,
    data,
    calorie = null,
    notRecommendedProduct = [],
  } = req.body;

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw customError({ status: 409, message: "Email in use" });
  }

  try {
    const user = new User({
      name,
      email,
      password,
      data,
      calorie,
      notRecommendedProduct,
    });
    await user.save();

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SECRET);

    await User.findByIdAndUpdate(user.id, { token });

    return res.status(201).json({
      token,
      user: {
        name,
        email,
        userId: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw customError({ status: 401, message: "Email or password is wrong" });
  }

  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    throw customError({ status: 401, message: "Email or password is wrong" });
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, process.env.SECRET);
  await User.findByIdAndUpdate(user.id, { token });
  res.status(200).json({
    token,
    user: {
      email: user.email,
      name: user.name,
      data: user.data,
      calorie: user.calorie,
      notRecommendedProduct: user.notRecommendedProduct,
    },
  });
};

const logout = async (req, res, next) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, {
    token: null,
  });
  res.status(200).json({ message: "Success" });
};

const currentUser = async (req, res, next) => {
  console.log("Funcția currentUser a fost apelată");
  const { user } = req;
  console.log("Utilizatorul curent este: ", user);
  const currentUser = await User.findOne({ token: user.token });
  const { name, email, data, calorie, notRecommendedProduct } = currentUser;
  console.log("Datele utilizatorului curent sunt: ", {
    name,
    email,
    data,
    calorie,
    notRecommendedProduct,
  });
  return res.status(200).json({
    user: {
      name,
      email,
      data,
      calorie,
      notRecommendedProduct,
    },
  });
};

//  verify email

// const verificationEmailController = async (req, res, next) => {
//   try {
//     const { verificationToken } = req.params;
//     await verifyEmail(verificationToken);
//     res
//       .status(200)
//       .json({ message: "Email verified successfully!", code: 200 });
//   } catch (error) {
//     res.status(400).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };

// const verifyEmail = async (verificationToken) => {
//   try {
//     const update = { verify: true, verificationToken: null };
//     const result = await User.findOneAndUpdate(
//       {
//         verificationToken: verificationToken,
//       },
//       { $set: update },
//       { new: true }
//     );
//     console.log(result);
//     if (!result) throw new Error("User not found");
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  login,
  logout,
  signup,
  currentUser,
};
