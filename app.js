
const menu=document.querySelector('.menu-toggle');const navlinks=document.getElementById('navlinks');function closeMenu(){navlinks.classList.remove('open');menu.setAttribute('aria-expanded','false')}menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';navlinks.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open))});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const topic=document.getElementById('inquiry-topic');
if(topic){
 const params=new URLSearchParams(location.search),requested=params.get('topic');
 if([...topic.options].some(o=>o.value===requested))topic.value=requested;
 const details=document.getElementById('inquiry-details'),product=params.get('product');
 if(product)details.value='我想了解「'+product.slice(0,150)+'」的配置、報價與安排。';
 document.getElementById('inquiry-form').addEventListener('submit',e=>{
  e.preventDefault();
  if(!details.value.trim()){details.setCustomValidity('請填寫你的問題。');details.reportValidity();return;}
  const name=document.getElementById('inquiry-name').value.trim(),email=document.getElementById('inquiry-email').value.trim();
  const subject='鈞展科技｜'+topic.value+'詢問';
  const body=['您好，我想向鈞展科技詢問：',...(name?['稱呼／單位：'+name]:[]),...(email?['聯絡信箱：'+email]:[]),'詢問項目：'+topic.value,'','我的問題：',details.value.trim(),'','謝謝。'].join('\n');
  const recipient='water19941010@gmail.com';
  const mailto='mailto:'+recipient+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  document.getElementById('email-compose').href=mailto;
  document.getElementById('gmail-compose').href='https://mail.google.com/mail/?'+new URLSearchParams({view:'cm',fs:'1',to:recipient,su:subject,body});
  document.getElementById('message-result').hidden=false;
  window.location.href=mailto;
 });
 details.addEventListener('input',()=>details.setCustomValidity(''));
}
document.getElementById('year').textContent=new Date().getFullYear();
