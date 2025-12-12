const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Users'] 
    const result = await mongodb.getDatabase().db('').collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
}

const getSingle = async (req, res) => {
    //#swagger.tags = ['Users'] 
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('').collection('users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createUser = async (req, res) => {
    //#swagger.tags = ['Users'] 
    const userId = new ObjectId(req.params.id);
    const { name, email, passwordHash, role } = req.body;

    if (!name || !email || !passwordHash || !role) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const response = await mongodb.getDatabase().db('').collection('users').find({ _id: userId });
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occured while updating the user");
    }
};


const updateUser = async (req, res) => {
    //#swagger.tags = ['Users'] 
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    const updateFields = {};
    ['name', 'email', 'role', 'passwordHash'].forEach(field => {
        if (req.body[field] !== undefined) updateFields[field] = req.body[field];
    });

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: "No fields to update" });
    }

    const result = await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $set: updateFields }
    );

    if (result.matchedCount > 0) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated" });
};


const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users'] 
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    const result = await db.collection('users').deleteOne({ _id: new ObjectId(userId) });

    if (result.deletedCount > 0) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
};


module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};