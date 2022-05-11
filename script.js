const imagecontainer =document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
//Unsplash Api
const count = 20 ;
const apiKEY = 'dfHNPhka1sQdp8fZ9SN4XNDzil5O4DT-EstFqFwcxrU';
// const apiKEY = 'TN8AORASIT--o6fEB9lpYqiu9fCg0s307A-u554NN8U';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`;

//Check if all image wer loaded

 function imgloaded(){
     imagecontainer.hidden  = false;
     console.log("helo")
     loader.style.display = 'none'
 }

//Helper Function to set Attribut

//Create Elements For Link & Photos Add Dom
function displayphotos(){
   // Run function for each object in photosArray
   photosArray.forEach ((photo) =>{
    //creat <a> to link to Unsplash
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target','_blank');

   

    // Creat img> for photo
    const img = document.createElement('img');
    // img.setAttribute('scr', photo.urls.regular);
    img.setAttribute('src' , photo.urls.regular  )
    img.setAttribute('alt', photo.alt_description);
   img.setAttribute('title', photo.alt_description);

//    Event Listener, check when 

    img.addEventListener('load', imgloaded);

    //put img insid <a>
    console.log(photo.urls.regular)
    item.appendChild(img);
    imagecontainer.appendChild(item);
    imgloaded();
   });
}


//Get photos from unsplash api

async function getphotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayphotos();
    } catch (error){
        //Catch Error here
        displayphotos();

    }
}


//Check to see if Scrolling near
window.addEventListener("scroll" , () =>{
    if(window.scrollY >= document.body.offsetHeight - 1000 ) {
        getphotos()
        console.log("h")
    }
});



//on loader
getphotos();