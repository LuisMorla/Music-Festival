document.addEventListener('DOMContentLoaded', function () {
  appRun();
});

function appRun() {
  CreateGalery();
}

function CreateGalery() {
  const galery = document.querySelector('.images-galery');

  for(let i = 1; i <= 12; i++){
    const images = document.createElement('picture');
    images.innerHTML = `
    
       <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img src="build/img/thumb/${i}.jpg" alt="Imagen thumb">
    `;


    images.onclick = function(){
      showImage(i);
    }
    galery.appendChild(images);
  }
}


function showImage(id){
  const images = document.createElement('picture');
  images.innerHTML = `
  
     <source srcset="build/img/grande/${id}.avif" type="image/avif">
      <source srcset="build/img/grande/${id}.webp" type="image/webp">
      <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen ${id}">
  `;

  const overlay = document.createElement('DIV');
  overlay.appendChild(images);
  overlay.classList.add('overlay');
  overlay.onclick = function(){
    const body = document.querySelector('body');
    body.classList.remove('fixed-body');
    overlay.remove();
  }

  //Botton for close modal
  const closeModal = document.createElement('P');
  closeModal.textContent = 'X';
  closeModal.onclick = function(){
    const body = document.querySelector('body');
    body.classList.remove('fixed-body');
    overlay.remove();
  };
  closeModal.classList.add('btn-close');
  overlay.appendChild(closeModal);


  const body = document.querySelector('body');
  body.appendChild(overlay);
  body.classList.add('fixed-body');
}