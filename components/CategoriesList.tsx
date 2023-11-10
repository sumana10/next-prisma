import {categoriesData} from "@/data";
import React from 'react'
import Link from "next/link";

const CategoriesList = () => {
  return (
    <div className="flex gap-2 text-sm flex-wrap">
       {categoriesData && categoriesData.map((category)=>(
        <Link className="px-4 py-1 rounded-md bg-slate-800 text-white cursor-pointer" href={`/categories/${category.name}`}>{category.name}</Link>
       ))}
    </div>
  )
}

export default CategoriesList