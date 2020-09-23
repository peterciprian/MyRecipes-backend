const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    unit: {
        type: String,
        required: true
    }, 
},
{
    timestamps: true
});
module.exports = mongoose.model('Ingredient', IngredientSchema);
