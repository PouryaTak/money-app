import React, { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

type Props = {
    onSelectTag: (tags: string[]) => void
    tags: string[]
}

const Tags = ({ onSelectTag, tags }: Props) => {
    const [value, setValue] = useState("")
    const [showResults, setShowResults] = useState(false)
    const tagSuggestions: string[] = []

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // todo: add api call to search for tags in db
        setValue(e.target.value)
        setShowResults(Boolean(e.target.value))
    }

    const onTagClick = (tag: string) => {
        const isolatedTags = tag.toLocaleLowerCase().split(/[ ,]+/).filter(Boolean)
        const tagsToSave = [...tags]
        isolatedTags.forEach((tag) =>
            tags.includes(tag) ? tagsToSave.splice(tags.indexOf(tag), 1) : tagsToSave.push(tag)
        )

        onSelectTag(tagsToSave)
        setValue("")
        setShowResults(false)
    }

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            onTagClick(value)
        }
    }

    // todo: get recent tags from db on start

    return (
        <div>
            <div className="mb-2 flex gap-2">
                {tags.map((tag) => (
                    <div
                        key={tag}
                        className="px-2 py-1 rounded-sm bg-slate-300 text-xs w-max"
                        onClick={() => onTagClick(tag)}
                    >
                        {tag}
                    </div>
                ))}
            </div>
            <div className="relative">
                <Input
                    type="text"
                    placeholder={"Tag..."}
                    value={value}
                    onKeyDown={handleEnterKey}
                    onChange={onInputChange}
                    disabled={false}
                />
                {showResults && (
                    <div className="absolute inset-x-0 top-10 bg-white p-5 rounded-b-xl border border-gray-300 shadow-lg flex flex-col justify-center gap-2">
                        {tagSuggestions.length ? (
                            tagSuggestions
                                .filter((tag) => tag.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
                                .map((tag) => (
                                    <div key={tag} className="flex items-center gap-2" onClick={() => onTagClick(tag)}>
                                        {tag}
                                    </div>
                                ))
                        ) : (
                            <Button type="button" variant="outline" onClick={() => onTagClick(value)}>
                                + Add
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Tags
