"use client"
import React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TabContent = { title: string; value: string }
type TabGroupProp = {
    isLoading: boolean
    tabs: TabContent[]
    currentSelected: TabContent["value"]
    onChange: (event: TabContent["value"]) => void
}
export default function TabGroup({ isLoading, tabs, onChange, currentSelected }: TabGroupProp) {
    return (
        <Tabs defaultValue={currentSelected} value={currentSelected} className="w-full" onValueChange={onChange}>
            <TabsList className="w-full">
                {tabs.map((tab: TabContent) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="w-full"
                        disabled={isLoading}
                        aria-controls={undefined} //it has to be undefined because of a radix ui issue in not having the TabContent
                    >
                        {tab.title}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}
