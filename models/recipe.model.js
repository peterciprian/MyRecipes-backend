const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema( {

    
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    ingredients: [{
        ingredient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient',
            required: true
        }
    }],
    preparation: {
        type: String,
        required: true
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    lackings: [{
        lacking: {
            type: String
        }
    }],
    temperature: {
        type: String
    },
    month: [{
        month: {
            type: String
        }
    }],
    preserved: {
        type: Boolean
    },
    rating: {
        type: Number
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    inspected: {
        type: Boolean,
        required: true,
        default: false
    },
    valid: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    timestamps: true
});
module.exports = mongoose.model('Recipe', RecipeSchema);
