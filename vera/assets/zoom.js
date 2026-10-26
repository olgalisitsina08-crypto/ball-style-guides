// Один просмотрщик каждой вещи: исходное фото целиком и понятное название.
const modal=document.querySelector('dialog'),content=modal.querySelector('.zoom-content'),title=modal.querySelector('.zoom-title');
let prior;
document.querySelectorAll('.composition').forEach(stage=>{
  stage.tabIndex=0;stage.setAttribute('aria-label','Увеличить образ целиком');
  const showWhole=()=>{prior=stage;const copy=stage.cloneNode(true);copy.removeAttribute('tabindex');copy.querySelectorAll('button').forEach(b=>{b.disabled=true;b.tabIndex=-1});copy.querySelectorAll('img').forEach(i=>i.loading='eager');content.replaceChildren(copy);title.textContent='Образ';modal.showModal();document.body.style.overflow='hidden'};
  stage.addEventListener('click',event=>{if(!event.target.closest('button'))showWhole()});
  stage.addEventListener('keydown',event=>{if(event.target===stage&&['Enter',' '].includes(event.key)){event.preventDefault();showWhole()}});
});
document.querySelectorAll('.picture').forEach(piece=>piece.addEventListener('click',()=>{
  prior=piece;
  const photo=piece.querySelector('img').cloneNode();
  photo.removeAttribute('style');photo.removeAttribute('class');photo.loading='eager';
  content.replaceChildren(photo);title.textContent=piece.dataset.title;
  modal.showModal();document.body.style.overflow='hidden';
}));
modal.querySelector('.zoom-close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',event=>{const r=modal.getBoundingClientRect();if(event.target===modal&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))modal.close()});
modal.addEventListener('close',()=>{document.body.style.overflow='';content.replaceChildren();prior?.focus({preventScroll:true})});
