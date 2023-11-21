import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface PostProps {
    id: string;
    author: {
        name: string | undefined;
    };
    createdAt: string;
    thumbnail?: string;
    imageUrl?: string;
    authorEmail?: string;
    title: string;
    content: string;
    links?: string[] | null;
    catName?: string | undefined;
}

export default async function Post(
    props: PostProps) {

    const { id,
        author,
        createdAt,
        thumbnail,
        imageUrl,
        authorEmail,
        title,
        content,
        links,
        catName
    } = props

    console.log(thumbnail);

    const session = await getServerSession(authOptions)

    const isEditable = session && session?.user?.email === authorEmail;

    const dateObject = new Date(createdAt);

    const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
    };

    const formattedDate = dateObject.toLocaleDateString("en-US", options);


    return (
        <div className="my-4 border-b border-b-300 py-8 ">
            <div className="mb-2">
                {author ? (<>
                    Posted by:
                    <span className="font-bold mx-1">
                        {author.name}
                    </span>
                     on {formattedDate}
                </>) : (<>
                    Posted by:
                     on {formattedDate}
                </>)}
            </div>
            <div className="w-full h-72 relative">
                {imageUrl ? (<Image src={imageUrl} alt={title} fill
                    className="object-cover rounded-md object-center" />) : (
                    <Image src={'/thumbnail-placeholder.png'} alt={title} fill
                        className="object-cover rounded-md object-center" />
                )}
            </div>
            {catName && (<Link
                className="bg-slate-800 
                 w-fit
                 text-white 
                 px-4 py-0.5 
                 text-sm font-bold
                 rounded-md mt-4 block"
                href={`categories/${catName}`}>{catName}</Link>)}
            <h2>{title}</h2>
            <p className="content">{content}</p>
            {links && (
                <div className="my-4 flex flex-col gap-3">
                    {links.map((link, i) =>
                        <div key={i} className="flex gap-2 flex-center">
                            <Image src="/link-icon.svg" alt="link" width={24}
                                height={24} />
                            <Link className="link"
                                href={link}>
                                {link}
                            </Link>
                        </div>
                    )}
                </div>
            )}
            {
                isEditable && (
                    <div className="flex gap-3 font-bold py-2 px-4 rounded-md bg-slate-800 text-white  w-fit">
                        <Link href={`/edit-post/${id}`}>Edit</Link>
                        <DeleteButton id={id} />
                    </div>
                )
            }
        </div>
    )
}