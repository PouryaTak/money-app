import { Action } from "@/types/general"
import { Settings } from "@/types/settings"

export default function settingsReducer(state: Settings, action: Action) {
    switch (action.type) {
        case "UPDATE_SETTING":
            const { prop, value } = action.payload
            if (prop === "currency" && value === "custom") {
                return { ...state, [prop]: "" }
            } else {
                return { ...state, [prop]: value }
            }
        case "SET_SETTING":
            return { ...state, ...action.payload }
        default:
            return state
    }
}
