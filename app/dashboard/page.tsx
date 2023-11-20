import { postsData } from "@/data"
import Post from "@/components/Post"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
import { TPost } from "../types"

const getPosts = async (email: string): Promise<TPost[] | null> => {

  try {

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/author/${email}`);
    const { posts } = await res.json();
    return posts;

  } catch (error) {
    return null;
  }
}

export default async function Dashboard() {

  const session = await getServerSession(authOptions);

  const email = session?.user?.email;

  let posts: TPost[] | null = [];

  if (!session) {
    redirect("/sign-in");
  }

  if (email) {
    posts = await getPosts(email)
  }

  console.log(posts);
  return (
    <div>
      {posts && posts.length > 0 ? (
        posts.map((post) =>
          <Post key={post.id}
            {...post} />
        )
      ) : (
        <div className="py-6">
          No posts created yet
          <Link className="underline" href={`/create-post/`}>Create New</Link>
        </div>
      )}

    </div>
  )
}