import { Document, Model, model, Types, Schema, Query } from "mongoose"
import { IIngredient } from './ingredient.model';
import { IUser } from './user.model';

export interface IRecipe extends Document {
    id: Schema.Types.ObjectId;
    name: string;
    ingredients: IIngredient['id'];
    preparation: string;
    uploader: IUser['id'];
    type: string;
    lackings: string[];
    temperature: string;
    month: string[];
    preserved: boolean;
    rating: number;
    active: boolean;
    inspected: boolean;
    valid: boolean;

}
const RecipeSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    ingredients: [{
        ingredient: {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient',
            required: true
        }
    }],
    preparation: {
        type: String,
        required: true
    },
    uploader: {
        type: Schema.Types.ObjectId,
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

export default model<IRecipe>("Recipe", RecipeSchema);
