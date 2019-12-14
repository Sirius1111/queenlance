
$('document').ready(function () {
// methoods

    function myHasClass(a, b){
        let element = a;
        let customClass = b; 
        if (element.classList.contains(customClass)) {
            return true;            
        } else {
            return false;
        }
    }
    // Const and Varible
    const height = window.pageYOffset
    let header = document.querySelector("header");
    let menu = document.querySelector("nav .nav");
    let menuToggle = document.querySelector(".btn_toggle_mobile");
    let succesMessage = document.querySelector(".succes-message");
    let failedMessage = document.querySelector(".failed-message");
    let btn = document.querySelectorAll("#contact-form .btn");

    const wow = new WOW();
	// WOW
        wow.init();
    //Swiper 
    let swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 30,
        grabCursor: true,
        keyboard: {
            enabled: true,
          },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 480px
            480: {
            slidesPerView: 1,
            spaceBetween: 15
            },
            // when window width is >= 640px
            768: {
            slidesPerView: 2,
            spaceBetween: 20
            }
        }
      });

    // scroll 
    
    window.addEventListener('scroll', function() {
        let h =  window.pageYOffset;
        
        if(h > 0){
            header.classList.add("active");
            header.classList.add("no-top");
                                 
        } else if(h <= 0 && !myHasClass(menuToggle,"active")) {
            header.classList.remove("active");
            header.classList.remove("no-top");                        
        }
    });

    //  animation-svg: 
        document.getElementById("white_logo").classList.add("animate");
        setTimeout(()=>{
            document.querySelector('body').classList.remove("fixed");
            document.querySelector('.prelolader').style.opacity = 0;
            setTimeout(()=>{
                document.querySelector('.prelolader').style.display = "none";
            },500)
        }, 4990)


    // menu


    menuToggle.addEventListener('click', ()=>{
        if(!myHasClass(menuToggle,"active")){
            menuToggle.classList.add("active");
            header.classList.add("active");
            menu.classList.add("current");
            menuToggle.style.pointerEvents = "none"
            setTimeout(() => {
                menuToggle.style.pointerEvents = "auto"
            }, 500);  
        } else {
            menuToggle.classList.remove("active");
            if(!myHasClass(header, "no-top"))  {
                header.classList.remove("active");            
            }         
            menu.classList.remove("current");  
            menuToggle.style.pointerEvents = "none"
            setTimeout(() => {
                menuToggle.style.pointerEvents = "auto"
            }, 500);          
        }
    })
})




/* появление ответа от формы */

//     btn[0].classList.add("fadeOutLeft")
//     btn[1].classList.add("fadeOutRight")
//     setTimeout(() => {
//         btn[0].classList.add("not")
//         btn[1].classList.add("not")            
//         succesMessage.classList.remove("not")
//         succesMessage.classList.add("bounceIn")
//     }, 1000);