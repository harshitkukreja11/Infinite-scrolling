const gallery=document.getElementById("gallery");
let page=1;
const limit=10;
let loading=false;

const fetchPhotos=async()=>{
    try {
        const response=await fetch("https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}");
        const photos=await response.json();
        return photos;

        
    } catch (error) {
        console.error("error fetching photos:",error);
        return []

        
    }
}
const loadPhotos=async()=>{
    if (loading) return;
    loading=true;
    const photos=await fetchPhotos();
    photos.forEach(photo=>{
        const img=document.createElement("img");
        img.src=photo.url;
        img.alt=photo.title;
        gallery.appendChild(img);

    });
    page++;
    loading=false;

}
const handleScroll=()=>{
    const{scrollTop,scrollHeight,clientHeight}=document.documentElement;
    if(scrollTop+clientHeight>=scrollHeight-5){
        loadPhotos();
    }
}

window.addEventListener("scroll",handleScroll);
window.addEventListener("load",loadPhotos);