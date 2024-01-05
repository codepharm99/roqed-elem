// highlight
document.querySelector('.submit').addEventListener('click', function(event) {
    event.preventDefault(); 

    const firstName = document.querySelector('.fn:nth-of-type(1)').value.trim();
    const lastName = document.querySelector('.fn:nth-of-type(2)').value.trim();
    const email = document.querySelector('.fn:nth-of-type(3)').value.trim();
    const phoneNumber = document.querySelector('.fn:nth-of-type(4)').value.trim();
    const country = document.querySelector('.fn:nth-of-type(5)').value.trim();
    const comments = document.querySelector('.ac').value.trim();

    if (firstName === '') {
        highlightField('.fn:nth-of-type(1)');
    } else {
        removeHighlight('.fn:nth-of-type(1)');
    }
    if (lastName === '') {
        highlightField('.fn:nth-of-type(2)');
    } else {
        removeHighlight('.fn:nth-of-type(2)');
    }
    if (email === '') {
        highlightField('.fn:nth-of-type(3)');
    } else {
        removeHighlight('.fn:nth-of-type(3)');
    }
    if (country === '') {
        highlightField('.fn:nth-of-type(5)');
    } else {
        removeHighlight('.fn:nth-of-type(5)');
    }

    function highlightField(selector) {
        document.querySelector(selector).style.border = '1px solid red';
    }

    function removeHighlight(selector) {
        document.querySelector(selector).style.border = '1px solid rgba(255, 255, 255, 0.296)';
    }
});

// cursour
let pointer = document.getElementsByClassName("pointer")[0]; 

function isTouch() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}

const move = (e) => {
    let x, y;
    try {
        x = !isTouch() ? e.pageX : e.touches[0].pageX;
        y = !isTouch() ? e.pageY : e.touches[0].pageY;
    } catch (e) {
        console.error("Error:", e);
    }
    if (x !== undefined && y !== undefined) {
        pointer.style.left = x + 'px';
        pointer.style.top = y + 'px';
    }
};

document.addEventListener("mousemove", (e) => {
    move(e);
});

document.addEventListener("touchmove", (e) => {
    move(e);
});

const styleElement = document.createElement('style');
styleElement.innerHTML = pointerStyle;
document.head.appendChild(styleElement);

function sendMail() {
    const firstName = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim();
    const country = document.getElementById("cn").value.trim();

    if (firstName === '' || lastName === '' || email === '' || country === '') {
        alert("ZAPOLNI POLE!"); 
    } else {
        let parms = {
            name: firstName,
            lname: lastName,
            email: email,
            pn: document.getElementById("pn").value,
            cn: country,
            message: document.getElementById("message").value
        };

        let mailMessage = `
            Name: ${parms.name} ${parms.lname}
            Email: ${parms.email}
            Phone Number: ${parms.pn}
            Country: ${parms.cn}
            Message: ${parms.message}
        `;

        parms.message = mailMessage;

        emailjs.send("service_cg0w32j", "template_jdj8rk1", parms)
            .then(function(response) {
                alert("Email Sent!");
                console.log("SUCCESS!", response.status, response.text);

                document.getElementById("name").value = '';
                document.getElementById("lname").value = '';
                document.getElementById("email").value = '';
                document.getElementById("pn").value = '';
                document.getElementById("cn").value = '';
                document.getElementById("message").value = '';
            }, function(error) {
                console.log("FAILED...", error);
                alert("Email failed to send.");
            });
    }
}

