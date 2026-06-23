/*sessionStorage.setItem("mkt_tab", "#go2");
sessionStorage.setItem("mkt_anc", "#go2 div:nth-child(5)");
sessionStorage.setItem("mkt_button", ".index3 ul li:nth-child(2)");*/

async function check() {
    function clearStorage(){
        if (sessionStorage["mkt_tab"]) { sessionStorage.removeItem("mkt_tab"); }
        if (sessionStorage["mkt_anc"]) { sessionStorage.removeItem("mkt_anc"); }
        if (sessionStorage["mkt_button"]) { sessionStorage.removeItem("mkt_button"); }
        

    };//clearStorage()

    function checkButton(){
        if (sessionStorage["mkt_button"]) {
            var buttonDom = sessionStorage["mkt_button"];
            $(buttonDom).siblings().removeClass("on");
            $(buttonDom).addClass("on");
            };
            clearStorage();

    };//checkButton()

    function checkAnc() {
        if (sessionStorage["mkt_anc"]) {
            var ancDom = sessionStorage["mkt_anc"];
            $("html,body").animate({ scrollTop: $(ancDom).offset().top  })
            console.log( ancDom )


        };
        checkButton();

    };//checkAnc

    function checkTab() {
        if (sessionStorage["mkt_tab"]) {
            var tabDom = sessionStorage["mkt_tab"];
            $(tabDom).siblings().removeClass("on");
            $(tabDom).addClass("on");

        };
        checkAnc();

    }; //checkTab()


    checkTab();
    //await checkAnc();
    //await checkButton();
    //await clearStorage();



}; //check()




function menu_goToArc($data) {

    var page = $data.page;    
    var tab = $data.tab;
    var anc = $data.anc;
    var button = $data.button;
   
    if (anc !== undefined) {        
        sessionStorage.setItem("mkt_anc", anc);
    };

    if (tab !== undefined) {        
        sessionStorage.setItem("mkt_tab", tab);
    };
    if (button !== undefined) {        
        sessionStorage.setItem("mkt_button", button);
    };
    

    window.location.href = page;    

}; //menu_goToArc()



$(window).on("load", function (e) {
        check();
})
