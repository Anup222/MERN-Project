const openWaitlistButtons=document.querySelectorAll('[data-waitlist-target]');
const closeWaitlistButtons=document.querySelectorAll('[data-close-button]');
const overlay=document.getElementById('overlay');

let btnBusiness=document.querySelector('#btnBusiness');
let btnIndividual=document.querySelector('#btnIndividual');
let border1=document.querySelector('#border1');
let border2=document.querySelector('#border2');
let content1=document.querySelector('#content1');
let content2=document.querySelector('#content2');

btnBusiness.addEventListener('click',()=>{
    content1.innerHTML='Company Name';
    content2.innerHTML='Company Name';
    border1.classList.add('active')
    btnBusiness.classList.add('active')
    border2.classList.remove('active')
    btnIndividual.classList.add('active')

});
btnIndividual.addEventListener('click',()=>{
    content1.innerHTML='Full Name';
    content2.innerHTML='Full Name';
    border1.classList.remove('active')
    btnBusiness.classList.remove('active')
    border2.classList.add('active')
    btnIndividual.classList.remove('active')
});

openWaitlistButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        const waitlist=document.querySelector(button.dataset.waitlistTarget)
        openWaitlist(waitlist)
    });
});
overlay.addEventListener('click', ()=>{
    const waitlist=document.querySelectorAll('.waitlist.active')
    waitlist.forEach(waitlist=>{
        closeWaitlist(waitlist)
    });
});
closeWaitlistButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        const waitlist=button.closest('.waitlist')
        closeWaitlist(waitlist)
    });
});
function openWaitlist(waitlist){
    if(waitlist==null)return
    waitlist.classList.add('active')
    overlay.classList.add('active')
};
function closeWaitlist(waitlist){
    if(waitlist==null)return
    waitlist.classList.remove('active')
    overlay.classList.remove('active')
};
function changeTextBusiness(){
    document.getElementById("f-name").innerHTML=("Company Name");
};

// for smooth scrolling
function wheel(event) {
    var delta = 0;
    if (event.wheelDelta) {(delta = event.wheelDelta / 120);}
    else if (event.detail) {(delta = -event.detail / 3);}

    handle(delta);
    if (event.preventDefault) {(event.preventDefault());}
    event.returnValue = false;
}

function handle(delta) {
    var time = 1000;
    var distance = 150;

    $('html, body').stop().animate({
        scrollTop: $(window).scrollTop() - (distance * delta)
    }, time );
}

if (window.addEventListener) {window.addEventListener('DOMMouseScroll', wheel, false);}
  window.onmousewheel = document.onmousewheel = wheel;