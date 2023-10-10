$(document).ready(function(){
//영문자로 시작해 숫자포함 4~15글자 입력하시오. -아이디 정규식
    let idRule = /^[A-Za-z]{1}[A-Za-z0-9]{3,15}$/g;


$("#btn_id").focusout(function(){

    //띄워쓰기 초기화 시키는 변수 cv
    //g 는 global 전체 고른다는 뜻.
    let cv = $("#btn_id").val().replace(/\s/g,"")
    $("#btn_id").val(cv);


///아이디 유효성 검사
//영문자로 시작해 숫자포함 4~15글자 입력하시오. ->이게 반대일시
    if(!idRule.test(cv)){
        $(".id_error").text("잘못된 아이디입니다.") 
        $("#btn_id").css({
            'outline-color':'red',
            'border-bottom':"1px solid red"
        })
    }
    else {
        $(".id_error").text("") 
        $("#btn_id").css({
            'outline-color':'#ddd',
            'border-bottom':"1px solid #ddd"
        })
    }//아이디 유효성 검사
   
// 아이디빈칸일시
    
    if(cv == ""){
        $("#btn_id").css({
            'outline-color':'red',
            'border-bottom':"1px solid red"
        })
        $(".id_error").text("필수입력 항목입니다.") 
        
    }//아이디 빈칸일시

    // else{
    //     $("#btn_id").css({
    //         'outline-color':'#ddd',
    //         'border-bottom':"1px solid #ddd"
    //     })
        // $(".id_error").css({
        //     display:'none'
        // })
    // }
})//아이디 에 포커스아웃될떄
//특수문자,문자,숫자포함 현태의 5~15자리 입력하시오. - 비밀번호 정규식 
let pwRule = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
$("#btn_pw").focusout(function(){
    
    
//비밀번호 빈칸 초기화 cv1변수로 대입 - repalce 써서 스페이스 빈칸 만들기
//g - global 전체 고르라는뜻
    let cv1 = $("#btn_pw").val().replace(/\s/g,"")
    $("#btn_pw").val(cv1);

    //비밀번호 유효성 검사
    //특수문자,문자,숫자포함 현태의 5~15자리 입력하시오. --반대일시
    if(!pwRule.test(cv1)){
        $(".pw_error").text("잘못된 비밀번호입니다.") 
        $("#btn_pw").css({
            'outline-color':'red',
            'border-bottom':"1px solid red"
        })
    }
    else {
        $(".pw_error").text("") 
        $("#btn_pw").css({
            'outline-color':'#ddd',
            'border-bottom':"1px solid #ddd"
        })
    }//비밀번호 유효성 검사
   
//비밀번호 비어있을떄
    if(cv1 == ""){
        $("#btn_pw").css({
            'outline-color':'red',
            'border-bottom':"1px solid red"
        })
        $(".pw_error").text("필수입력 항목입니다.") 
    }//비밀번호 비어있을떄
    // else{
    //     $("#btn_pw").css({
    //         'outline-color':'#ddd',
    //         'border-bottom':"1px solid #ddd"
    //     })
        
    // }
})//비밀번호 포커스아웃됬을떄

$("#login_btn").click(function(e){
    e.preventDefault(); //submit 버튼 기능 --새로고침기능 막아줌//
    if(($("#btn_id").val().trim()=="" || $("#btn_pw").val().trim()=="")){
    alert("아이디,비밀번호를 모두 입력하세요!")
    //초기화! + 아이디에 포커스
    $("#btn_id").trigger("focusout").focus()
    $("#btn_pw").trigger("focusout")
    }
    else  { //통과시 ///
        //원래는 db에서 조회된 결과를 받고 
        //성공 메세지를 보이거나 첫페이지로 이동한다.
    alert("로그인에 성공하셨습니다!")

    }
})



})