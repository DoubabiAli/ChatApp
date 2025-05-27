// Message model for MongoDB
import { ObjectId } from 'mongodb';

class Message {
    constructor(db) {
        this.collection = db.collection('messages');
    }

    async createTable() {
        // No need to create table in MongoDB, collections are created automatically
        return true;
    }

    async create(messageData) {
        const result = await this.collection.insertOne({
            ...messageData,
            sender: new ObjectId(messageData.sender),
            recipient: messageData.recipient ? new ObjectId(messageData.recipient) : null,
            createdAt: new Date(),
            isRead: false,
            isDelivered: false
        });
        return result.insertedId;
    }

    async getMessagesBetweenUsers(userId1, userId2) {
        return this.collection.find({
            $or: [
                { sender: new ObjectId(userId1), recipient: new ObjectId(userId2) },
                { sender: new ObjectId(userId2), recipient: new ObjectId(userId1) }
            ]
        }).sort({ createdAt: 1 }).toArray();
    }

    async getConversations(userId) {
        const pipeline = [
            {
                $match: {
                    $or: [
                        { sender: new ObjectId(userId) },
                        { recipient: new ObjectId(userId) }
                    ]
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $group: {
                    _id: {
                        $cond: [
                            { $eq: ["$sender", new ObjectId(userId)] },
                            "$recipient",
                            "$sender"
                        ]
                    },
                    lastMessage: { $first: "$$ROOT" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    _id: 0,
                    id: "$user._id",
                    username: "$user.username",
                    customId: "$user.customId",
                    profilePic: "$user.profilePic",
                    lastMessage: {
                        content: "$lastMessage.content",
                        timestamp: "$lastMessage.createdAt",
                        isRead: "$lastMessage.isRead"
                    },
                    unreadCount: {
                        $size: {
                            $filter: {
                                input: "$lastMessage",
                                as: "msg",
                                cond: {
                                    $and: [
                                        { $eq: ["$msg.recipient", new ObjectId(userId)] },
                                        { $eq: ["$msg.isRead", false] }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        ];

        return this.collection.aggregate(pipeline).toArray();
    }

    async markAsDelivered(messageId, userId) {
        return this.collection.updateOne(
            { _id: new ObjectId(messageId), recipient: new ObjectId(userId) },
            { $set: { isDelivered: true } }
        );
    }

    async markAsRead(messageId, userId) {
        return this.collection.updateOne(
            { _id: new ObjectId(messageId), recipient: new ObjectId(userId) },
            { $set: { isRead: true } }
        );
    }

    async findById(messageId) {
        return this.collection.findOne({ _id: new ObjectId(messageId) });
    }
}

export default Message;
