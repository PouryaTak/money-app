import React from 'react'
import TabGroup from "@/components/tab-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SettingsProps } from '@/types/settings'

export default function Settings({settings, isLoading, tabItems, handleChange, CurrencyTabValue, saveSettings}:SettingsProps) {
  return (
    <div>
    <label className="font-bold mb-2 block">Language</label>
    <TabGroup
        currentSelected={settings.lang}
        onChange={(e) => handleChange(e, "lang")}
        isLoading={isLoading}
        tabs={tabItems.LangTabs}
    />
    <br />
    <label className="font-bold mb-2 block">Calender</label>
    <TabGroup
        currentSelected={settings.calender}
        onChange={(e) => handleChange(e, "calender")}
        isLoading={isLoading}
        tabs={tabItems.CalTabs}
    />
    <br />
    <label className="font-bold mb-2 block">Currency</label>
    <TabGroup
        currentSelected={CurrencyTabValue}
        onChange={(e) => handleChange(e, "currency")}
        isLoading={isLoading}
        tabs={tabItems.CurrencyTabs}
    />
    {CurrencyTabValue === "custom" && (
        <Input
            value={settings.currency}
            onChange={(e) => handleChange(e.target.value, "currency")}
            placeholder="Type your currency..."
            className="mt-2"
        />
    )}
    <br />
    <Button onClick={saveSettings} disabled={isLoading}>
        Save Settings
    </Button>
</div>
  )
}
