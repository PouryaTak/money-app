import { connectMongoDB } from "@/lib/mongodb"
import UserModel from "@/models/user"

type User = {
    email: string
    name: string
    id: string
    image: string
}

export const handleAddUserToDB = async (user: User): Promise<boolean> => {
    const { email, name } = user
    try {
        await connectMongoDB()
        const userExists = await UserModel.findOne({ email })
        if (!userExists) {
            await UserModel.create({ name, email })
        }
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}
