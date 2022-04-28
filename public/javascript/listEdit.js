function main(){
    const all = document.getElementsByClassName("del");
    const host = "http://localhost:3000";
    //console.log(all);
    let count = all.length;
    while (count !== 0){
        count--;
        all[count].addEventListener("click", (e)=>{
            e.preventDefault();
            e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
        });
    }
    const allLinker = document.getElementsByClassName("linker-btn");
    count = allLinker.length;
    while(count !== 0){
        count --;
        const l = allLinker[count];
        l.addEventListener("click", (e)=>{
            const mainWrap = e.target.parentNode;
            const link = mainWrap.getElementsByClassName("linkid")[0];
            
            async function onLink(evt){
                async function openCanvas(){
                    const canvas = document.querySelector("#canvasNote");
                    const noteid = evt.target.id;
                    const url = `${host}/api/${noteid}`;
                    let data = {};
                    try {
                        const res = await fetch(url);
                        data = await res.json();
                    }
                    catch(err){
                        console.log(err);
                    }
            
                    if(canvas.className.match(/\bf-.+?\b/)){
                        canvas.className = canvas.className.replace(/\bf-.+?\b/, data.font);
                    }
                    else{
                        canvas.classList.add(data.font);
                    }
            
                    const title = canvas.querySelector("#offcanvasRightLabel");
                    while (title.firstChild) {
                        title.removeChild(title.firstChild);
                    }
                    let text = document.createTextNode(data.title);
                    title.appendChild(text);
            
                    const body = canvas.querySelector(".offcanvas-body");
                    while (body.firstChild) {
                        body.removeChild(body.firstChild);
                    }
                    text = document.createTextNode(data.text);
                    body.appendChild(text);
                } 
                evt.preventDefault();
                console.log(evt.target.text);
                link.value = evt.target.id;

                mainWrap.appendChild(link);
                mainWrap.removeChild(l);

                const label = document.createElement("a");
                label.setAttribute("class", "col-4 btn link");
                label.setAttribute("data-bs-toggle", "offcanvas");
                label.setAttribute("href", "#canvasNote");
                label.setAttribute("role", "button");
                label.setAttribute("aria-controls", "canvasNote");
                const icon = document.createElement("i");
                icon.setAttribute("class", "bi bi-link");
                label.appendChild(icon);
                let text = evt.target.text;
                if (text.length > 12) {
                    text = text.slice(0,12) + ' ...';
                }
                const t = document.createTextNode(text);
                label.appendChild(t);

                label.addEventListener("click", openCanvas);
                mainWrap.appendChild(label);

                //remove unused handlers:
                const linker = document.getElementsByClassName("list-group-item");
                let count = linker.length;
                while (count !== 0){
                    count--;
                    linker[count].removeEventListener("click", onLink);
                }
            }
            const linker = document.getElementsByClassName("list-group-item");
            //console.log(linker);
            let count = linker.length;
            while (count !== 0){
                count--;
                linker[count].addEventListener("click", onLink);
            }
        }, { once: true });
    }

    async function openCanvas(e){
        const canvas = document.querySelector("#canvasNote");
        const parent = e.target.parentNode.parentNode;
        console.log(e.target.parentNode.parentNode);
        const noteid = parent.querySelector(".linkid").value;
        const url = `${host}/api/${noteid}`;
        let data = {};
        //console.log(url);
        try { 
            const res = await fetch(url);
            data = await res.json();
        }
        catch(err){
            console.log(err);
        }

        if(canvas.className.match(/\bf-.+?\b/)){
            canvas.className = canvas.className.replace(/\bf-.+?\b/, data.font);
        }
        else{
            canvas.classList.add(data.font);
        }

        const title = canvas.querySelector("#offcanvasRightLabel");
        while (title.firstChild) {
            title.removeChild(title.firstChild);
        }
        let text = document.createTextNode(data.title);
        title.appendChild(text);

        const body = canvas.querySelector(".offcanvas-body");
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
        text = document.createTextNode(data.text);
        body.appendChild(text);
    } 

    const links = document.getElementsByClassName("link");
    count = links.length;
    while(count !== 0){
        count --;
        const curr = links[count];
        curr.addEventListener("click", openCanvas);
    }

    const fonts = document.getElementsByClassName("mx-3");
    const font = document.querySelector("#inputTitle").className.match(/\bf-.+?\b/);
    count = fonts.length;
    while(count !== 0){
        count --;
        const item = fonts[count];
        if(item.className.match(/\bf-.+?\b/)){
            item.className = item.className.replace(/\bf-.+?\b/, font);
        }
        else{
            item.classList.add(this.value);
        }
    }


}

document.addEventListener('DOMContentLoaded', main);