import axios from "axios"

// uploading image and return image url 
const uploadImage = async (imageData) => {
    const formData = new FormData()
    formData.append('image', imageData)

    // send image data to imgbb 
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
    const image_url = data.data.display_url
    return image_url;
}

export default uploadImage ;