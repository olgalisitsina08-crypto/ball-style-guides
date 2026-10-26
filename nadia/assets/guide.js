const modal=document.querySelector('dialog'),content=modal.querySelector('.zoom-content'),title=document.querySelector('#zoom-title');
let prior;
document.querySelectorAll('.piece').forEach(piece=>piece.addEventListener('click',()=>{
  prior=piece;const photo=piece.querySelector('img').cloneNode();
  photo.removeAttribute('style');photo.loading='eager';
  content.replaceChildren(photo);title.textContent=piece.dataset.title;
  modal.showModal();document.body.style.overflow='hidden';
}));
modal.querySelector('.zoom-close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',event=>{const r=modal.getBoundingClientRect();if(event.target===modal&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))modal.close()});
modal.addEventListener('close',()=>{document.body.style.overflow='';content.replaceChildren();prior?.focus({preventScroll:true})});
