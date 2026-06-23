
let titleHeight,title02,title01;
title01 = $('.poi-list').outerHeight();
title02 = $('.nav-list').outerHeight();
titleHeight = title01+title02+30;

function toggle(dom) {
    $(dom).toggle()
}


function goTo(val) {
	jQuery('html,body').animate({scrollTop:jQuery(val).offset().top - titleHeight},700);
}

/* ph-title偽元素++*/

    $phtitle = document.querySelectorAll('.ph-title');
    $phtitle.forEach(function(e){

        let string = e.textContent;
        e.innerHTML = `<div>${string}</div>`;

    })
    



$(function() {

    

$('.style-btn li').on('click', function() {
        // 0. 定義範圍：找到點擊按鈕所屬的那個 .poi 父層
        let $parentPoi = $(this).closest('.poi');
        
        // 1. 處理按鈕切換 (僅限於該父層內)
        $(this).addClass('on').siblings().removeClass('on');
        
        // 2. 取得 data-id
        let targetClass = $(this).data('id');
        
        // 3. 顯示對應內容 (僅限於該父層內尋找對應的 class)
        // 先將該 poi 下所有的 .tab-pane 隱藏，再顯示點擊的那一個
        $parentPoi.find('.tab-pane').removeClass('on');
        $parentPoi.find('.' + targetClass).addClass('on');  
        youtube();
        // 如果需要淡入效果，可改寫如下：
        // $parentPoi.find('.tab-pane').removeClass('on').hide();
        // $parentPoi.find('.' + targetClass).addClass('on').fadeIn(400);
    });
        
        $('.tab-pane .tab-btn').on('click', function() {
            // 1. 處理按鈕本身的樣式
            $(this).addClass('on').siblings().removeClass('on');
            $(this).closest('.tab-pane').find('.poi-goods').removeClass('on');

            
            // 2. 取得目標 ID
            let targetId = $(this).data('target');

            // 3. 找到對應的 section 並切換顯示
            // 先隱藏同層所有的 poi-goods，再顯示對應 id 的那一個
            
            $('#' + targetId).addClass('on');
            
            // 選配：如果需要捲動到頂部可以加入
            // $('html, body').animate({ scrollTop: $('#' + targetId).offset().top - 20 }, 500);
        });



  
    /*選單亮燈*/
    function navlistOn(){

        var bodyid = $('body').data('id');
        $('.nav-list').find( '#' + bodyid + 'Btn' ).addClass('on');
    }

    navlistOn();




    /*選單吐到第二層，+下滑*/




    //錨點下滑
    function ancScrollAll($clickName, $targetName , $parentName){


        if($parentName == undefined){

            $($clickName).click(function(e){
        
                e.preventDefault();
            
                let num = $(this).index();

                if ( $('.nav').hasClass('sticky') ){

                    $("html,body").stop(true,false).animate({scrollTop:  $($targetName).eq(num).offset().top -  titleHeight },600)

                    } else {
                    $("html,body").stop(true,false).animate({scrollTop:$($targetName).eq(num).offset().top - titleHeight },600)

                    }
         })

        }else{

                
            $($clickName).click(function(e){

                console.log ($(this).parents($($parentName)) )

                if( $(this).parents($($parentName)).hasClass('poi-change') || $(this).parents($($parentName)).hasClass('p02-change')){
                
                   return;
                 
                } else {
                
                    e.preventDefault();
                    let num = $(this).index();

                    if ( $('.nav').hasClass('sticky') ){

                        $("html,body").stop(true,false).animate({scrollTop:  $(this).parentsUntil($($parentName)).find($($targetName)).eq(num).offset().top - titleHeight },600)
                    
                        }  else {

                        $("html,body").stop(true,false).animate({scrollTop: $(this).parentsUntil($($parentName)).find($($targetName)).eq(num).offset().top - titleHeight },600)

                    }
                }
            })



        }






    }



    /*選單第二層+下滑*/


    function poiMenu(){

        $('.poi-goods').each(function( index ){
            
                let poiMenuNum = $(this).find('.ph-title').length;

                
                for(i=0; i < poiMenuNum ; i++ ){
                    let titleText;
                    titleText = $(this).find('.ph-title').eq(i).text();
                    //console.log(titleText)
                    $('.poi-list').append(`<a href="javascript:void(0)" class="poi-tab">${titleText} </a>`);

                }

            })
    
           
   
    
    }
    
    
    // poiMenu();

    // ancScrollAll('.slidecontain li', '.ph-group-title' , '.poi-goods');
  





    /*分頁有不同的規則.ph-title / .ph-group-title等等*/
    /*選單第二層+下滑*/

    function poiMenu($dadget,$songet){

        $($dadget).each(function( index ){
            
                let poiMenuNum = $(this).find($songet).length;

                
                for(i=0; i < poiMenuNum ; i++ ){
                    let titleText;
                    titleText = $(this).find($songet).eq(i).text();
                    //console.log(titleText)
                    $('.poi-list').append(`<a href="javascript:void(0)" class="poi-tab">${titleText} </a>`);

                }

            })

            poiB = $('.poi-list').outerHeight() ;
            titleHeightS = poiB*2;
            titleHeightB = poiB*3;
                        
            if( $(window).width() < 768){
                titleHeightS = poiB*4;
                titleHeightB = poiB*5;
            }

           
    }
    
    


    const pagebodyid =  document.querySelector('body').getAttribute('data-id');
        

    switch (pagebodyid) {

        case 'index':
        // poiMenu('.poi-goods','.ph-title');
       //  ancScrollAll('.poi-list a', '.ph-title','.poi-goods');
       
        break;

        case 'gfp':
   
         // poiMenu('.poi-goods','.ph-title');
          //ancScrollAll('.poi-list a', '.ph-title','.poi-goods');
        break;

        case 'intro':
 
        //   poiMenu('.poi-goods','.ph-title');
        //  ancScrollAll('.poi-list a', '.ph-title','.poi-goods');
        break;

    }









    /*小滑開這個*/
    // function navAnc(){


    //     $('.poi-menu li').click(function(e){
    //         e.preventDefault();
    //         let num = $(this).index();
     
    //         if ( $('nav.nav').hasClass('sticky') ){
    //             let menuHeight = $('nav.nav').outerHeight()-10;
    //             console.log(menuHeight)
    //             $("html,body").stop(true,false).animate({scrollTop: $('.h2-title').eq(num).offset().top - menuHeight },700)
      
        
    //            } else {
    //             let menuHeight = $('nav.nav').outerHeight()-10;
    //             $("html,body").stop(true,false).animate({scrollTop: $('.h2-title').eq(num).offset().top - menuHeight-122 },700)
    
    //           }
    //     })



    // }

    // navAnc();




        //置中
        function center(){

        $('.ph-group').each(function(){

                    let length = $(this).find('.ph-group-content').length;
                    console.log(length)

                    if( length == 1){
                        $(this).css({'justify-content':'center'})
                    }


                    $(this).find('.ph-group-content-text-sale').each(function () {
                        if ($(this).text().trim() == "") {
                            $(this).hide()
                        }
                    })


                })
               }
               
               center();



        $(window).scroll(function(){

        var headerHeight = $('.kv-banner').height()+50;
        // var navHeight = $('nav.nav').height()-30;
        let height = headerHeight ;
        var scroll = $(window).scrollTop();

          if ( scroll >= height) {

             $('nav.nav').addClass('sticky');    
            
          } else {


            $('nav.nav').removeClass('sticky');
        
            }
            
        })

        $('.goTop').click(function () {

            $('html,body').animate({ scrollTop: 0 }, 800)

        })


        //合併模組

        // function movepoi(){

        //     $('.poi-del').each(function(){
        //         let $delNav =  $(this).find('.slidecontain').html();
        //         let $delPoiLength = $(this).find('.ph-group-title').length;

        //         console.log('aa'+$delPoiLength)

        //         $('.poi-move').find('.slidecontain').append($delNav);

        //         for(let i =0;i<$delPoiLength;i++){
        //             let delHeader = $(this).find('header').eq(i).prop("outerHTML");
        //             let delPhGroup = $(this).find('.ph-group').eq(i).prop("outerHTML");
        //             $('.poi-move').find('.ph').append(delHeader);
        //             $('.poi-move').find('.ph').append(delPhGroup);
        //         }


        //     })

        //     $('.poi-del').remove();

        // }
        // movepoi()




        /*切換模組*/
    
        function buttonChangeSec($tab){

            $($tab).find('.anchorLink').attr( 'href','javascript:void(0)')

            $($tab).each(function(){

                $(this).find('.slidecontain').find('li').eq(0).addClass("on");
                $(this).find('.ph-group').eq(0).addClass("on");
                //$(this).find('.link-right').eq(0).addClass("on");

             })

             $($tab).find('.slidecontain').find('li').click(function(){

                var num = $(this).index();
              

                $(this).parentsUntil($($tab)).find('.slidecontain').find('li').removeClass("on");
                $(this).parents('.ph-menu').siblings('.ph-group').removeClass("on");
                //$(this).parents('.ph-menu').siblings('.link-right').removeClass("on");

                $(this).parentsUntil($($tab)).find('.slidecontain').find('li').eq(num).addClass("on");
                $(this).parents('.ph-menu').siblings('.ph-group').eq(num).addClass("on");
                //$(this).parents('.ph-menu').siblings('.link-right').eq(num).addClass("on");

    

                })

        }
       
        buttonChangeSec('.poi-change .ph');





        function buttonChangeSecP02($tab){

            $($tab).find('.anchorLink').attr( 'href','javascript:void(0)')

            $($tab).each(function(){

                $(this).find('.slidecontain').find('li').eq(0).addClass("on");
                $(this).find('.ph-group-base').eq(0).addClass("on");
                //$(this).find('.link-right').eq(0).addClass("on");

             })

             $($tab).find('.slidecontain').find('li').click(function(e){

                var num = $(this).index();
                e.preventDefault();

                $(this).parentsUntil($($tab)).find('.slidecontain').find('li').removeClass("on");
                $(this).parents('.ph-menu').siblings('.ph-group-base').removeClass("on");
                //$(this).parents('.ph-menu').siblings('.link-right').removeClass("on");

                $(this).parentsUntil($($tab)).find('.slidecontain').find('li').eq(num).addClass("on");
                $(this).parents('.ph-menu').siblings('.ph-group-base').eq(num).addClass("on");
                //$(this).parents('.ph-menu').siblings('.link-right').eq(num).addClass("on");

    

            })



        }
       
         buttonChangeSecP02('.p02-change .ph');





        /*p02次選單預設*/
        function phgroumenuChange(){


           // $($tab).find('.ph-group-menu-tab').attr( 'href','javascript:void(0)')
            
            $('.ph-group-base').each(function(){

                $(this).find('.ph-group-menu').find('li').eq(0).addClass("on");
                let tabid = $(this).find('.ph-group-menu').find('li').eq(0).find('a').attr('href');
                console.log(tabid)
                $(this).find($(tabid)).addClass("on");
                //$(this).find('.link-right').eq(0).addClass("on");

             })

             $('.ph-group-base').find('.ph-group-menu').find('li').click(function(e){
                e.preventDefault();
                
               
                let tabid = $(this).find('a').attr('href');
             
                $(this).parents('.ph-group-menu').find('li').removeClass("on");
                $(this).parents('.ph-group-menu').siblings('.ph-group-tab').removeClass("on");
                //$(this).parents('.ph-group-menu').siblings('.link-right').removeClass("on");

                $(this).addClass("on");
                $(this).parents('.ph-group-base').find($(tabid)).addClass("on");

                //$(this).parents('.ph-menu').siblings('.link-right').eq(num).addClass("on");

    

                })

        }
       /*p02*/
       phgroumenuChange();










        youtube();

        function youtube(){

            let ww = 0;
            $('.poi-youtube').each(function(){

                $(this).find('.ph-group-content').each(function(){

                    let link = $(this).find('a').attr('href');
                    let string = link.split('be/')[1];

                    if( $(this).find('.ph-group-content-photo').width() > ww ){
                        ww = $(this).find('.ph-group-content-photo').width();
                    }
                  

                    let h = ww*0.57;
            
                    let iframe = `
                    <iframe width="100%" height="${h}" 
                    src="https://www.youtube.com/embed/${string}" 
                    title="YouTube video player" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; 
                    encrypted-media; gyroscope; picture-in-picture; 
                    web-share" allowfullscreen></iframe>
                        `;
                    $(this).find('.ph-group-content-photo').html(iframe);


                    let price = $(this).find('.ph-group-content-text-price').prop("outerHTML");
                    $(this).find('.ph-group-content-otherlink').prepend(price);

                    $('.ph-group-content-otherlink').find('a').each(function(){

                        if( $(this).hasClass('ph-group-content-text-price') ){
                            $(this).attr('target','_blank')
                            $(this).removeClass('ph-group-content-text-price')
                        }
                    })
                    $(this).find('.ph-group-content-text-price').remove();

                    
                    
                 
         })

        })
    }



    //短影片
//     youtubeShorts();

//     function youtubeShorts(){

//         $('.poi-youtube-shorts').each(function(){

//             $(this).find('.ph-group-content').each(function(){

                


//                 let link = $(this).find('a').attr('href');
//                 let string = link.split('shorts/')[1]
//                 let h = $(this).find('.ph-group-content-photo').width()*1.7;
        
//                 let iframe = `
//                 <iframe width="100%" height="${h}" 
//                 src="https://www.youtube.com/embed/${string}" 
//                 title="YouTube video player" frameborder="0" 
//                 allow="accelerometer; autoplay; clipboard-write; 
//                 encrypted-media; gyroscope; picture-in-picture; 
//                 web-share" allowfullscreen></iframe>
//                     `;
//                 $(this).find('.ph-group-content-photo').html(iframe);


//                 let price = $(this).find('.ph-group-content-text-price').prop("outerHTML");
//                 $(this).find('.ph-group-content-otherlink').prepend(price);

//                 $('.ph-group-content-otherlink').find('a').each(function(){

//                     if( $(this).hasClass('ph-group-content-text-price') ){
//                         $(this).attr('target','_blank')
//                         $(this).removeClass('ph-group-content-text-price')
//                     }
//                 })
//                 $(this).find('.ph-group-content-text-price').remove();

                
                
             
//      })

//     })
// }


        /*商品判斷餘數*/
        function remainderPoi(){

            $(".poi-remainder").find('.ph-group').each(function () {    
           

                            let phG = $(this);
                            let phGC = phG.find(".ph-group-content");
                            let num = phGC.length;
                            let lastNum = (num % 4)                        

                
                                if (lastNum !== 0) {
                                    if (lastNum == 1) {
                                        phGC.eq(num - 1).addClass("box1");
                                    };
                                    if (lastNum == 2) {
                                        phGC.eq(num - 1).addClass("box2");
                                        phGC.eq(num - 2).addClass("box2");
                        
                                    };
                                    if (lastNum == 3) {
                                        phGC.eq(num - 1).addClass("box3");
                                        phGC.eq(num - 2).addClass("box3");
                                        phGC.eq(num - 3).addClass("box3");
                        
                                    };
                        
                                } else {
                                    console.log("4可除")
                                }




          })

      }
      /*resize移除class*/
      function removeRemainderPoi(){

        $(".poi-remainder").find('.ph-group').each(function () {    

            $(this).find(".ph-group-content").each(function(){

                if( $(this).hasClass("box1") ){
                    $(this).removeClass("box1") 
                }
                if( $(this).hasClass("box2") ){
                    $(this).removeClass("box2") 
                }
                if( $(this).hasClass("box3") ){
                    $(this).removeClass("box3") 
                }
            })

        })




      }


        /*yt短影音*/
     var moviestr = [];

        var moviestrimg =[];
        if($('.get-movie-goods').length !=0){

            $('.get-movie-goods').each(function(e){

                $(this).find('.ph-group-content').each(function(){

                    if(  window.innerWidth > 992 ){
                        $(this).addClass('box2');
                    }
    
                })

                moviestr.push($(this).find('.ph-group').html());
                moviestrimg.push($(this).find('.get-movie-img-content').html());

            })
            //  console.log(moviestr[0])  
            //  console.log(moviestrimg[0]) 

            $('.poi-add-shortYT').find('.ph-group').eq(0).before(`<div class="movie-goods-content">${moviestr[0]}${moviestrimg[0]}</div>`);

 




        }

        

            function moviegoodsremainderPoi(){


                $('.movie-goods-content').each(function(){

                    $(this).find('.ph-group-content').each(function(){
                        $(this).addClass('box2');
                    })

                })

            }



            function removemoviegoodsremainderPoi(){


                $('.movie-goods-content').each(function(){
                    $(this).find('.ph-group-content').each(function(){
                        if($(this).hasClass('box2')){
                            $(this).removeClass('box2')
                        }
                     })

                    
                      
                   

                })

            }






    /*刪除上圖下文poi*/
      function picTextClass(){

        let windowWidth = window.innerWidth;


            $(".poi-pic-text").each(function () {  


                     if( windowWidth < 576 ){
                
                        $(this).removeClass('poi-pic-onlytext');

                    } else{

                        $(this).addClass('poi-pic-onlytext');

                }



            })

      }


      picTextClass();


        let windowWidth = window.innerWidth;
        
        if( windowWidth > 992 ){
              moviegoodsremainderPoi();
                remainderPoi();
        }

        $(window).resize(function(){

            let windowWidth = window.innerWidth;

            if( windowWidth > 992 ){
             
                remainderPoi();
                moviegoodsremainderPoi();
               
                
            }else{
               removeRemainderPoi();
               removemoviegoodsremainderPoi()

            }


            picTextClass();
        })
        
        
        
        
        
        


        /*poi模組otherlink 搬到poi最下面*/

        function poi_otherLink(){

            $('.poi-goods').each(function(){

                let i = 0;

                $(this).find('.ph-group').each(function(){

                    i=i+1;

                    $(this).after(`<div class="poi-morelink poi-morelink${i}"></div>`);
    
                    if( $(this).find('.ph-group-content-otherlink').find('a').length !=0){

                        $(this).find('.ph-group-content').each(function(){
                         

                            $(this).find('.ph-group-content-otherlink').find('a').each(function(){

                                let text = $(this).prop("outerHTML"); 
                                 $(this).parents('.poi-goods').find(`.poi-morelink${i}`).append(text);
                                 $(this).remove();

                            })
 
                       
                    })

                  }
                })
            })

        }

      //  poi_otherLink();


        //API


        // function removeClass(ele) {
        //     ele.classList.remove('on');
        // };
        // function addClass(ele) {
        //     ele.classList.add('on');
        // };
    
        // const itemsArray = []; //創建一個陣列，要放入所有被偵測範圍的狀態，稍後會用到，會解釋。
    
        // //***改這改這改這改這改這改這改這改這改這****//
        // const nav = document.querySelectorAll(".nav-list a");
        // const title = document.querySelectorAll(".scrollLight");
    
        // const allDom = [...nav, ...title];
        // //console.log(allDom)
    
    
    
        // const option = {// intersectionObserver 的額外設定。
        //     root: null,
        //     rootMargin: "-100px 0px 0px 0px", //視窗的偵測範圍改變，順序為上左下右。假如(0px 0px -100px 0px)，就是物件往上跑進視窗內後，要多跑100px，才會被偵測。
        //     threshold: 0.0,//被偵測的DOM，是否要縮減自身被偵測範圍。0 = 正常;0.5 =縮小一半。
        // };
    
        // function checkNum() {
        //     for (let i = 0; i < itemsArray.length; i++) {
        //         console.log(itemsArray)
        //         if (itemsArray[i] === 1) {
        //             allDom.forEach(ele => {
        //                 removeClass(ele)
        //             });
        //             addClass(document.querySelectorAll(".scrollLight")[i]);
        //             addClass(nav[i]);
        //             break;
    
        //         }
        //            if (itemsArray[i] === 0) {
        //                allDom.forEach(ele => {
        //                    removeClass(ele)
        //                });

        //            }
        //     };
        // };
        // title.forEach((ele, idx) => {
        //     itemsArray.push(0);//每個要被偵測的物件，預設狀態0，丟進itemsArray陣列。
        //     //假如你有五個區域要被偵測（此範例就是5個標題），那itemsArray就會是[0,0,0,0,0];
    
        //     const intersectionObserver = new IntersectionObserver((entries) => {
    
        //         // entries[0].intersectionRatio 是被偵測物體的狀態，如果是0，就是還未進入看見或偵測範圍。
        //         if (entries[0].intersectionRatio <= 0) {//未進入範圍
        //             itemsArray[idx] = 0;//因為在偵測範圍外，所以itemsArray相對順序狀態給0
        //             checkNum();
    
        //         } else {//進入範圍
        //             itemsArray[idx] = 1;//在偵測範圍內，所以itemsArray相對順序狀態給1
        //             checkNum();
        //         };
        //     }, option);
        //     intersectionObserver.observe(ele);
        // });



        


        
 
})




  

$(window).on("load", function (e) {

    
     
})
