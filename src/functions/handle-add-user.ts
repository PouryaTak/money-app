import { addUser } from "@/functions/api/user"
import { connectMongoDB } from "@/lib/mongodb"
import UserModel from "@/models/user"

type User = {
    email: string
    name: string
    id: string
    image: string
}

export const handleAddUserToDB = async (user: User) => {
    const { email, name } = user
    try {
        await connectMongoDB()
        const userExists = await UserModel.findOne({ email })
        if (!userExists) {
            const response = await addUser({ name, email })
            return response.ok ? user : null
        }
        return user
    } catch (err) {
        console.log(err)
    }
}
