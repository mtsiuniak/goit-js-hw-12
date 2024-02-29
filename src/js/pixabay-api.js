import axios from "axios";


export async function getPictures(picture, limit, page) {
    try {
        const url = `https://pixabay.com/api/?key=42459429-d6d7a0fe637ea3675bc35ddeb&q=${picture}&page=${page}&per_page=${limit}`;
        const response = await axios.get(url)
        return response.data;
    } catch (error){
        console.log(error)
    }
    
    

    
}
