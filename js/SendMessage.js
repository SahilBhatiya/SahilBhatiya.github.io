const scriptURL = "https://script.google.com/macros/s/AKfycbwGU68Yc9BjFKU-spCPr5Gzs4wGr2ZTqPyF_68HUhmrHRrRfr_d/exec",
    form = document.getElementsByClassName("contact-form"),
    btnForm = document.getElementById("submit-btn");
btnForm.addEventListener("click", a => {
    a.preventDefault();
    let b = document.getElementById("nameContact").value,
        c = document.getElementById("emailContact").value,
        d = document.getElementById("messageContact").value;
    "" != b && "" != c & "" != d ? (btnForm.innerHTML = "Please Wait", btnForm.style.background = "var(--Yellow-color)", $("#submit-btn").attr("disabled", !0), fetch(scriptURL, {
        method: "POST",
        body: new FormData(form[0])
    }).then(() => {
        btnForm.innerHTML = "Thank You For Contacting", btnForm.style.background = "var(--Green-color)", $("#submit-btn").attr("disabled", !1), setTimeout(function () {
            $("input").val(""), $("textarea").val("")
        }, 1e3), setTimeout(function () {
            btnForm.innerHTML = "Send Message", btnForm.style.background = "var(--Blue-color)"
        }, 3e3)
    }).catch(() => {
        btnForm.innerHTML = "Cannot Submit", btnForm.style.background = "var(--Red-color)", $("#submit-btn").attr("disabled", !1)
    })) : (btnForm.innerHTML = "Cannot Submit", btnForm.style.background = "var(--Red-color)", $("#submit-btn").attr("disabled", !1))
});