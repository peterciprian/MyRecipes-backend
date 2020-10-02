import mongoose, { Document, Schema } from 'mongoose';

export interface IIngredient extends Document {
    name: string;
    id: mongoose.Schema.Types.ObjectId;
    unit: string;
}
const IngredientSchema = new Schema({
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
export default mongoose.model<IIngredient>('Ingredient', IngredientSchema);
