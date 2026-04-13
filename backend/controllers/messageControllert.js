import cloudinary from "../lib/cloudinary.js";
import { errorHandler } from "../lib/error.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const logUserId = req.user._id;
    const filterUserId = await userModel
      .find({ _id: { $ne: logUserId } })
      .select("-password");

    res.status(200).json(filterUserId);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const getMessagesByUserId = async (req, res, next) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const message = await messageModel.find({
      $or: [
        { senderId: myId, reciverId: userToChatId },
        { senderId: userToChatId, reciverId: myId },
      ],
    });

    res.status(200).json(message);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { text, image } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
      return next(errorHandler(400, "Text or image is required"));
    }

    if (senderId.equals(reciverId)) {
      return next(errorHandler(400, "Cannot send message to yourself"));
    }

    const receiverExits = await userModel.exists({ _id: reciverId });

    if (!receiverExits) {
      return next(errorHandler(400, "Receiver not found."));
    }
    let imageUrl;

    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image);

      imageUrl = uploadImage.secure_url;
    }

    const newMessage = new messageModel({
      senderId,
      reciverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    // TODO: socket io setup

    const receiverSocketId = getReceiverSocketId(reciverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const getChatPartners = async (req, res, next) => {
  try {
    const logInUserId = req.user._id;
    // find all the message where the logged-in user is editer sender or receiver

    const message = await messageModel.find({
      $or: [{ senderId: logInUserId }, { reciverId: logInUserId }],
    });

    const chatPartnerIds = [
      ...new Set(
        message.map((msg) =>
          msg.senderId.toString() === logInUserId.toString()
            ? msg.reciverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await userModel
      .find({ _id: { $in: chatPartnerIds } })
      .select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
