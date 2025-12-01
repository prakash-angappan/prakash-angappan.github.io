// small script: set year and smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function(){
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      var targetId = anchor.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // update hash without jumping
        history.pushState(null, '', '#' + targetId);
      }
    });
  });
});
