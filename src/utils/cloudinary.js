import { v2 as cloudinary} from 'cloudinary'
import fs from "fs";

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET      
});

const uploadCloudinary = async (localFilePath) => {
    
    try {
        if(!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uplaoded successfully
        // console.log("file is uploaded on cloudinary", response.url);
        console.log(response)
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

const deleteCloudinary = async (publicId) => {
    try {
        if(!publicId) return null;
    
        const deleteResponse = await cloudinary.uploader.destroy(publicId)
    
        console.log(deleteResponse);
    
        return deleteResponse
    } catch (error) {
        console.error('Error deleting file from Cloudinary:', error);
        return null;
    }
}

export {uploadCloudinary}