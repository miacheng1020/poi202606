class ScrollHightlight {
    constructor(option) {
        this.btn = document.querySelectorAll(option.btn);
        this.pin = document.querySelectorAll(option.pin);
        this.early = option.early ? option.early : 0;
        this.className = option.className ? option.className : "scrollOn";
        this.pinArray = [];
        this.maxHeight = 999999;
    };

    removeCSS(dom) {
        if (dom.classList.contains(this.className)) {
            dom.classList.remove(this.className);
        } 
    };
    addCSS(dom) {
        if (!dom.classList.contains(this.className)) {
            dom.classList.add(this.className);
        }
    }

    start() {

        window.addEventListener("scroll", e => {
            let nowTop = window.pageYOffset + this.early


            for (let i = 0; i < this.pinArray.length; i++) {

                if (nowTop > this.pinArray[i] && nowTop < this.pinArray[i + 1]) {

                    this.addCSS(this.pin[i]);
                    this.addCSS(this.btn[i]);

                    if (i !== 0) {
                        this.removeCSS(this.pin[(i - 1)]);
                        this.removeCSS(this.btn[(i - 1)]);
                    }
                    
                    if (i < this.pinArray.length - 2) {
                        this.removeCSS(this.pin[(i + 1)]);
                        this.removeCSS(this.btn[(i + 1)]);
                    }
                  
                    break;


                }  else {

            
                    this.removeCSS(this.btn[0]);
                    this.removeCSS(this.pin[0]);


                }
            }


        })
    };

    init() {
        function offset(target) {
            let top = 0, left = 0;
            while (target.offsetParent) {
                top += target.offsetTop;
                left += target.offsetLeft;
                target = target.offsetParent;
            }

            return {
                top: top,
                left: left
            }
        };


        if (this.btn.length == this.pin.length) {

            this.pin.forEach(e => {
                console.log(offset(e).top)
                this.pinArray.push(offset(e).top)

                // console.log(e.offsetTop)
                // this.pinArray.push(e.offsetTop)
            });
            this.pinArray.push(this.maxHeight)

            this.start();
        } else[
            console.log("按鈕與區域，兩邊數量不齊")
        ]
    }

};