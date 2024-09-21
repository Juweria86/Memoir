import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongose from 'mongoose';

import UserModal from "../models/users.js";

const secret = 'test';

export const signin = async (req, res) => {
  /* gets login details from body of request */
  const { email, password } = req.body;

  try {
  /* Searches the database for mathcing details */
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
  /* Compares the password with the  hashed password in database */
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  /* Returns acess token unique to the user. expires in an hour interval */
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
  /* Returns message in case of any error */
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  /* Retrieves information from reqest */
  const { email, password, username } = req.body;

  try {
  /* Searches for matching information in database and returns "infomation exists" */
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) return res.status(400).json({ message: "User already exists" });
  /* hashes the password for data protection */ 
    const hashedPassword = await bcrypt.hash(password, 12);
  /*  Saves the new document in the database */
    const result = await UserModal.create({ email, password: hashedPassword, username });
  /* Returns acess token unique to the usser. expires in an hour interval */
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
  /* Returns message in case of error */
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  if (!req.userId) {
  /* Checks to ensure user's access token is verified from auth */
    res.status(404).json({ message: "Not authoruzed" })
  } else {
  /* Gets id from request parameters and  */
    const  { id } = req.params;
    const { email, name, password, location,  } = req.body;
    const profPics = req.file ? req.file.path : req.body.profilePics;
  /* Searches for the  usr id in the database */
    if (!mongose.Types.ObjectId.isValid(id)) {
      return res.status(404).send('No such user');
    }
  /* hashes out the password for data protection */
    const hashPassword = await bcrypt.hash(password, 12);
  /* Saves updates information in the database */
    const updatedUser = { email, password: hashPassword, profPics, _id: id, name, location };
    await UserModal.findByIdAndUpdate(id, updatedUser, { new: true});
    res.json(updatedUser);
  }
};
