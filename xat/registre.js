// RESGISTRO  X
function registre() {
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var mail = document.getElementById("mail").value;
    var codeCountry = document.getElementById("codeCountry").value;

    var http = new XMLHttpRequest();

    http.open("POST", "http://localhost:3002/Xat/Register?user=" + user + "&pass=" + pass + "&mail=" + mail + "&codeCountry=" + codeCountry, true);

    http.onload = function() {
        if (http.status == 200) {
            var response = http.responseText;
           
                console.info("User registrado");
                alert("User registrado correctamente");

                document.getElementById("user").value = "";
                document.getElementById("pass").value = "";
                document.getElementById("mail").value = "";
                document.getElementById("codeCountry").value = "";
        } else {
            console.error("Error en la solicitud Release", http.status);
        }
    };

    http.send();
}


function llistaPaisos(){
    let http = new XMLHttpRequest();

    http.open("GET","http://localhost:3002/Xat/Register", true);


    http.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            console.log(this.responseText);
            var paisos = JSON.parse(http.response);
            var select = document.getElementById("codeCountry");

            select.innerHTML = "";

            paisos.forEach(function(pais) {
                var option = document.createElement("option");
                option.text = pais.name;
                option.value= pais.code;
                select.add(option);
            });
        }
    }
    http.send();
}


function logOutMenu() {
    window.location.href = "menu.html";
}


//LOGIN X

function login(){
    var http = new XMLHttpRequest();

    let mail = document.getElementById("mail").value;
    let pass = document.getElementById("pass").value;


    http.open("GET", "http://localhost:3002/Xat/Login?mail="+mail+"&pass="+pass, true);

    http.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            var session = http.responseText;
            if(session !== null){
                sessionStorage.setItem("session",session);
                sessionStorage.setItem("mail",mail);
                window.location.href = "menu.html";
            }else{
                alert("Session interrunpida. Vuelva a intentralo");
            }
        }
    }
    http.send();
}

//FRIENDS X

function afegirAmic() {
    let mail = sessionStorage.getItem('mail');
    let session = sessionStorage.getItem('session');
    let friend = document.getElementById("friend").value;

    var http = new XMLHttpRequest();

    http.open("POST", "http://localhost:3002/Xat/Friend?mail="+ mail + "&session=" +session +"&friend=" + friend, true);
    http.send();

}

function llistaAmics(){
    var mail = sessionStorage.getItem('mail');
    var session = sessionStorage.getItem('session');

    var http = new XMLHttpRequest();


    http.open("GET", "http://localhost:3002/Xat/Friend?mail="+mail+"&session="+session, true);

        http.onreadystatechange = function() {
            if (http.readyState === 4 && http.status === 200) {
                var response = http.responseText;
                var friends = JSON.parse(response);
                
                
                var friendsList = document.getElementById("friendsList");
                friendsList.innerHTML = "";
                
                for (var i = 0; i < friends.length; i++) {
                    var friend = friends[i];
                    var friendItem = document.createElement("li");
                    friendItem.textContent = friend;
                    friendsList.appendChild(friendItem);
                }
            }
        };
    
        http.open("GET", "http://localhost:3002/Xat/Friend?mail=" + mail + "&session=" + session, true);
        http.send();
    }



//XAT X

function rebreMissatge() {
    var mail = sessionStorage.getItem('mail');
    var session = sessionStorage.getItem('session');
  
    var http = new XMLHttpRequest();
  
    http.open("GET", "http://localhost:3002/Xat/Xat1?mail=" + mail + "&session=" + session, true);

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
          var response = JSON.parse(http.responseText);
          var emisor = response.emisor;
          var text = response.text;
          console.log('Emisor: ' + emisor);
          console.log('Texto: ' + text);
          var conversation = document.getElementById("missatges");
          var message = document.createElement("p");
          message.textContent = emisor + ": " + text;
          conversation.appendChild(message);
        }
      };

    http.send();
  }
  
  function enviarMissatge() {
    var mail = sessionStorage.getItem('mail');
    var session = sessionStorage.getItem('session');
    var receptor = document.getElementById("receptor").value;
    var sms = document.getElementById("sms").value;
  
    var http = new XMLHttpRequest();

    http.open("POST", "http://localhost:3002/Xat/Xat1?mail=" + mail + "&session=" + session + "&receptor=" + receptor + "&sms=" + sms, true);
  
    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200) {
        // Actualizar la conversación en el chat
        var conversation = document.getElementById("missatges");
        var message = document.createElement("p");
        message.textContent = "Tu : " + sms;
        conversation.appendChild(message);
  
        // Limpiar el campo de texto
        document.getElementById("sms").value = "";
        rebreMissatge();
      }
    };
  
    http.send();
  }
  


//MENU X

function logOut() {
    sessionStorage.removeItem("mail");
    sessionStorage.removeItem("session");
    window.location.href = "login.html";
}

function goRegistro(){
    window.location.href = "registre.html";
}

function goFriend(){
    window.location.href = "friend.html";
}

function goXat(){
    window.location.href = "xat.html";
}