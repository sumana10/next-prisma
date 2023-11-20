"use client"

import { TCategory, TPost } from "@/app/types";
import { categoriesData } from "@/data"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import toast from "react-hot-toast";

export default function EditPostForm({ post }: { post: TPost }) {

    const [links, setLinks] = useState<string[]>([]);
    const [linkInput, setLinkInput] = useState("");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState<TCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [publicId, setPublicId] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    useEffect(() => {
        const fetchAllCategories = async () => {
            const res = await fetch("/api/categories")
            const catNames = await res.json();
            setCategories(catNames);
        }

        fetchAllCategories()

        const initValues = () => {
            setTitle(post.title);
            setContent(post.content);
            setImageUrl(post.imageUrl || "");
            setPublicId(post.publicId || "");
            setSelectedCategory(post.catName || "");
            setLinks(post.links || []);
        }
        initValues();
    }, [post.title, post.content, post.imageUrl, post.publicId, post.catName, post.links])

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

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        if (!title || !content) {
            // setError("Title and content are required");
            const errorMessage = "Title and content are required";
            toast.error(errorMessage)
            return;
        }
        try {
            const res = await fetch(`/api/posts/${post.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    links,
                    categories,
                    selectedCategory,
                    imageUrl,
                    publicId, // Fixed camel case
                }),
            });

            if (res.ok) {
                // Rest of your code here
                toast.success("Post created successfully")
                router.refresh();
                router.push('/dashboard')
            }
        } catch (error) {
            // Handle errors here
            toast.error("Something went wrong")
            console.error("Error:", error);
        }

    }

    const handleImageUpload = (result: CldUploadWidgetResults) => {

        console.log(result);
        const info = result.info as object;

        if ("secure_url" in info && "public_id" in info) {
            const url = info.secure_url as string;
            const public_id = info.public_id as string;
            setImageUrl(url);
            setPublicId(public_id);
            console.log(url);
            console.log(public_id);
        }


    }

    const removeImage = async (e: React.FormEvent) => {

        e.preventDefault();

        try {

            const res = await fetch('/api/removeImage', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ publicId })
            })

            if (res.ok) {
                setImageUrl("");
                setPublicId("")
            }
        } catch (error) {

            console.log(error);

        }
    }

    return (
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    type="text" placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title} />
                <textarea placeholder="Content" onChange={(e) => setContent(e.target.value)}
                    value={content}></textarea>
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
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                            </svg>
                        </span>
                        Add
                    </button>
                </div>
                <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    className={`h-48 border-2 mt-4 border-dotted grid place-items-center bg-slate-100 rounded-md relative 
                ${imageUrl && "pointer-events-none"}`}
                    onUpload={handleImageUpload}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </div>
                    {
                        imageUrl &&
                        <Image
                            src={imageUrl}
                            fill
                            className="absolute object-cover inset-0"
                            alt={"title"}
                        />
                    }
                </CldUploadButton>

                {publicId &&
                    <button onClick={removeImage}
                        className="py-2 px-4 rounded-md font-bold w-fit bg-red-600 text-white mb-4">
                        Remove Image
                    </button>
                }
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-3 rounded-md border appearence-none"
                    value={selectedCategory}
                >
                    <option value="">Select A Category</option>
                    {
                        categories && categories.map((category) => (
                            <option key={category.id} value={category.catName}>
                                {category.catName}
                            </option>
                        ))
                    }
                </select>
                <button className="primary-btn" type="submit">Create Post</button>
                {/* {error && <div className="p-2 text-red-500 font-bold">{error}</div>} */}
            </form>
        </div>
    )
}