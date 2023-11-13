"use client"
import { categoriesData } from "@/data"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function CreatePostForm() {

    const [links, setLinks] = useState<string[]>([]);
    const [linkInput, setLinkInput] = useState("");

    const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        if(linkInput.trim() !== ""){
            setLinks((prev) => [...prev, linkInput])
            setLinkInput("")
        }
    }

    const deleteLink = (index: number) =>{

        setLinks((prev) => prev.filter((_, p) => p !== index))

    }

    return (
        <div>
            <h2>Create Post</h2>
            <form className="flex flex-col gap-2">
                <input type="text" placeholder="Title" />
                <textarea placeholder="Content"></textarea>
                {links && links.map((link, i)=>
                <div key={i} className="flex item-center gap-4">
                <Image className="cursor-pointer" src="/link-icon.svg" width={18} height={18} alt="link"/>    
                 
                <Link className="link" href={link}>{link}</Link>
                
                <Image className="cursor-pointer" src="/trash-icon.svg" width={18} height={18} alt="link" onClick={() => deleteLink(i)}/>    
                
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
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                            </svg>
                        </span>
                        Add
                    </button>
                </div>
                <select className="p-3 rounded-md border appearence-none">
                    <option value="">Select A Category</option>
                    {
                        categoriesData && categoriesData.map((category) =>(
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