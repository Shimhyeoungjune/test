$(document).ready(function(){

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
// let o_s_one = $(".onepick").offset().top;
// let o_s_weeky = $('.weeky_box').offset().top;
// let o_s_arrivals = $('.arrivals_box').offset().top
// let o_s_timesale = $('.timesale_box').offset().top
// let o_s_review = $('.review_box').offset().top
let o_s_inusroom = $('.inusroom_box').offset().top

$(window).scroll(function(){
    let s_t_head = $(window).scrollTop();
    let s_top = $(window).scrollTop();
    let w_height = $(window).height();

    let s_bot = s_top + w_height -100;
    

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


    if(o_s_inusroom <=s_bot){
        $('.inusroom_ul_box').addClass('inusroom_ul_scale')
    }
})


// 상세페이지
console.log(location.href)
window.onload = function(){
    let cate_no = get_url_info("cateNo");
    let item_no = get_url_info("itemNo");

    console.log(ITEM_LIST[cate_no][item_no])
    
    const ITEM = ITEM_LIST[cate_no][item_no];
    

    let list = `<div class="big_img">
                    <img src="${ITEM.src}" alt="">
                    <div class="magnifier" style="background: url('${ITEM.src}')"></div>
                </div>
                <div class="item_info">
                    <div class="item_title">${ITEM.title}</div>                    
                    <div class="item_opt">
                        <table class="item_sec1">
                            <tbody>
                                <tr>
                                    <td class="tb_title">소비자가</td>
                                    <td><del>${ITEM.o_price.toLocaleString("ko")}원</del></td>
                                    
                                </tr>
                                <tr>
                                    <td class="tb_title">판매가</td>
                                    <td class="tb_s_price">${ITEM.s_price.toLocaleString("ko")}원</td>
                                    <td class="tb_title_blue">51% DOWN</td>
                                </tr>
                                <tr>
                                    <td class="tb_title">배송비</td>
                                    <td>
                                        <select class="pay_method">
                                            <option value="">주문시 결제(선결제)</option>
                                            <option value="">수령시 결제(착불)</option>
                                        </select>
                                        <div>2,500원 (3,000,000원 이상 구매 시 무료)</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tb_title">적립금</td>
                                    <td>10,000원(20%)</td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="item_sec2">
                            <tbody>
                                <tr>
                                    <td class="tb_title">색상</td>
                                    <td>
                                        <div class="color_box_container">
                                            <div class="color_box">
                                                <div class="cb_skyblue">skyblue</div>
                                            </div>
                                            <div class="color_box">
                                                <div class="cb_white">white</div>
                                            </div>
                                            <div class="color_box">
                                                <div class="cb_gray">gray</div>
                                            </div>
                                            <div class="color_box">
                                                <div class="cb_plum">plum</div>
                                            </div>
                                            <div class="color_box">
                                                <div class="cb_navy">navy</div>
                                            </div>
                                        </div>
                                        <div class="div">[필수] 옵션을 선택해 주세요</div>
                                    </td>
                                </tr> 
                            </tbody>
                        </table> 
                        <div class="min_limit">(최소주문수량 1개 이상)</div>
                        <div class="sel_opt_container">
                            
                        </div>
                        <div class="total_price_box">
                            TOTAL: <span class="total_price">0원</span> 
                            <span class="total_count">(0개)</span>
                        </div>

                        <div class="btn_box">
                            <div class="btn_buy_it_now">BUY IT NOW <span class="btn_buy_it_span">⇒</span>
                            </div>
                            <div class="btn_add_cart">ADD TO CART</div>
                            <div class="btn_wish_list">WISH LIST</div>
                            <div class="btn_box2">
                                <div class="btn_box2_l">
                                <div class="btn_l_kakao1"></div>
                                <div class="btn_l_kakao2"></div>
                                <div class="btn_l_kakao3"></div>
                            </div>
        <div class="btn_box2_r">
            <div class="btn_l_naver1"></div>
            <div class="btn_l_naver2"></div>
            <div class="btn_l_naver3"></div>
        </div>
    </div>
                        </div>
                        
                    </div>`;

    $('.detail_area').prepend(list)

    // 색 옵션 이미 선택해놨었는지 확인하는 용도
    let btn_chk = [false, false, false]; 
    // $('.color_box').click(function(){
    $(document).on('click', '.color_box', function(){
        if(!btn_chk[$(this).index()]) {

            btn_chk[$(this).index()]=true;

            let sel_opt = `<div class="opt_item">
                                <div class="opt_name">
                                    <div class="opt_title">${ITEM.title}</div>
                                    <div>-${$(this).text()}</div>
                                </div>
                                <div class="opt_qty">
                                    <input type="button" value="-" class="btn_qty btn_minus">
                                    <input type="text" value="1" class="txt_qty">
                                    <input type="button" value="+" class="btn_qty btn_plus">

                                    <img src="img/샤이닝홈/btn_price_delete.gif" alt="" class="btn_close_opt">
                                    <input type="hidden" value="${$(this).index()}" class="opt_order">
                                    
                                </div>
                                <div class="opt_price">
                                    <div>${$('.tb_s_price').text()}</div>
                                    <div>(적립 10,000원)</div>
                                </div>
                            </div>`;

            $('.sel_opt_container').append(sel_opt)
            
        
            total_price();
        }
        else {
            alert("이미 선택한 옵션 입니다.")
        }
    })

    $(document).on('click', '.btn_plus', function(){
        let tmp_qty = (+$(this).prev('.txt_qty').val()) + 1
        $(this).prev('.txt_qty').val(tmp_qty)
        
        total_price();
    })
    $(document).on('click', '.btn_minus', function(){
        if(+$(this).next('.txt_qty').val()  - 1  > 0) {
            let tmp_qty = +$(this).next('.txt_qty').val()  - 1  
            $(this).next('.txt_qty').val(tmp_qty)

        
            total_price();
        }
    })
    
    $(document).on('click', '.btn_close_opt', function(e){
        $(this).parent().parent('.opt_item').remove();

        console.log(btn_chk)
        let tmp_idx = $(this).next().val(); // 현재 클릭한 X 다음 요소(몇번째꺼냐 btn_chk = [false, false, false]; )
        btn_chk[tmp_idx] = false;
        console.log(btn_chk)
        
        total_price();
    })

    function total_price() {
        
        let total_price = 0;
        let total_count = 0;

        for(let i=0; i<$('.txt_qty').length; i++) {
            console.log($('.txt_qty').eq(i).val() , $('.tb_s_price').text().replace("원","").replace(",","")    )
            total_price += $('.txt_qty').eq(i).val() * $('.tb_s_price').text().replace("원","").replace(",","")  
            total_count += Number($('.txt_qty').eq(i).val())
    
            
        }
        $('.total_price').text(total_price.toLocaleString("ko")+"원")
        $(".total_count").text("("+ total_count +"개)")
        

    }


    // 돋보기 움직임 감지
    $(document).on('mousemove', '.big_img', function(event){
        // 부모 영역내 마우스 위치 찾기
        let mouseX = event.pageX - $('.big_img').offset().left;
        let mouseY = event.pageY - $('.big_img').offset().top;

        // 마우스가 돋보기 가운데 오기 하기(transform: translate(-50%, -50%) 나 마찬가지)
        let posx = mouseX - $('.magnifier').width() / 2;
        let posy = mouseY - $('.magnifier').height() / 2;

        // 배경 이미지가 원의 가운데 오게 하기
        let bg_x = -mouseX + $('.magnifier').width() / 2;
        let bg_y = -mouseY + $('.magnifier').height() / 2;
        

        $('.magnifier').css({
            left: posx,
            top: posy,

            backgroundPosition: `${bg_x}px ${bg_y}px`,
            backgroundSize: `${$('.big_img').width() }px ${$('.big_img').height() }px`,
        })

        
        console.log(event.offsetX, event.offsetY) 
    });


 } //window.onload = function() 꺼/////
$(document).on("click",".btn_buy_it_now",function(){
    alert("구매하시겠습니까?")

})






})