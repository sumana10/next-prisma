import { postsData } from "@/data"
import Post from "@/components/Post"
import Link from "next/link"
export default function Dashboard() {
  return (
    <div>
      {postsData && postsData.length > 0 ? (
        postsData.map((post) =>
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