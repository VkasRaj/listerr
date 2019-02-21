const { Schema, SchemaTypes, model } = require("mongoose");

const schema = new Schema(
    {
        author: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 5
        },
        board: {
            type: SchemaTypes.ObjectId,
            ref: "Board",
            required: true
        },
        isOpen: {
            type: Boolean,
            default: true
        },
        issue: [
            {
                type: SchemaTypes.ObjectId,
                ref: "Issue"
            }
        ]
    },
    {
        timestamps: true,
        minimize: true
    }
);

module.exports = model("Project", schema);