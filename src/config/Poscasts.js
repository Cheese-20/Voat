import { useEffect } from "react";

class PodcastShows{
    constructor(id, title,description,seasons,image , genres,updated){
        this.id = id;
        this.title = title;
        this.description = description;
        this.seasons = seasons;
        this.image = image;
        this.genres =genres;
        this.updated = updated;
    }
}

export const NonRenderComp = ()=>{
    useEffect(()=>{
        fetchData();
    },[])
    return console.log("data loaded")
}

// let show
const fetchData = ()=>{
    fetch("https://podcast-api.netlify.app/shows")
    .then(response => console.log(response))
    .catch(error => console.log(error))
   
}

// runs one when the array first renders 





export default PodcastShows ;