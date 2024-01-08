import mongoose, { Schema } from "mongoose"

const authSigningSchema = new Schema(
    {
        email: String
    },
    {
        timestamps: true,
    }
)


const authVerifySchema = new Schema(
    {
        email: String,
        verificationCode: String,
    },
    {
        timestamps: true,
    }
)
    
export const AuthSigningModel = mongoose.models.AuthSigningModel || mongoose.model("AuthSigningModel", authSigningSchema)
export const AuthVerifyModel = mongoose.models.AuthVerifyModel || mongoose.model("AuthVerifyModel", authVerifySchema)
