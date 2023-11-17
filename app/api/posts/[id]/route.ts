import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(id);
    const post = await prisma.post.findUnique({ where: { id } })
    return NextResponse.json(post);
  } catch (error) {

    return NextResponse.json({ message: "Couldn't get reponse" }, { status: 500 })
  }
}

export async function PUT(req: Request,
  { params }: { params: { id: string } }) {

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, content, links, selectedCategory, imageUrl, publicId } = await req.json();

  const id = params.id;
  console.log(id);

  try {

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        links,
        catName: selectedCategory,
        imageUrl,
        publicId,
      },
    });

    return NextResponse.json(post);

  } catch (e) {

    return NextResponse.json({ message: "Error editing post" })
  }

}

export async function DELETE(req: Request,
  { params }: { params: { id: string } }) {

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;

  try {

    const post = await prisma.post.delete({ where: { id } });

    return NextResponse.json(post)

  } catch (error) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }
}