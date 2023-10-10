$(document).ready(function(){
    console.log("로딩완료")
    
    // [id!=mobile3][id!=mobile4]
    $('input[type=text],input[type=password]').
    focusout(function(){

        // 0.공백제거처리함수(중간공백들)
        //get rid of space-> 스페이스를 제거하라(공백을 제거하라!)
        // 정규식은 // 슬래시 사이에다가 적용한다.
        // \s 는 스페이스를 뜻한다.
        // g 는 globel 을뜻하고 전체를 찾아라는거
        // 즉. 스페이스 전체를 찾아서 "" 공백을 해줘라는 뜻.
        //

        //const 에쓴 cv변수랑 아래 let에 쓴 cv랑은 틀린거다. cv= currenvalue 줄인 변수명.
        const groSpace = cv => cv.replace(/\s/g,"");
        //원형 : (cv) => {return cv.replace(/\s/g,"")}- 이replace 한 결과를 호출한대로 다시갖고가서 return 해준다. (함수의 원래고유기능이 return 이라 보면된다. 호출해서 쓰는거니까.)
        //정규식 : 슬래쉬(/) 사이에 표현, \s -스페이스문자
        //정규식 참고 - > https://www.w3schools.com/jsref/jsref_obj_regexp.asp
        //해석: 공백문자를 모두 (g:globel-전역 <-> local-자역) 찾아서 없애시오! (빈공백으로 변경!)        
        //1.방금 focusout 가 발생한 요소의 id는?
        let cid = $(this).attr("id")
        console.log("fucus 완료", cid)
        //cid 는 current id 즉, 현재아이디라는뜻!

        //2.focusout(blur 로 써도됨.) 가 발생한 요소의 입력값은?
        // =>let cv = $(this).val()
        // let cv = $(this).val().trim();
        //삼항연산자 (cid 가 member_name이냐? 응 : 아니)-> cid 가 이름이면 중간에 띄워쓰기 함수 안쓰고  trim 함수로 앞뒤공백만 제거해서사용해준다는 조건으로쓰임.
        let cv = cid==="member_name" ? $(this).val().trim() : groSpace($(this).val());
        //groSpace 함수를 호출해쓰면 trim은 쓸필요가 없다 어차피 저 함수에서 space 문자 다 공백만들어주니까.
        console.log("fucus 완료", cid, cv)
        //cv 는current value 즉, 현재값의 뜻
        //val()메서드 - input 요소의 값(value)를 읽기/쓰기용
        //trim()메서드 - 앞뒤 공백제거)공백만 있으면 공백제거)
        //grospace() 는 전체공백제거함수()

        //서비스 차원으로 공백제거된 데이터를 다시 입력창에 넣어줌! ->공백부분 없어지고 다시 초기화
        $(this).val(cv); // val(값)
        /***********************************
            3. 빈값 여부 검사하기
        *********************************/ 
        /*********  휴대폰 뒷자리 검사********/
        let mobileRule = /^([0-9]{3,4})$/
        let mobileRule2 = /^([0-9]{4})$/
        /********================********/
        if(cv ===""){//비어있느냐라는뜻
            //메세지 출력
            $(this).nextAll(".error").text("필수입력 항목입니다.")
            .removeClass("on")//파란색지움 원래 빨강글자나옴
            // $(".error").css({
            //     color:'red'
            // })
            $(this).css({
                'border-color':'red'
            })

            //불통과!
            pass = false;
        }
        /***********************************
            4.아이디일 경우 유효성 검사
            -검사 기준:영문자로시작하는 4~16자 영문자/숫자
        *********************************/ 
        else if(cid === "member_id"){
            // console.log("아이디검사 결과:",vReg(cv,cid));
            if(!vReg(cv,cid)) { //false 일떄 !(not 연산자)로 true변경!
                //불통과일때 메시지
                $(this).nextAll(".error").text("영문자로 시작해 숫자포함 4~15글자 입력하시오. ")
                .removeClass("on")
                $(this).css({
                    'border-color':'red'
                })

                
                //불통과!
                pass = false;
                
            }///if///////
            else {//통과시
                //1. db에 아이디가 있는지 조회후 결과로 처리해야됨!(보류-백엔드랑 연결을 안했으니)
                //만약 아이디가 이미있으면 "아이디가 사용중이거나 탈퇴한 아이디입니다."
                //만약 아이디가 없으면 "멋진 아이디네요!"

                // 2.메세지 띄우기
                $(this).nextAll(".error").text("아이디 입력완료")
                .addClass("on");//blue색글자
                // $(".error").css({
                //     color:'blue'
                // })
                $(this).css({
                    'border-color':'#d5d5d5'
                })

                // //통과!
                // pass = true;
            }

        } //////////////else if :비밀번호 검사시////////////

         /***********************************
            5.비밀번호일 경우 유효성 검사
            -검사 기준:(특수문자,문자,숫자포함 현태의 5~15자리)
        *********************************/ 
            else if(cid === "member_pw"){
                // console.log("비밀번호검사 결과:",vReg(cv,cid));
                if(!vReg(cv,cid)) { //false 일떄 !(not 연산자)로 true변경!
                    //불통과일때 메시지
                    $(this).nextAll(".error").text("특수문자,문자,숫자포함 현태의 5~15자리 입력하시오.")
                    .removeClass("on")
                    $(this).css({
                        'border-color':'red'
                    })
                    
                    
                //불통과!
                pass = false;
                }///if///////
                else {//통과시
                    //메세지 지우기
    
                    // 2.메세지 띄우기
                    $(this).nextAll(".error").text("")
                    // .addClass("on");//blue색글자
                    // $(".error").css({
                    //     color:'blue'
                    // })
                    $(this).css({
                        'border-color':'#d5d5d5'
                    })
                    // //통과!
                    // pass = true;
                }
    
            } //////////////else if : 비밀번호 확인검사시////////////

              /***********************************
            6.비밀번호일 경우 유효성 검사
            -검사 기준:(특수문자,문자,숫자포함 현태의 5~15자리)
        *********************************/ 
            else if(cid === "member_pw2"){
                // member_pw1 하고 member_pw2 비교시 잃치하지않을떄 조건만 보면됨
                if(cv != $("#member_pw").val()) { //비밀번호가같지않으면
                    //불통과일때 메시지
                    $(this).nextAll(".error").text("비밀번호가 일치하지 않습니다.")
                    .removeClass("on")
                    $(this).css({
                        'border-color':'red'
                    })
                    
                    
                //불통과!
                pass = false;
                }///if///////
                else {//통과시
                    //메세지 지우기
    
                    // 2.메세지 띄우기
                    $(this).nextAll(".error").text("")
                    // .addClass("on");//blue색글자
                    // $(".error").css({
                    //     color:'blue'
                    // })
                    $(this).css({
                        'border-color':'#d5d5d5'
                    })
                    // //통과!
                    // pass = true;
                }
    
            } //////////////else if :  핸드폰 검사시////////////

            /***********************************
            7.휴대번호 일 경우 유효성 검사
            -검사 기준:숫자 3~4자리만 입력되게
            *********************************/ 
            // 휴대폰 뒷자리 숫자 검사시.
            // let mobileRule =/^([0-9]{3,4})$/
            // let mobileRule2 =/^([0-9]{4})$/
            else if (cid === "mobile3"){
                if(!mobileRule.test(cv)){
                $(this).nextAll(".error").text("숫자만 입력해주세요.")
                $(this).css({
                    'border-color':"red"
                })

                
                //불통과!
                pass = false;
                }
                else {
                $(this).nextAll(".error").text("")
                $(this).css({
                    'border-color':"#d5d5d5"
                })
                // //통과!
                // pass = true;
                }
            }
            else if (cid === "mobile4"){
                if(!mobileRule.test(cv)){
                $(this).nextAll(".error").text("숫자만 입력해주세요.")
                $(this).css({
                    'border-color':"red"
                })

                
                //불통과!
                pass = false;
                }
                else {
                $(this).nextAll(".error").text("")
                $(this).css({
                    'border-color':"#d5d5d5"
                })

                // //통과!
                // pass = true;
                }
            }
            //////////////////else if: 다음 에 이메일 focus 빠져나오고 검사시/////////////


           

        ////// 모두 통과일 경우 메세지 지우기 ///////
        else{
            // 메세지 지우기: .text("") 내용지움메서드
            $(this).nextAll(".error").text("")
            $(this).css({
                'border-color':'#d5d5d5'
            })
            //.text("") 이거대신에 -> .empty() 이거 사용가능
        } //////////else:통과시 ////////////////////
 
    })//focusout //////////////////////////////
    //이메일 관련 대상은 focusout 함수를 빠져나오고시작해야된다.

    /////이메일 관련 대상선정 //////////////
    // 이메일 앞주소
    const eml1 = $("#member_email");
    
    // // 이메일 뒷주소
    // const eml2 = $("#member_email1");

    // 이메일 선택박스
    const seleml = $("#member_email1")
    /////////////////////////////////////////

    /**************************************
        선택박스 변경시 이메일 건사하기
        _________________________________
        
        검사시점 : 선택박스 변경할떄
        이벤트 : change -> change() 메서드
        이벤트 대상 : #member_email1 -> seleml
      ************************************/ 
    seleml.change(function(){

        //1. 선택박스 변경된 값 읽어오기
        let cv = $(this).val();
        //이 console 에찍히는 값은 해당 select 박스의 value 값에 쓰여진 이름들이나온다.
        console.log("선택값: ",cv)

        //2. 선택 옵션별 분기문
        if(cv == "init"){
        //init : 선택해달라는 뜻 -> 선택해주세요라는 텍스의 option 태그에 value 값에 지정해준다.
        
        //1. 메세지출력
        eml1.nextAll(".error").text("이메일 옵션 선택필수!")
        .removeClass('on') //빨간색 글자
        // eml1.nextAll(".error").removeClass("on")
        

        }//////if : 선택해주세요 ///////////
        else {
            eml1.nextAll(".error").text("");

            //2.이메일 전체 주소 조합하기
            let comp = eml1.val() + "@" + cv;
            // cv 는 select의 option 의 value값 

            //3. 이메일 유효성 검사함수 호출
            resEml(comp);
        }

    })/////////change //////////////////

    /***********************************
    키보드 입력시 이메일 체크하기
    ________________________________

    -키보드 관련 이벤트 : keypress,keyup,keydown
    1.keypress : 키가 눌려졌을때
    2.keyup : 키가 눌렸다가 올라올때
    3.keydown : 키가 눌려져서 내려가 있을떄
    -> 과연 글자가 입력되는 순간은 어떤 키보드 이벤트를 적용해야될까???? keyup

    - 이벤트 대상  : #email1, #email2
    -> 모든 이벤트를 함수와 연결하는 제이쿼리 메서드는?
    on("이벤트명",익명함수),
    on("이벤트명","선택자",익명함수)
    ***********************************/
    $("#member_email").on("keyup",function(){ 
        //1. 현재 이벤트 대상 아이디 읽어오기.
        let cid = $(this).attr("id");

        //2. 현재 입력된 값 읽어오기
        let cv = $(this).val();
        console.log("입력아이디: ",cid,"\n입력값: ",cv)
        //3. 이메일 뒷주소 셋팅하기
        //이건 직접입력칸이 없으니까 난 필요없다.

    }); /////////////keyup///////////////////



    /***************************************
        함수명 : resEml (result Email)
        기능 : 이메일 검사 결과 처리
    ***************************************/    
    const resEml = function(comp){
        //comp - 완성된 이메일 주소
        console.log("이메일주소 :",comp)
        console.log("검사결과 :",vReg(comp,"member_email"))

        //이메일 정규식 검사에 따른 메세지 보이기
        if(vReg(comp,"member_email")){
            eml1.nextAll(".error").text("적합한 이메일 형식입니다")
            .addClass("on");
        } //////if : 통과시 ////////
        else {
            eml1.nextAll(".error").text("맞지않는 이메일 형식입니다")
            .removeClass("on");

            //불통과!
            pass = false;
        }////// else : 불통과시 ////////
        
    };/////////////////resEml //////////////

/********************************************
    가입하기 버튼 클릭시 처리하기
    ___________________________

    전체검사의 원리:
    전역변수 pass 를 설정하여 true 를 할당하고 
    검사중간에 불통과 사유발생시 false 로 변경!
    유효성 검사 통과여부를 판단한다!

    검사방법:
    기존 이벤트 focusout 이벤트를 강제로 발생시킨다!
    이벤트를 강제 발생시키는 메서드는? trigger(이벤트명) 
********************************************/
    //검사용 변수
    let pass = true;//아래 함수 에서뿐만아니라
    //다른 함수에서도 쓸수있게끔하려고 전역변수로 선언했다.
    $(".chk_submit_box").click(function(e){
        //호출확인
        console.log("가입해")

        // 1.기본이동막기 -- submit 버튼 ,a태그 버튼 일떄 주로쓴다. -(주로 페이지가 새로고침되는애들한테는 꼭 써줘야한다.)
        e.preventDefault();


        //2.pass 통과여부 변수에 true 를 할당!
        //처음에 true 로 시작하여 검사 중간에 한번이라도
        //false 로 할당되면 결과는 false 다!
        pass = true;

        //3. 입력창 focusout이벤트 강제발생하기
        //대상 : focusout이벤트 발생했던 요소들!
        $('input[type=text][id!=agr_totalchk][id!=agr_small_chk1][id!=agr_small_chk2][class!=mid_search_input],input[type=password]').trigger("focusout");



        //최종통과여부
        console.log("통과여부: ",pass)
        //4.검사 결과에 따라 메시지 보이기
        if(pass){
            //원랴는 post 방식으로 db에 회원가입정보를 정송하여 입력후 
            //db처리 완료시 성공메세지나
            //로드인 페이지로 넘겨준다!
            alert("회원가입을 축하드립니다!")
            //로그인 페이지로 리디렉션!
            location.href = "777.(로그인)샤이닝홈.html"

        }/////   if: 통과시  //////
        else {
            alert("필수입력 항목을 입력하세요!")
        }



    });//////click ////////////

    //이벤트 대상:#btnj
    //원래 서브밋버튼은 클릭시 싸고있는 for 태그의 action 설정 페이지로
    // 모든 입력창의 값을 전송하도록 설계되어있다.
    // 기본 서브밋 이동을 막고 우리가 검사하도록 해야되는데 난 상관없다.




// .on("blur",function(){}) 이것도가능
//.blur(function(){}) 이것도가능

/*////////////////////////////////////////////////////////////
    함수명: vReg (validation with Regular Rxpression)
    기능: 값에 맞는 형식을 검사하여 리턴함
    true 아니면 false 로만 리턴해준다.
    
    (주의: 정규식을 따옴표로 싸지말아라! - 싸면문자가됨!)
//////////////////////////////////////////////////////////////*/ 
function vReg(val,cid) {
    // val- 검사할값 , cid - 처리구분아이디
    // //console.log("검사:"+val+"/"+cid);

    //정규식 변수
    let reg;

    //검사할 아이디에 따라 정규식을 변경함
    switch (cid) {
       case "member_id": //아이디
            reg = /^[A-Za-z]{1}[A-Za-z0-9]{3,15}$/g;
            //영문자로 시작하는 4~15글자 영문자-숫자
            // /^[A-Za-z]{1} 첫글자는 영문대소문자로 체크!
            // [A-Za-z0-9]{3,15} 첫글자 다음 문자는 영문대소문자 또는 숫자로
            // 최소 5글자에서 최대 19글자를 유효번위로 체크!
            // 첫글자 한글자를 더하면 최소 6글자에서 최대 20글자 체크!
            break;
        case "member_pw": //비밀번호
            reg = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            // 특수문자, 문자 ,숫자 포함 형태의 5~15자리
            // (?=^.{5,15}$) 시작부터 끝까지 전체 5~15자릿수 체크!
            // (?=.*\d) 숫자 사용체크!
            // (?=.*[a-zA-Z]) 영문자 대문자 또는 소문자 사용체크!
            // (?=.*[!@#$%^&+=]) 특수문자 사용체크!
            break;
        case "member_email"://이메일
            reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
            // 이메일 형식에 맞는지 검사하는 정규식
            break;
        //그외 추가할  정규식 조건이 있으면 찾아서 여기다가 추가하면될것이다.
        //위에 4,번 밑에다가 정규식 쓸것이다.else if 문으로
    }//////////////////switch case 문///////////////////////////

    // //consloe.log("정규식:"+reg);

    //정규식 검사를 위한 JS메서드 -.test()
    // -> 정규식.test(검사할값) : 결과 true/false
    return reg.test(val); //호출한 곳으로 검사결과리턴!
    //니가갖고들어온 val 를 reg에 맞는 식으로 검사해서 리턴해준다.

} //////////vReg 함수////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    // 전체 체크박스 버튼 클릭스 아래것들도 다 체크되게끔 

    $("#agr_totalchk").click(function(){

        if($('#agr_totalchk').is(':checked')){
            $('#agr_totalchk').css({
                opacity:1
            })
            $(".agr_small_chk").prop('checked', true)
        }
        else {
            $('#agr_totalchk').css({
                opacity:0
            })
            $(".agr_small_chk").prop('checked', false)
        }
    })





})