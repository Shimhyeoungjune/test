$(document).ready(function(){
//레이어팝업-버튼 호버하면 해당큰이미지나오기

//첫번째 이미지 먼저 나오게 하는것
$(".pop_img_a").eq(0).css({
    opacity:1
});
$(document).on('click','.pop_btn',function(){
    // console.log($(".pop_img_a").eq($(this).index()))
// 이미지체크되면 모든이미지 opacity0 으로 하고
    $(".pop_img_a").animate({
        opacity:0
    },100)
// 해당번째의 이미지를 opacity 1로해라
    $(".pop_img_a").eq($(this).index()).animate({
        opacity:1
    },100);
//체크되면 버튼에 pop_btn_toggle 클래스를 제거하고 
    $(".pop_btn").removeClass('pop_btn_boder')
 //선택한버튼에 pop_btn_toggle클래스를 추가해라   
    $(this).addClass('pop_btn_boder')
    
})

$(document).on('click','.pop_chk2',function(){
    $('.layer_pop').css({
        display:'none'
    })
})

$(document).on('click','#pop_chk',function(){
    $('#pop_chk').prop('checked',true)
    setTimeout(function(){
    $('.layer_pop').css({
        display:'none'
    })
    },100)
})
// 레이어팝업 끌고 다니기
let mouseX = 0;
let mouseY = 0;
$('.layer_pop').mousedown(function(){
    // event.preventDefault();

    // 화면 왼쪽 위 기준 마우스 좌표 구하기
    mouseX = event.clientX - $('.layer_pop').position().left;
    mouseY = event.clientY - $('.layer_pop').position().top;

    $(document).on('mousemove', function(){
        let m_x = event.clientX;
        let m_y = event.clientY;
 
        console.log(m_x - mouseX,m_y - mouseY)
        $('.layer_pop').css({
            left: m_x - mouseX,
            top: m_y - mouseY
        })
    });    
});

$(document).mouseup(function(){
    $(document).off('mousemove')
});







//header  +2000 자동움직임
let chk = true
setInterval(function(){

if(chk){
    $('.inner_txt_box div:nth-child(2) div').animate({
        bottom:"-7px"
    },500)
}
else {
    $('.inner_txt_box div:nth-child(2) div').animate({
        bottom:"-10px"
    },500)
}
chk =!chk

},500)




/**********  mid search   *************/
let tb_curr_idx = 0;
let tb_count = $('.mid_search_t_item').length;
$('.mid_search_t_item').eq(tb_curr_idx).css({top: 0})
setInterval(function(){
    // 나갈거
    $('.mid_search_t_item').eq(tb_curr_idx % tb_count).animate({
        top: '-100%'
    }, 500)

    // 들어올거
    $('.mid_search_t_item').eq((tb_curr_idx+1) % tb_count).css({
        top: '100%'
    }).animate({
        top: '0%'
    }, 500)
    tb_curr_idx++;
}, 3000)

//mid input 박스 -가로 길어지는거
//focusin ,out 으로 가능

$('.mid_search_b input').focusin(function(){
    
    $('.mid_search').animate({
        width:'250px'
    },500)
})
$('.mid_search_b input').focusout(function(){
    
    $('.mid_search').animate({
        width:'200px'
    },500)
})


// $('.mid_search_b input').off('click')

//==========meun item 호버시 pan100%=====


$('.menu_item, .pan').hover(function(){

    console.log($(this).prop('class'))
    // 100판 펼치기
    $('.pan').addClass('pan_active')
    /* menu_item에 마우스 올려서 pan 펼쳐놨어도 pan으로 마우스가 이동하면 hover가 풀린다.
    그래서  pan 한테도 똑같이 hover를 먹인다. 대신 pan에 마우스가 올라간 경우에 pan_item은 영향을 받지 않아야 한다.
    */
    // if($(this).prop('class') == "menu_item") {
    if($(this).hasClass('menu_item')) {
    // if($(this).prop('class') != "pan") {
    // if(!$(this).hasClass('pan')) {
        // 판 안에 특정 번째꺼 나타나게 하기 - display: block 
        $('.pan_item').removeClass('pan_active')
        
    }



}, function(){
    // 100판 접기
    $('.pan').removeClass('pan_active')
})

/*************  메인배너 **************/
    /*************************************/
    // css에서 banner0 한테 left:0 주던가 여기서 이거로 주던가
    $('.banner').eq(0).css({left: 0});

    // 배너 개수에 맞춰서 인디케이터 생성하기
    let bn_count = $('.banner').length;
    for(let i=0; i<bn_count; i++) { 
        $('.indicator').append(`<div class="indi"></div>`)
    }
    $('.indi').eq(0).addClass('indi_active')


    
    let curr_idx=0;
    let timer = 1000; // 모든 애니메이션에 적용될 시간
    $('#btn_slide_R').click(function(){ 
        버튼막기() 
        slide(curr_idx % bn_count, '-100%', (curr_idx+1) % bn_count, '100%',timer);
        curr_idx += 1;
    });

    $('#btn_slide_L').click(function(){ 
        버튼막기() 
        slide(curr_idx % bn_count, '100%', (curr_idx-1) % bn_count, '-100%',timer);
        curr_idx -= 1;
    })

    function slide(o_idx, o_pos, c_idx, c_pos, t) {
        // 나갈방
        $('.banner').eq(o_idx).animate({
            left: o_pos
        }, t)

        // 들어올방
        $('.banner').eq((c_idx)).css({
            left: c_pos
        }).stop(true).animate({
            left: 0
        }, t)

        $('.indi').eq(o_idx).removeClass('indi_active');
        $('.indi').eq(c_idx).addClass('indi_active');

        // curr_idx = c_idx;
    }
/*
            - 왼쪽버튼 기능 만들기
            - auto_slide 만들기
            - main_banner에 마우스오버시 멈춤
                            마우스아웃시 다시 auto_slide 동작
        */
    function 버튼막기() {
        // 버튼 막기
        $('.btn_slide').css({pointerEvents:'none'})
        setTimeout(function(){
            $('.btn_slide').css({pointerEvents:'auto'})
        }, timer)
    }

    let interval;
    function auto_slide() {
        interval=setInterval(function(){
            $('#btn_slide_R').trigger('click')
        }, timer+2000)
    }
    auto_slide()

    $('.main_banner').hover(function(){
        clearInterval(interval)
    }, function(){
        auto_slide()
    })




    $('.indi').click(function(){
        let colored = $('.indi_active').index();
        let clicked = $(this).index();

        if(colored < clicked) {  
            버튼막기()  
            slide(colored, '-100%', clicked, '100%', timer); 
            curr_idx = clicked ;
        }
        else if(colored > clicked) {
            버튼막기() 
            slide(colored, '100%', clicked, '-100%',timer);
            curr_idx = clicked ;
        }
    })


//  onepic 작은슬라이드 데이터불러오기.
for(let i=0; i<8; i++) {
    
    let item = `<div class="onepick_li">
                    <a href="777.(상세)샤이닝홈.html?cateNo=0&itemNo=${i}">
                    
                        <img src="${ITEM_LIST[0][i].src}" alt="" class="onepick_li_img">
                        <div class="onepick_title">${ITEM_LIST[0][i].title}</div>
                        <div class="onepick_o_price"><del>${(ITEM_LIST[0][i].o_price).toLocaleString("ko")+"원"}</del></div>
                        <div class="onepick_s_price">${(ITEM_LIST[0][i].s_price).toLocaleString("ko")
                    +"원"}</div>
                    </a>
                    
                </div>`
                
    $('.onepick_ul').append(item)
    }


// onepick 슬라이드

let item_size = $('.onepick_li').eq(0).outerWidth();
        let item_length = $('.onepick_li').length;

        for(let i=0; i<item_length; i++) {
            $('.onepick_li').eq(i).css({ left: item_size * i })
            /*
            .item0 { left: calc(100% / 3 * 0)}
            .item1 { left: calc(100% / 3 * 1)}
            .item2 { left: calc(100% / 3 * 2)}
            .item3 { left: calc(100% / 3 * 3)}
            .item4 { left: calc(100% / 3 * 4)}
            */
        }

        // 배너 개수에 맞춰서 인디케이터 생성하기
        let bang_bn_count = $('.onepick_li').length;
        for(let i=0; i<bang_bn_count; i++) { 
            $('.bang_indi').append(`<div class="bang_circle">${i+1}</div>`)
        }
        $('.bang_circle').eq(0).addClass('bang_circle_active')
/********************************************/
/****************  초기화 끝  ****************/
/********************************************/

        let bang_timer = 500;
        let bang_no = 0
        $(document).on('click','.btn_item_R',function(){
            prevent_btn_slide()

            // 전체 item 들 200씩 왼쪽으로 이동
            $('.onepick_li').animate({
                left: `-=${item_size}px`
            }, bang_timer, 'linear')

            // 특정 번째꺼만 반대쪽 끝으로 이동
            $('.onepick_li').eq(bang_no % item_length).animate({
                left: item_size * (item_length - 1)
            },0)

            // $('.bang_circle').removeClass('bang_circle_active')
            // $('.bang_circle').eq((bang_no+1)%item_length).addClass('bang_circle_active')

            bang_no+=1;
            
            // $('.bang_circle').removeClass('bang_circle_active')
            // $('.bang_circle').eq((bang_no)%item_length).addClass('bang_circle_active')
            indi_color_chk((bang_no)%item_length);
        })
        $(document).on('click','.btn_item_L',function(){
            prevent_btn_slide()

            bang_no-=1;

            // 특정 번째꺼만 반대쪽 끝으로 이동
            $('.onepick_li').eq((bang_no) % item_length).animate({
                left: item_size * -1
            },0)

            // 전체 item 들 200씩 오른쪽으로 이동
            $('.onepick_li').animate({
                left: `+=${item_size}px`
            }, bang_timer, 'linear')
            

            // $('.bang_circle').removeClass('bang_circle_active')
            // $('.bang_circle').eq((bang_no)%item_length).addClass('bang_circle_active')
            indi_color_chk((bang_no)%item_length);
        })

        // 인디케이터 색 변경 함수
        function indi_color_chk(bang_indi_idx) {
            $('.bang_circle').removeClass('bang_circle_active')
            $('.bang_circle').eq(bang_indi_idx).addClass('bang_circle_active')
        }

        // 인디케이터 클릭시 방 이동
        $(document).on('click', '.bang_circle', function(){
            let colored = $('.bang_circle_active').index();
            let clicked = $(this).index();

            let cal = colored - clicked;

            // 색칠된거보다 오른쪽꺼(큰거) 누르면 음수
            if(cal < 0) { 
                // for(let i=0; i<(cal)*-1; i++) {
                for(let i=0; i<Math.abs(cal); i++) {
                    $('.btn_item_R').trigger('click')
                }
            }
            // 색칠된거보다 왼쪽꺼(작은거) 누르면 양수
            else if(cal > 0) {
                for(let i=0; i<(cal); i++) {
                    $('.btn_item_L').trigger('click')
                }
            }
        });



        let bang_interval;
        function bang_slide() {
            bang_interval = setInterval(function(){
                $('.btn_item_R').trigger('click')
            }, bang_timer + 3000);
        }
        bang_slide()

        $('onepick_ul').hover(function(){
            clearInterval(bang_interval);
        }, function(){
            bang_slide()
        });

        // 버튼막기 
        function prevent_btn_slide() {
            // 버튼 막기
            $('.btn_item').css({pointerEvents:'none'})
            setTimeout(function(){
                $('.btn_item').css({pointerEvents:'auto'})
            }, bang_timer)
        }



/* ====weeky-box=== */
for(let i=0; i<12; i++) {
    let list = ITEM_LIST[1][i];
    let weekyitem1 = `<div class="weeky_li">
                    <a href="777.(상세)샤이닝홈.html?cateNo=1&itemNo=${i}">
                        <img src="${ITEM_LIST[1][i].src}" alt="" class="weeky_li_img">
                        
                        <div class="weeky_black">
                        
                            <div class="weeky_title">${ITEM_LIST[1][i].title}</div>
                            <div class="weeky_o_price"><del>${(ITEM_LIST[1][i].o_price).toLocaleString("ko")+"원"}</del></div>
                            <div class="weeky_s_price">${(ITEM_LIST[1][i].s_price).toLocaleString("ko")
                            +"원"}</div>
                        </div>
                    </a>
                        
                </div>`
                
    $('#weeky_item1').append(weekyitem1)
    }

  

for(let i=12; i<24; i++) {
    
    let weekyitem2 = `<div class="weeky_li">
                    <a href="777.(상세)샤이닝홈.html?cateNo=1&itemNo=${i}">
                        <img src="${ITEM_LIST[1][i].src}" alt="" class="weeky_li_img">
                        <div class="weeky_black">
                        <div class="weeky_title">${ITEM_LIST[1][i].title}</div>
                        <div class="weeky_o_price"><del>${(ITEM_LIST[1][i].o_price).toLocaleString("ko")+"원"}</del></div>
                        <div class="weeky_s_price">${(ITEM_LIST[1][i].s_price).toLocaleString("ko")
                        +"원"}</div>
                        </div>
                        </a>
                        
                </div>`
                
    $('#weeky_item2').append(weekyitem2)
    }

for(let i=24; i<36; i++) {
    
    let weekyitem3 = `<div class="weeky_li">
                        <a href="777.(상세)샤이닝홈.html?cateNo=1&itemNo=${i}">
                        <img src="${ITEM_LIST[1][i].src}" alt="" class="weeky_li_img">
                        <div class="weeky_black">
                        <div class="weeky_title">${ITEM_LIST[1][i].title}</div>
                        <div class="weeky_o_price"><del>${(ITEM_LIST[1][i].o_price).toLocaleString("ko")+"원"}</del></div>
                        <div class="weeky_s_price">${(ITEM_LIST[1][i].s_price).toLocaleString("ko")
                        +"원"}</div>
                        </div>
                        </a>
                            
                </div>`
                    
    $('#weeky_item3').append(weekyitem3)
    }

    for(let i=36; i<48; i++) {
    
        let weekyitem4 = `<div class="weeky_li">
                            <a href="777.(상세)샤이닝홈.html?cateNo=1&itemNo=${i}">
                            <img src="${ITEM_LIST[1][i].src}" alt="" class="weeky_li_img">
                            <div class="weeky_black">
                            <div class="weeky_title">${ITEM_LIST[1][i].title}</div>
                            <div class="weeky_o_price"><del>${(ITEM_LIST[1][i].o_price).toLocaleString("ko")+"원"}</del></div>
                            <div class="weeky_s_price">${(ITEM_LIST[1][i].s_price).toLocaleString("ko")
                            +"원"}</div>
                            </div>
                            </a>
                                
                    </div>`
                        
        $('#weeky_item4').append(weekyitem4)
        }
            
        for(let i=48; i<60; i++) {
    
            let weekyitem5 = `<div          class="weeky_li">
            <a href="777.(상세)샤이닝홈.html?cateNo=1&itemNo=${i}">
                                <img src="${ITEM_LIST[1][i].src}" alt="" class="weeky_li_img">
                                <div class="weeky_black">
                                <div class="weeky_title">${ITEM_LIST[1][i].title}</div>
                                <div class="weeky_o_price"><del>${(ITEM_LIST[1][i].o_price).toLocaleString("ko")+"원"}</del></div>
                                <div class="weeky_s_price">${(ITEM_LIST[1][i].s_price).toLocaleString("ko")
                                +"원"}</div>
                                </div>
                                </a>
                                    
                        </div>`
                            
        $('#weeky_item5').append(weekyitem5)
        }

        for(let i=60; i<72; i++) {
    
            let weekyitem6 = `<div          class="weeky_li">
            <a href="777.(상세)샤이닝홈.html?cateNo=1&itemNo=${i}">
                                <img src="${ITEM_LIST[1][i].src}" alt="" class="weeky_li_img">
                                <div class="weeky_black">
                                <div class="weeky_title">${ITEM_LIST[1][i].title}</div>
                                <div class="weeky_o_price"><del>${(ITEM_LIST[1][i].o_price).toLocaleString("ko")+"원"}</del></div>
                                <div class="weeky_s_price">${(ITEM_LIST[1][i].s_price).toLocaleString("ko")
                                +"원"}</div>
                                </div>
                                </a>
                                    
                        </div>`
                            
        $('#weeky_item6').append(weekyitem6)
        }
//=========arrival item more============
    // function new_li(num){
    for(let i = 0;i<10 ;i++){
        let arrivalsitem = `<div class="arrivals_li">
        <a href="777.(상세)샤이닝홈.html?cateNo=2&itemNo=${i}">
                                <div class="arrivals_img_box">
                                <img src="${ITEM_LIST[2][i].src}" alt="" class="arrivals_li_img">
                                

                                <div class="arrivals_icon_box">
                                <div class="arrivals_icon arrivals_icon1"></div>
                                <div class="arrivals_icon arrivals_icon2"></div>
                                <div class="arrivals_icon arrivals_icon3"></div>
                                <div class="arrivals_icon arrivals_icon4"></div>
                                <div class="arrivals_icon arrivals_icon5"></div>
                                </div>

                                </div>
                                <div class="arrivals_title">${ITEM_LIST[2][i].title}</div>
                                <div class="arrivals_o_price"><del>${(ITEM_LIST[2][i].o_price).toLocaleString("ko")+"원"}</del></div>
                                <div class="arrivals_s_price">${(ITEM_LIST[2][i].s_price).toLocaleString("ko")
                                +"원"}</div>
                                
                                </a>
                                    
                        </div>`

    $('.arrivals_ul').append(arrivalsitem)
    }
// }
    
    
    let count =0;
        $(document).on('click','.more_box',function(){
            // console.log(new_li.length)
            
            if(count == 0){
                for(let i = 10;i<20 ;i++){
                    let arrivalsitem = `<div class="arrivals_li">
                    <a href="777.(상세)샤이닝홈.html?cateNo=2&itemNo=${i}">
                                            <div class="arrivals_img_box">
                                            <img src="${ITEM_LIST[2][i].src}" alt="" class="arrivals_li_img">
                                            
            
                                            <div class="arrivals_icon_box">
                                            <div class="arrivals_icon arrivals_icon1"></div>
                                            <div class="arrivals_icon arrivals_icon2"></div>
                                            <div class="arrivals_icon arrivals_icon3"></div>
                                            <div class="arrivals_icon arrivals_icon4"></div>
                                            <div class="arrivals_icon arrivals_icon5"></div>
                                            </div>
            
                                            </div>
                                            <div class="arrivals_title">${ITEM_LIST[2][i].title}</div>
                                            <div class="arrivals_o_price"><del>${(ITEM_LIST[2][i].o_price).toLocaleString("ko")+"원"}</del></div>
                                            <div class="arrivals_s_price">${(ITEM_LIST[2][i].s_price).toLocaleString("ko")
                                            +"원"}</div>
                                            
                                            </a>
                                                
                                    </div>`
            
                $('.arrivals_ul').append(arrivalsitem)
                }
            
            }
            else if (count == 1){
                for(let i = 20;i<30 ;i++){
                    let arrivalsitem = `<div class="arrivals_li">
                    <a href="777.(상세)샤이닝홈.html?cateNo=2&itemNo=${i}">
                                            <div class="arrivals_img_box">
                                            <img src="${ITEM_LIST[2][i].src}" alt="" class="arrivals_li_img">
                                            
            
                                            <div class="arrivals_icon_box">
                                            <div class="arrivals_icon arrivals_icon1"></div>
                                            <div class="arrivals_icon arrivals_icon2"></div>
                                            <div class="arrivals_icon arrivals_icon3"></div>
                                            <div class="arrivals_icon arrivals_icon4"></div>
                                            <div class="arrivals_icon arrivals_icon5"></div>
                                            </div>
            
                                            </div>
                                            <div class="arrivals_title">${ITEM_LIST[2][i].title}</div>
                                            <div class="arrivals_o_price"><del>${(ITEM_LIST[2][i].o_price).toLocaleString("ko")+"원"}</del></div>
                                            <div class="arrivals_s_price">${(ITEM_LIST[2][i].s_price).toLocaleString("ko")
                                            +"원"}</div>
                                            
                                            </a>
                                                
                                    </div>`
            
                $('.arrivals_ul').append(arrivalsitem)
                }
            $('.more_box').css({
                display:'none'
            })
            }
            count++
        })

    
//============== time sale 남는시간구하기============
        let remaintime = document.getElementsByClassName("timesale_time_box")[0];
    
function diff(){
    setInterval(function(){
    let mastime = new Date("2023-10-07");
    let todaytime = new Date();
    let diff = mastime - todaytime;

    let diffday = Math.floor(diff / (1000*60*60*24));
    let diffhour = Math.floor((diff / (1000*60*60)) % 24);
    let diffmin = Math.floor((diff / (1000*60)) % 60);
    let diffsec = Math.floor(diff / 1000 % 60);
    
    remaintime.innerHTML =
    `<div class="timesale_time">
    ${diffday}<div>DAY</div></div>
    <div class="timesale_time">
    ${diffhour}<div>HOUR</div></div>
    <div class="timesale_time">
    ${diffmin}<div>MIN</div></div>
    <div class="timesale_time">
    ${diffsec}<div>SEC</div></div>`
    },1000)
}

diff();
// setInterval(diff,1000)


// ==========slide time sale 이미지들 ==========
for(let i = 0; i<6 ;i++){
    let timesaleitem = `<div class="timesale_li">
    <a href="777.(상세)샤이닝홈.html?cateNo=3&itemNo=${i}">
                            
                            <img src="${ITEM_LIST[3][i].src}" alt="" class="timesale_li_img">
                            <div class="timesale_black_box">
                            
                            <div class="timesale_title">${ITEM_LIST[3][i].title}</div>
                            <div class="timesale_o_price"><del>${(ITEM_LIST[3][i].o_price).toLocaleString("ko")+"원"}</del></div>
                            <div class="timesale_s_price">${(ITEM_LIST[3][i].s_price).toLocaleString("ko")
                            +"원"}</div>
                            </div>
                            </a>
                                
                    </div>`

$('.timesale_slide_ul').append(timesaleitem)
}

// ==========slide time sale  ==========

$(".timesale_li").eq(0).css({
    left:0
})
let winterval;
let timecurr_idx=0;
let timecount = $('.timesale_li').length;

$(".time_btn_R").on('click',function(){
    stopbtn()
    
    $('.timesale_li').eq(timecurr_idx%timecount).animate({
        left:'-100%'
    },1000)

    $('.timesale_li').eq((timecurr_idx+1)%timecount).css({
        left:'100%'
    }).animate({
        left:0
    },1000)

    timecurr_idx++

})

$('.time_btn_L').on('click',function(){
    stopbtn()
    
    $('.timesale_li').eq(timecurr_idx%timecount).animate({
        left:'100%'
    },1000)
    $('.timesale_li').eq((timecurr_idx-1)%timecount).css({
        left:'-100%'
    }).animate({
        left:0
    },1000)

    timecurr_idx--
})
    function stopbtn(){
        $('.time_btn').css({
            pointerEvents:'none'
        })
        setTimeout (function(){
            $('.time_btn').css({
                pointerEvents:'auto'
            })
        },1000)

    }
    function auto_slide_time() {
    winterval = setInterval(function(){
        $(".time_btn_R").trigger('click')
    },3000)
    }

    auto_slide_time()


    $('.timesale_slide_ul').hover(function(){
        clearInterval(winterval)
    },function(){
        auto_slide_time()
    })
    $('.time_btn').hover(function(){
        clearInterval(winterval)
    },function(){
        auto_slide_time()
    })

let footinterval;
let footindex=0
let footlength= $('.footer_slide_txt').length ;
$(".footer_slide_txt").eq(0).css({
    top:"50%"
})
footinterval = setInterval(function(){
$(".footer_slide_txt").eq(footindex%footlength).animate({
    top:"-130%"
},1000)
$(".footer_slide_txt").eq((footindex+1)%footlength).css({
    top:"130%"
}).animate({
    top:"50%"
},1000)

footindex++



},3500)

// =====스크롤 헤더 ~ container 반응형 fix=========

let o_s_head_b = $(".header_bot").offset().top - $('.header_top').height();
let o_s_one = $(".onepick").offset().top;
let o_s_weeky = $('.weeky_box').offset().top;
let o_s_arrivals = $('.arrivals_box').offset().top
let o_s_timesale = $('.timesale_box').offset().top
let o_s_review = $('.review_box').offset().top
let o_s_inusroom = $('.inusroom_box').offset().top


    $(window).scroll(function(){
        let s_t_head = $(window).scrollTop();
        let s_top = $(window).scrollTop();
        let w_height = $(window).height();

        let s_bot = s_top + w_height -300;
        

        // console.log(o_s_head_b, s_t_head)
        
        if(o_s_head_b<=s_t_head){
            $(".header_bot").css({
                position:'fixed',
                left:0,
                top:"50px"
            })
        }
        else{
            $(".header_bot").css({
                position:'relative',
                left:0,
                top:'0px'
            })
        }
// one pick 꺼
        
    
        if(o_s_one <= s_bot){
            
            $(".one_banner").animate({
                
                top:0,
                opacity:1,
            },500)

            $(".one_box_r").animate({
                
                left:'0%',
                opacity:1,
            },1000)

            $(".one_box_l").animate({
                
                left:'0%',
                opacity:1,
            },1000)
        
        }
        
// weeky 
        if(o_s_weeky <= s_bot) {
            $(".weeky_box").animate({
                top:0,
                opacity:1
            },500)

        setTimeout(function(){
            for(let i=0 ; i<13;i++){
            setTimeout(function(){
                $("#weeky_item1 .weeky_li").eq(i).animate({
                opacity:1,
                top:0
                },500)
            },100*(i+1))
            }
        },500)
// arrivals
        }
        // console.log(o_s_arrivals,s_bot)
        if(o_s_arrivals <= s_bot){
            $(".arrivals_box").animate({
                top:0,
                opacity:1
            },500)

        setTimeout(function(){
            for(let i=0 ; i<10;i++){
            setTimeout(function(){
                $(".arrivals_ul .arrivals_li").eq(i).animate({
                opacity:1,
                top:0
                },500)
            },100*(i+1))
            }
        },500)

        }
// timesale
        if(o_s_timesale <= s_bot){
            $('.timesale_box').animate({
                top:0,
                opacity: 1
            },500)

            setTimeout(function(){
                $(".timesale_white").animate({
                    opacity:1
                },1000)
            
            },500)
        }
// review
        if(o_s_review <= s_bot){
            $(".review_box").animate({
                top:0,
                opacity:1
            },500)

        setTimeout(function(){
        for(let i=0 ; i<10;i++){
        setTimeout(function(){
            $(".review_ul .review_li").eq(i).animate({
                opacity:1,
                top:0
                },500)
            },100*(i+1))
            }
        },500)
        }
//inusroom
        if(o_s_inusroom <=s_bot){
            $('.inusroom_ul_box').addClass('inusroom_ul_scale')
        }
    })
// =======스크롤 반응형 end ===============




})




    
    
    
        
    






