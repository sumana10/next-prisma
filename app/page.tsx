import Image from 'next/image'
import CategoriesList from '@/components/CategoriesList'
import Post from '@/components/Post'
import { TPost } from './types'
// import { postsData } from '@/data'

const getPosts = async (): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, { cache: "no-store", })
    if (res.ok) {
      const posts = await res.json();
      return posts;
    }

  } catch (error) {
    console.log(error);
  }
  return null;
}

export default async function Home() {

  const posts = await getPosts();
  console.log('posts', posts);

  return (
    <div>
      <CategoriesList />
      {posts && posts.length > 0 ? (
        posts.map((post) =>
          <Post key={post.id}
            {...post} />
        )
      ) : (
        <div>No posts to display</div>
      )}

    </div>
  )
}
