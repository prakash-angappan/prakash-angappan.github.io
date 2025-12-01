// scripts.js — accordion behavior + background application + year + mobile-disable-background
document.addEventListener('DOMContentLoaded', function(){
  // set year
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // CONFIG: allow multiple accordions to be open at once?
  // set to true -> multiple open allowed
  // set to false -> single-open behavior (opening one closes others)
  var allowMultiOpen = false;

  // mobile-disable-background: do not apply background images below this width (px)
  var minBgWidth = 900;
  var isBgAllowed = (window.innerWidth >= minBgWidth);

  // APPLY BACKGROUNDS from data-bg attributes (only if allowed)
  document.querySelectorAll('[data-bg]').forEach(function(el){
    var bg = el.getAttribute('data-bg');
    if(!bg) return;
    if(isBgAllowed){
      // we expect files under assets/ (e.g. assets/design/abstract-dark-1.jpg)
      el.style.backgroundImage = 'url("assets/' + bg + '")';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center right';
    } else {
      // ensure no large background on small screens
      el.style.backgroundImage = 'none';
    }
  });

  // ACCORDION behavior
  var accordions = Array.from(document.querySelectorAll('.accordion'));
  accordions.forEach(function(acc){
    // if single-open mode, close others when this opens
    acc.addEventListener('toggle', function(){
      if(allowMultiOpen) return; // do nothing, allow multiple open
      if(!acc.open) return; // only act when opening
      accordions.forEach(function(other){
        if(other !== acc && other.open) other.open = false;
      });
    });
  });

  // Smooth scroll for nav anchors
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      var href = anchor.getAttribute('href');
      if(!href || href.length <= 1) return;
      var targetId = href.substring(1);
      var target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        history.replaceState(null, '', '#' + targetId);
      }
    });
  });

  // OPTIONAL: on resize, re-evaluate background allowance
  window.addEventListener('resize', function(){
    var allowed = (window.innerWidth >= minBgWidth);
    if(allowed === isBgAllowed) return; // no change
    isBgAllowed = allowed;
    document.querySelectorAll('[data-bg]').forEach(function(el){
      var bg = el.getAttribute('data-bg');
      if(!bg) return;
      el.style.backgroundImage = isBgAllowed ? 'url("assets/' + bg + '")' : 'none';
    });
  });
});
