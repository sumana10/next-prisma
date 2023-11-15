import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const {title, content, links, selectedCategory, imageUrl, publicId} = await req.json();

    const authorEmail = "sumanaonlyme@gmail.com"

    if(!title || !content){

        return NextResponse.json(
            {error: "Title and content are required"},
            {status: 500}
        )
    }

    try {

        const newPost = await prisma.post.create({
            data:{
                title, content, links, imageUrl, publicId, catName: selectedCategory, authorEmail,
            }
        })

        console.log("Post created");
        return NextResponse.json(newPost);
        
    } catch (error) {

        return NextResponse.json({message: "Couldn't create post"})
        
    }
}

    export async function GET(){
        try{
            const posts = await prisma.post.findMany({include: {author:{ select: {name: true}}},
            orderBy:{
                createdAt: "desc",
            },
            });

            return NextResponse.json(posts)
        }
        catch(error){
            console.log('Error fetching posts')
            return NextResponse.json({message:"Error fetching posts"}, {status: 500});
        }
    }

