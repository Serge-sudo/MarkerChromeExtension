//---------------------
function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}
//---------------------
function DesignFunc(cssstyle, bol, valuuu) {

    // Get Selection
    sel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    // Set design mode to on
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    // Colorize text
    document.execCommand(cssstyle, bol, valuuu);
    // Set design mode to off
}

//----------------
if (document.getElementById('can') && document.getElementById('draggable')) {
    $("#draggable").toggle();

} else {
    var erase_drawing = false;
    var stop = false;
    var canvas = document.createElement("canvas");
    canvas.id = "can";
    document.body.appendChild(canvas);
    var draggable = document.createElement("div");
    draggable.id = "draggable";
    $(draggable).attr("contenteditable", "false");
    document.body.appendChild(draggable);
    $("#drawingCanvas").append('</canvas>');
    $("#draggable").append('<div class="title_content_draggable">Color</div><input style="height: 40px; margin: 5px; border-radius: 2px; width: 120px; border: 1px solid black !important; background-color: #ffffff; padding: 1px; box-sizing: border-box;" type="color" name="color" id="color" value="#FF0000"><div class="title_content_draggable">Tools</div><a id="pen_pagemarker"><img id="pen_pagemarkerImg" style="padding:0px;width:21px!important;height:20px!important" width="20px" height="20px"></img></a><a id="eraser_pagemarker"><img id="eraser_pagemarkerImg" style="padding:0px;width:21px!important;height:20px!important" width="21px" height="20px"></img></a><div class="title_content_draggable">Thickness</div><input type="range" id="thickness" style="color: rgb(144, 144, 144); outline: none; -webkit-appearance: slider-horizontal; border: 0px; margin: 5px; width: 120px; padding:3px;" value="3" max="40" min="1"><div class="title_content_draggable">Opacity</div><input type="range" value="1" step="0.01" min="0" max="1" id="opacit"/></div><div class="title_content_draggable">Design Mode</div><br /><label>On <input type="radio" style="display:inline-block" name="des" value="on"> </label><br> <br /><label>Off <input type="radio" style="display:inline-block" name="des" value="off"> </label><br /><br /><input type="button" value="Clear" id="clear_canvas" class="draggable_button"><input type="button" value="Close" id="exit_canvas" class="draggable_button"><input type="button" value="Save" id="svb" class="draggable_button"><input type="button" value="Delete" id="dlb" class="draggable_button"><input type="button" value="Screenshot"   id="scren" />');
    chrome.storage.sync.get({
        pen_color: '#FF0000',
        pen_thickness: 3
    }, function(items) {
        document.getElementById("thickness").value = items.pen_thickness;
        $("#color").val(items.pen_color);
    });
    $(function() {
        if (localStorage.getItem(document.location.href)) {
            var imageObj = new Image();
            imageObj.src = localStorage.getItem(document.location.href);
            setTimeout(function() {
                canvas.getContext("2d").drawImage(imageObj, 0, 0);
            }, 500); // draw image from memory
        }
    });


    document.getElementById("pen_pagemarkerImg").src = chrome.extension.getURL("pen.png");
    document.getElementById("eraser_pagemarkerImg").src = chrome.extension.getURL("eraser.png");
    document.getElementById("pen_pagemarker").style.background = "rgba(0,0,0,0.2)";
    $("#clear_canvas").click(erase);
    $("#exit_canvas").click(exit);
    $("#pen_pagemarker").click(pen);
    $("#eraser_pagemarker").click(eraser);
    var pen_pagemarker = document.getElementById("pen_pagemarker");
    var eraser_pagemarker = document.getElementById("eraser_pagemarker");
    var content = document.getElementsByClassName("title_content_draggable");
    var buttons = document.getElementsByClassName("draggable_button");
    var svb = document.getElementById("svb");
    pen_pagemarker.style.cssText = "display:inline-block;margin:5px;box-sizing:content-box;padding:4px;width : 21px;height : 20px;border-radius : 3px;cursor : pointer";
    eraser_pagemarker.style.cssText = "display:inline-block;margin:5px;box-sizing:content-box;padding:4px;width : 21px;height : 20px;border-radius : 3px;cursor : pointer";

    for (var i = 0; i < content.length; i++) {
        content[i].style.cssText = "padding : 5px;color :#000000; font-size  : 15px ; font-family :  Helvetica ; margin-bottom  : 0px ; margin-top :  0px ; text-transform :  none ; user-select :  none ; clear :  none ";
    }
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.cssText = " box-sizing  : border-box ; font-size :  15px ; font-family :  Helvetica ; margin :  10px 5px 10px 5px ; text-transform  : none ; padding :  10px 15px ; border-radius :  5px ; cursor :  pointer ; background :  -webkit-linear-gradient(top, rgba(252,252,252,1) 0%,rgba(224,224,224,1) 100%) ; box-shadow :  inset 0 1px 6px #ccc ; color :  #000000 ; border :  1px solid #ccc ; width  : 70px ; height  : 40px ; position :  relative ; opacity  : 1 ; line-height  : 1.2 ; font-weight  : 400 ; text-overflow :  clip ; user-select :  none ; outline  : none ";
    }
    document.getElementById("scren").style.cssText = " box-sizing  : border-box ; font-size :  15px ; font-family :  Helvetica ; margin :  10px 0 ; text-transform  : none ; padding :  10px 15px ; border-radius :  5px ; cursor :  pointer ; background :  -webkit-linear-gradient(top, rgba(252,252,252,1) 0%,rgba(224,224,224,1) 100%) ; box-shadow :  inset 0 1px 6px #ccc ; color :  #000000 ; border :  1px solid #ccc ; width  : 100% ; height  : 40px ; position :  relative ; opacity  : 1 ; line-height  : 1.2 ; font-weight  : 400 ; text-overflow :  clip ; user-select :  none ; outline  : none ";
    draggable.style.cssText = "position:fixed; box-sizing  :  content-box ; line-height  :  0.7 ; cursor  :  move  ; width  :  160px ; text-align :  left ; border-color   :  rgb(236, 236, 236) ; background-color   :  rgb(236, 236, 236) ; box-shadow   :  10px 10px 50px #5e5e5e ; border-style   :  solid ; border-width   :  5px ; border-radius   :  5px ; margin   :  20px ; padding   :  6px ; top   :  0 ; right   :  0 ; z-index   :  2147483647 ; user-select   :  none ; display   :  block ";
    canvas.style.cssText = "top   :  0px ; left   :  0px ; position   :  absolute ; z-index   :  2147483646 ; background-color   :  transparent ; user-select   :  none ";
    // erase_drawing
    $(function() {
        $("#draggable").draggable();
    });

    var ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        prevtouchX = 0,
        prevtouchY = 0,
        touchX = 0,
        touchY = 0;



    canvas.width = document.body.clientWidth;
    canvas.height = $(document).height();
    ctx = canvas.getContext("2d");

    w = canvas.width;
    h = canvas.height;

    $("#svb").click(function() {

        var d = canvas.toDataURL("image/png");
        localStorage.setItem(document.location.href, d);

    });
    $("#dlb").click(function() {
        if (localStorage.getItem(document.location.href)) {
            localStorage.removeItem(document.location.href);
        }
    });
    canvas.addEventListener("mousemove", function(e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function(e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function(e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function(e) {
        findxy('out', e)
    }, false);
    canvas.addEventListener('touchstart', sketchpad_touchStart, false);
    canvas.addEventListener('touchmove', sketchpad_touchMove, false);

    function draw() {
        ctx.beginPath();
        if (erase_drawing) {
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineWidth = thickness * 3;
            ctx.strokeStyle = color;
            ctx.lineJoin = "round";
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.closePath();
            ctx.stroke();
        } else {
            ctx.globalCompositeOperation = "source-over";
            ctx.lineWidth = thickness;
            ctx.strokeStyle = color;
            ctx.lineJoin = "round";
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.closePath();
            ctx.stroke();
        }
    }

    function drawTouch(x, y) {
        var thickness = document.getElementById("thickness").value;
        var color = hexToRGB(document.getElementById("color").value, document.getElementById("opacit").value);
        ctx.beginPath();
        if (erase_drawing) {
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineWidth = thickness * 3;
            ctx.strokeStyle = color;
            ctx.lineJoin = "round";
            ctx.moveTo(prevtouchX, prevtouchY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
        } else {
            ctx.globalCompositeOperation = "source-over";
            ctx.lineWidth = thickness;
            ctx.strokeStyle = color;
            ctx.lineJoin = "round";
            ctx.moveTo(prevtouchX, prevtouchY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
        }
    }

    function erase() {
        ctx.clearRect(0, 0, canvas.width - 0.1, canvas.height - 0.1);
    }

    function eraser() {
        erase_drawing = true;
        document.getElementById("pen_pagemarker").style.background = "rgba(0,0,0,0)";
        document.getElementById("eraser_pagemarker").style.background = "rgba(0,0,0,0.2)";
    }

    function pen() {
        erase_drawing = false;
        document.getElementById("eraser_pagemarker").style.background = "rgba(0,0,0,0)";
        document.getElementById("pen_pagemarker").style.background = "rgba(0,0,0,0.2)";
    }

    function exit() {
        if (document.getElementById('bar')) document.getElementById('bar').remove();
        document.designMode = "off";
        document.getElementById('can').remove();
        document.getElementById('draggable').remove();

        stop = true;
    }

    function findxy(res, e) {
        if (res == 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.pageX - canvas.offsetLeft;
            currY = e.pageY - canvas.offsetTop;
            var thickness = document.getElementById("thickness").value;
            var color = hexToRGB(document.getElementById("color").value, document.getElementById("opacit").value);
            ctx.beginPath();
            if (!erase_drawing) {
                ctx.globalCompositeOperation = "source-over";
                ctx.strokeStyle = color;
                ctx.lineWidth = thickness;
                ctx.lineJoin = "round";
                ctx.moveTo(currX, currY - 0.001);
                ctx.lineTo(currX, currY);
            } else {
                ctx.globalCompositeOperation = "destination-out";
                ctx.strokeStyle = color;
                ctx.lineWidth = thickness * 3;
                ctx.lineJoin = "round";
                ctx.moveTo(currX, currY - 0.001);
                ctx.lineTo(currX, currY);
            }
            ctx.closePath();
            ctx.stroke();
            flag = true;
        }
        if (res == 'up' || res == "out") {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.pageX - canvas.offsetLeft;
                currY = e.pageY - canvas.offsetTop;
                draw();
            }
        }
    }

    function getTouchPos(e) {
        if (!e)
            var e = event;
        if (e.touches) {
            if (e.touches.length == 1) {
                prevtouchX = touchX;
                prevtouchY = touchY;
                var touch = e.touches[0];
                touchX = touch.pageX - touch.target.offsetLeft;
                touchY = touch.pageY - touch.target.offsetTop;
            }
        }
    }

    function sketchpad_touchStart() {
        getTouchPos();
        prevtouchX = touchX;
        prevtouchY = touchY;
        drawTouch(touchX, touchY);
        event.preventDefault();
    }

    function sketchpad_touchMove(e) {
        getTouchPos();
        drawTouch(touchX, touchY);
        event.preventDefault();
    }

    $(function() {
        $('input[name="des"]:radio').change(function() {
            if ($("input[name='des']:checked").val() == "on") {
                document.designMode = "on";
                document.getElementById('can').style.display = "none";

                var bar = document.createElement("div");
                bar.id = "bar";
                document.body.appendChild(bar);
                $("#bar").draggable();
                $(bar).attr("contenteditable", "false");
                bar.style.cssText = "position:fixed;box-sizing  :  content-box ; line-height  :  0.7 ; cursor  :  move  ; width  :  208px ; text-align :  left ; border-color   :  rgb(236, 236, 236) ; background-color   :  rgb(236, 236, 236) ; box-shadow   :  10px 10px 50px #5e5e5e ; border-style   :  solid ; border-width   :  5px ; border-radius   :  5px ; margin   :  20px ; padding   :  6px ; top   :  0 ; right   :  0 ; z-index   :  2147483647 ; user-select   :  none ; display   :  block "
                $("#bar").html('<select id="ff" style="width:100%"><option value="Arial">Arial</option><option value="Calibri">Calibri</option><option value="serif">serif</option><option value="Comic Sans MS">Comic Sans MS</option><option value="sans-serif">sans-serif</option><option value="monospace">monospace</option><option value="cursive">cursive</option><option value="fantasy">fantasy</option></select><br /><br /><img src="https://www.pngitem.com/pimgs/m/346-3461982_redo-redo-icon-png-transparent-png.png" alt="" width="20px" id="redo" /><img src="https://iconape.com/wp-content/png_logo_vector/undo-4.png" alt="" id="undo" width="20px"/><img id="bold" src="https://www.clipartmax.com/png/full/110-1108106_bold-italic-underline-icons.png" width="20px" alt="" />  <img  id="italic" src="https://www.shareicon.net/data/512x512/2015/12/15/687597_button_512x512.png" width="20px" alt="" /> <img id="crlink" src="https://cdn4.iconfinder.com/data/icons/web-links/512/42-512.png" width="20px" alt="" /><img id="unlink" src="https://cdn2.iconfinder.com/data/icons/seo-web-optomization-ultimate-set/512/remove_link-512.png" width="20px" alt="" />  <img src="https://png.icons8.com/windows/1600/subscript.png" width="20px" id="sub" alt="" /><img src="https://png.icons8.com/windows/1600/superscript.png" id="sup" width="20px" alt="" /><input type="color"  id="col" title="Text Color" style="width:20px" /><br /><input type="color" style="width:20px" title="Background Color" id="bgcol"  /> <img src="https://cdn0.iconfinder.com/data/icons/smoothies-vector-icons-volume-2/48/145-512.png" width="20px" alt="" id="jc" /><img src="https://cdn0.iconfinder.com/data/icons/web-user-interface-5/50/138-512.png" alt="" id="jf" width="20px" /><img src="http://simpleicon.com/wp-content/uploads/align-left.png" alt="" id="jl" width="20px"  /><img src="http://simpleicon.com/wp-content/uploads/align-right.png" alt="" id="jr" width="20px" /><img src="https://png.icons8.com/ios/1600/horizontal-line.png" alt=""  width="20px" id="hl" /><img src="https://cdn2.iconfinder.com/data/icons/interface-part-1/32/html-code-512.png" alt="" width="20px" title="Insert HTML" id="inshtml" /><img src="https://png.icons8.com/metro/1600/underline.png" alt=""  width="20px" id="undl" /><img src="http://downloadicons.net/sites/default/files/strikethrough-icon-64376.png" alt="" width="20px" id="st" /><br /><br /><input type="range" min="1" max="7"  style="width:100%"  id="sizechanger" value="1" name="size" /> ');
                $("#bold").click(function() {
                    DesignFunc("bold");
                });
                $("#italic").click(function() {
                    DesignFunc("italic");
                });
                $("#redo").click(function() {
                    DesignFunc("redo");
                });
                $("#undo").click(function() {
                    DesignFunc("undo");
                });
                $("#jc").click(function() {
                    DesignFunc("justifyCenter");
                });
                $("#jf").click(function() {
                    DesignFunc("justifyFull");
                });
                $("#jl").click(function() {
                    DesignFunc("justifyLeft");
                });
                $("#jr").click(function() {
                    DesignFunc("justifyRight");
                });
                $("#sup").click(function() {
                    DesignFunc("superscript");
                });
                $("#sub").click(function() {
                    DesignFunc("subscript");
                });
                $("#hl").click(function() {
                    DesignFunc("insertHorizontalRule");
                });
                $("#undl").click(function() {
                    DesignFunc("underline");

                });
                $("#st").click(function() {
                    DesignFunc("strikeThrough");

                });
                $("#crlink").click(function() {
                    let p = prompt("Enter Link!");
                    let regex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
                    if(p.match(regex))
                    DesignFunc("createLink", false, p);
                    else alert("THIS ISN'T REAL URL"); 
                });
                $("#inshtml").click(function() {
                    let p = prompt("Enter HTML!");
                    DesignFunc("insertHTML", false, p);
                });
                $("#ff").change(function() {
                    DesignFunc("fontName", false, $('#ff').val());
                });

                $("#unlink").click(function() {
                    DesignFunc("unlink");
                });

                $("#sizechanger").on("change", function() {
                    $("#pixplace").html("Size: " + $("#sizechanger").val());
                    DesignFunc("fontSize", false, $("#sizechanger").val());

                });
                $("a").click(function() {
                    return;
                });
                $("#col").on("change click", function() {
                    DesignFunc("foreColor", false, $("#col").val());
                });
                $("#bgcol").on("change click", function() {
                    DesignFunc("hiliteColor", false, $("#bgcol").val());
                });

                stop = true;

            } else {
                document.designMode = "off";
                document.getElementById('can').style.display = "block";
                document.getElementById('bar').remove();
            }
        });

    });
    $(function() {
        document.getElementById("scren").onclick = function() {
            $("#draggable").toggle();
            html2canvas(document.body).then(function(canvas) {
                var asd = canvas.toDataURL();
                var win = window.open();
                win.document.title = "Screnshot";
                win.document.write("<br><img style='cursor:pointer' src='" + asd + "'/>");
                win.stop();
            });
        };
    })

}