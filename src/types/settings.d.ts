export type Settings = {
    lang: string
    currency: string
    calender: string
}

export type SettingsProps = {
    settings: Settings
    isLoading: boolean
    tabItems: { [key: string]: { title: string; value: string }[] }
    handleChange: (event: any, prop: string) => void
    CurrencyTabValue: string
    saveSettings:()=>void
}
