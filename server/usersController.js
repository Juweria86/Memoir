import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongose from 'mongoose';

import UserModal from "../models/users.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, username });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  if  (req.userId !== req.params.id) {
   res.status(401).json({ message: "Unauthorized to update" });
  } else {
    const  { id } = req.params;
    const { email, password, name, age } = req.body;

    if (!mongose.Types.ObjectId.isValid(id)) {
      return res.status(404).send('No such user');
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const updatedUser = { email, password: hashPassword, _id: id, name };
    await UserModal.findByIdAndUpdate(id, updatedUser, { new: true});
    res.json(updatedUser);
  }
};
