// Один просмотрщик обслуживает отдельные вещи и композицию целиком.
const modal=document.querySelector('dialog'),content=modal.querySelector('.zoom-content');let prior;
function show(source,ratio,whole=false){
  prior=source;content.replaceChildren();
  const width=Math.min(innerWidth*.86,innerHeight*.77*ratio,1100);
  content.style.width=width+'px';content.style.setProperty('--zoom-ratio',ratio);
  if(whole){const clone=source.cloneNode(true);clone.removeAttribute('role');clone.removeAttribute('tabindex');clone.querySelectorAll('button').forEach(b=>{b.disabled=true;b.tabIndex=-1});clone.querySelectorAll('img').forEach(i=>i.loading='eager');content.append(clone)}
  else{const image=source.querySelector('img').cloneNode(true);image.loading='eager';content.append(image)}
  modal.showModal();
}
document.querySelectorAll('.picture').forEach(piece=>piece.addEventListener('click',event=>{event.stopPropagation();show(piece,Number(piece.dataset.ratio))}));
document.querySelectorAll('.composition').forEach(stage=>{stage.addEventListener('click',e=>{if(!e.target.closest('.picture'))show(stage,1000/1120,true)});stage.addEventListener('keydown',e=>{if(e.target===stage&&(e.key==='Enter'||e.key===' ')){e.preventDefault();show(stage,1000/1120,true)}})});
modal.querySelector('.zoom-close').addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});modal.addEventListener('close',()=>{content.replaceChildren();prior?.focus({preventScroll:true})});
