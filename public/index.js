const joinBtn = document.querySelector("#joinBtn")
const roomNameInput = document.querySelector("#roomNameInput");
const passwordInput = document.querySelector("#passwordInput");


joinBtn.addEventListener("click",onClick)

async function onClick() {
    console.log("Click")
    let reqBody = {
        roomName: roomNameInput.value,
        password: passwordInput.value
    }
    console.log(reqBody);

    const response = await fetch("./auth",{
        method:"put",
        body: JSON.stringify(reqBody),
        headers: {'Content-Type':'application/json','Accept':'application/json'},
    });
    const jsonRes = await response.json();
    if(jsonRes.auth) {
        const targetUrl =  "./rooms/"+jsonRes.roomId + (jsonRes.newRoom ? "?new=1" : "");
        console.log("redirecting to ",targetUrl);
        window.location = targetUrl;
    } else {

    }
}