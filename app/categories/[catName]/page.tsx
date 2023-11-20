import { TPost } from "@/app/types";
import Post from "@/components/Post";

const getPosts = async (catName: string): Promise<TPost[] | null> => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories/${catName}`, {
            cache: "no-store"
        })

        if (res.ok) {

            const categories = await res.json();
            const posts = await categories.posts;

            return posts;
        }
    } catch (error) {

        console.log(error);

    }
    return null;
}

export default async function CategoryPosts({ params }: { params: { catName: string } }) {

    const category = params.catName;

    const posts = await getPosts(category);

    return (
        <>
            <h1 className="font-normal">Category: {decodeURIComponent(category)}</h1>
            {posts && posts.length > 0 ? (
                posts.map((post) =>
                    <Post key={post.id}
                        {...post} />
                )
            ) : (
                <div>No posts to display</div>
            )}
        </>
    )

}