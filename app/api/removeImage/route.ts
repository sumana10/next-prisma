import cloudinary from "cloudinary";
import {NextResponse} from "next/server"

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const removeImage = async(publicId: string) =>{
    try {
        
    } catch (error) {
        
    }
}
export async function POST(req: Request){
    return NextResponse.json({message: "success"})
}