const scriptURL = 'https://script.google.com/macros/s/AKfycbwGU68Yc9BjFKU-spCPr5Gzs4wGr2ZTqPyF_68HUhmrHRrRfr_d/exec'

const form = document.getElementsByClassName('contact-form')
const btnForm = document.getElementById('submit-btn')

btnForm.addEventListener('click', e => {
    e.preventDefault()
    let UserName = document.getElementById('nameContact').value;
    let UserEmail = document.getElementById('emailContact').value;
    let UserMessage = document.getElementById('messageContact').value;
    if (UserName != "" && UserEmail != "" & UserMessage != "") {
        btnForm.innerHTML = "Please Wait";
        btnForm.style.background = "var(--Yellow-color)";
        $("#submit-btn").attr("disabled", true);
        fetch(scriptURL, {
                method: 'POST',
                body: new FormData(form[0])
            })
            .then(response => {
                btnForm.innerHTML = "Thank You For Contacting";
                btnForm.style.background = "var(--Green-color)";
                $("#submit-btn").attr("disabled", false);
                setTimeout(function() {
                    $("input").val("");
                    $("textarea").val("");
                }, 1000);
                setTimeout(function() {
                    btnForm.innerHTML = "Send Message";
                    btnForm.style.background = "var(--Blue-color)";
                }, 3000);

            })
            .catch(error => {
                btnForm.innerHTML = "Cannot Submit";
                btnForm.style.background = "var(--Red-color)";
                $("#submit-btn").attr("disabled", false);
            })
    } else {
        btnForm.innerHTML = "Cannot Submit";
        btnForm.style.background = "var(--Red-color)";
        $("#submit-btn").attr("disabled", false);
    }
})