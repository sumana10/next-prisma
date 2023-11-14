"use client"
import { categoriesData } from "@/data"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function CreatePostForm() {

    const [links, setLinks] = useState<string[]>([]);
    const [linkInput, setLinkInput] = useState("");
//e variable is expected to be an event object representing a mouse event on a button element
    const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (linkInput.trim() !== "") {
            setLinks((prev) => [...prev, linkInput])
            setLinkInput("")
        }
    }

    const deleteLink = (index: number) => {
//_: This is a convention for a variable that you don't intend to use. In this case, it's a placeholder for the value of each element in the array.
        setLinks((prev) => prev.filter((_, i) => i !== index))

    }

    return (
        <div>
            <h2>Create Post</h2>
            <form className="flex flex-col gap-2">
                <input type="text" placeholder="Title" />
                <textarea placeholder="Content"></textarea>
                {links && links.map((link, i) =>
                    <div key={i} className="flex item-center gap-4">
                        <Image className="cursor-pointer" src="/link-icon.svg" width={18} height={18} alt="link" />

                        <Link className="link" href={link}>{link}</Link>

                        <Image className="cursor-pointer" src="/trash-icon.svg" width={18} height={18} alt="link" onClick={() => deleteLink(i)} />

                    </div>
                )}
                <div className="flex gap-2">
                    <input className="flex-1" type="text"
                        placeholder="Paste the link and click on Add"
                        onChange={e => setLinkInput(e.target.value)}
                        value={linkInput}
                    />
                    <button className="btn flex gap-2 items-center" onClick={addLink}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                            </svg>
                        </span>
                        Add
                    </button>
                </div>
                <select className="p-3 rounded-md border appearence-none">
                    <option value="">Select A Category</option>
                    {
                        categoriesData && categoriesData.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
                <button className="primary-btn" type="submit">Create Post</button>
                <div className="p-2 text-red-500 font-bold">Error Message</div>
            </form>
        </div>
    )
}