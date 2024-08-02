window.onload = function () {
    document.querySelector(".menu_mobile").addEventListener("click", function () {

        const elementUl = document.querySelector(".menu nav ul") as HTMLElement;
        
        if (elementUl.style.display == "flex") {
            elementUl.style.display = "none";
        } else {
            elementUl.style.display = "flex";
        }
    });


    //marcar a pagina atual
    const url = new URL(window.location.href);
    const path = url.pathname;
    const menu = document.querySelectorAll(".menu nav ul li a");
    menu.forEach(function (item) {

        console.log(item.getAttribute("href"), path);
    
        if (item.getAttribute("href") == path) {
            item.classList.add("active");
        }
    });

};