
const menu=document.querySelector('.menu-toggle');const navlinks=document.getElementById('navlinks');function closeMenu(){navlinks.classList.remove('open');menu.setAttribute('aria-expanded','false')}menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';navlinks.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open))});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const formFrame=document.getElementById('inquiry-google-form');
if(formFrame){
 const params=new URLSearchParams(location.search);
 const topic=(params.get('topic')||'').slice(0,150),product=(params.get('product')||'').slice(0,150);
 if(topic||product){
  const context=[topic,product].filter(Boolean).join(' / ');
  const note=document.getElementById('inquiry-context');note.textContent='本次詢問：'+context;note.hidden=false;
  const url=new URL(formFrame.src);
  url.searchParams.set('entry.586340792','我想詢問：'+context+'。\n');
  formFrame.src=url.href;
  url.searchParams.delete('embedded');document.getElementById('google-form-link').href=url.href;
 }
}
document.getElementById('year').textContent=new Date().getFullYear();
