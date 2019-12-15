
$('document').ready(function () {
/// const

const widthHeader = $('header').width(); 
// menu
    $('.sub-menu ul').hide();
    $('.sub-menu a').click(function() {
    $(this).parent('.sub-menu').children('ul').slideToggle('100');
    $(this).find('.right').toggleClass('fa-caret-up fa-caret-down');
    });
// toggle-menu
    $('#toggle_menu').on('click', function() {
        $(this).toggleClass('active')
        $(this).css('pointerEvents', 'none');
        $('.profile_info').fadeToggle()
        if( $('.container_head').hasClass('active')){
            $('.container_head').removeClass('active')
            $('.container_head').css({
                transform: `translateX(${0}px)`,
            })
        } else {
            $('.container_head').addClass('active')
            $('.container_head').css({
                transform: `translateX(${widthHeader}px)`,
            })
        }
        $('#top').toggleClass('active')
        setTimeout(() => {
            $(this).css('pointerEvents', 'auto');
        }, 800);
    })


    // figure

        let mas = $('.main_information .figure')
        for (let index = 0; index < mas.length; index++) {
            const element = mas[index];
            const color = {
                1 : '#C2185B',
                2 : '#F8BBD0',
                3 : '#536DFE',
                4 : '#757575',
                5 : '#212121',
                6 : '#E91E63',
            }
            $(element).attr({
                'src' : `img/svg/icons/${Math.floor(Math.random() * 18) + 1}.svg`,
                'width':`${Math.floor(Math.random() * 80) + 30}px`,
            })
         /*    $(element).css({
                'stroke' : `${color[Math.floor(Math.random() * 5 + 1) + 1]}`,
            }) */
        }
})



