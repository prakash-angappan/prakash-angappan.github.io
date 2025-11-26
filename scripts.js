// small JS to open project modal & play embedded YouTube/Vimeo
document.getElementById('year').textContent = new Date().getFullYear();

// open project modal
document.querySelectorAll('.project-card .open-project').forEach(btn=>{
  btn.addEventListener('click', e=>{
    const card = e.target.closest('.project-card');
    const video = card.getAttribute('data-video');
    const title = card.getAttribute('data-title');
    openModal(title, video, card.querySelector('p').innerText);
  });
});

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalVideo = document.getElementById('modal-video');
const modalDesc = document.getElementById('modal-desc');
document.getElementById('modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

function openModal(title, embedUrl, desc){
  modalTitle.textContent = title;
  // create iframe
  modalVideo.innerHTML = `<iframe src="${embedUrl}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  modalDesc.textContent = desc;
  modal.setAttribute('aria-hidden','false');
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  modalVideo.innerHTML = '';
}
