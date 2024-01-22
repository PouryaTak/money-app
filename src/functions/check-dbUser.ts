import UserModel from "@/models/user"
import { getServerSession } from "next-auth"

const checkDbUser = async () => {
    const session = await getServerSession()
    const email = session?.user?.email
    const hasUser = await UserModel.findOne({ email })
    if (!hasUser || !email) {
        return {email: null}
    }
    return {email}
}

export default checkDbUser