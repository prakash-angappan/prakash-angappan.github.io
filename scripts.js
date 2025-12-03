document.addEventListener('DOMContentLoaded', function(){
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // optional: highlight active nav button on landing (visual only)
  var path = location.pathname.split('/').pop();
  document.querySelectorAll('.big-btn').forEach(function(b){
    var href = b.getAttribute('href');
    if(href === path) b.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
  });
});
