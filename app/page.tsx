import Image from 'next/image'
import CategoriesList from '@/components/CategoriesList'
import Post from '@/components/Post'
import { postsData } from '@/data'

export default function Home() {
  return (
   <div>
    <CategoriesList/>
    {postsData && postsData.length > 0 ? (
      postsData.map((post) => 
      <Post key={post.id} 
      id={post.id} 
      author={post.author}
      authorEmail={'test@email.com'} 
      date={post.datepublished} 
      thumbnail={post.thumbnail}
      category={post.category} 
      title={post.title} 
      content={post.content} 
      links={post.links || []}/>
      )
    ):(
      <div>No posts to display</div>
    )}
    
    </div>
  )
}
