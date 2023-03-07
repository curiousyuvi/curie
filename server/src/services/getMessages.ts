import Message from "../models/message";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const getMessages = (rid, after, handleError: (err, docs) => void) => {
  if (after && after > 1111) {
    const afterDT = new Date(after * 1000 + 1000);
    const objectIdWithTimestamp = new ObjectId(
      Math.floor(afterDT.getTime() / 1000).toString(16) + "0000000000000000"
    );

    const query = {
      _id: { $gt: objectIdWithTimestamp },
      rid,
    };

    Message.find(query, handleError);
  } else {
    const query = {
      rid,
    };

    Message.find(query, handleError);
  }
};

export default getMessages;
