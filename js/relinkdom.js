/**版本號v2.2 202207225**/
/** v2.2 202207225：新增產出的 a 帶有 target _blank 屬性  **/
console.time()
function changePoiA() {
    let phg = document.getElementsByClassName("ph-group-content");

    function addA($link, $html) {
        let a = document.createElement('a');
        a.innerHTML = $html;
        a.href = $link;
        a.target = "_blank";
        return a;
    };

    for (let i = 0, num = phg.length; i < num; i++) {

        let $this = phg[i];
        let $photo = $this.getElementsByClassName("ph-group-content-text");
        let $link = $photo[0].getElementsByTagName("a")[0].href;


        let $p = phg[i].getElementsByTagName("p");
        for (let j = 0, numj = $p.length; j < numj; j++) {
            let newA = addA($link, $p[j].innerHTML);
            $p[j].innerHTML = "";
            $p[j].appendChild(newA);
        }//end for j
    }; //end for i
};
  changePoiA();

// const design_poiImgID = document.querySelectorAll('.ph-group-content img');

// let design_poiImgNum = 0;
// design_poiImgID.forEach((item, index) => {
//     const img = new Image();
//     img.src = item.src;

//     img.addEventListener("load", () => {

//         design_poiImgNum += 1;
//         if (design_poiImgID.length === design_poiImgNum) {
          
//         }
//     });
// });

console.timeEnd();