function main(){
    let count = 0;
    const addbtn = document.querySelector("#addItem");
    const list = document.querySelector("#items");
    const host = "http://localhost:3000";

    async function onAdd(evt){
        evt.preventDefault();
        const input = document.querySelector("#inputItem");
        if (input.value !== ""){
            const mainWrap = document.createElement("div");
            mainWrap.setAttribute("class", "d-flex flex-row");

            const id = document.createElement("input");
            id.setAttribute("class", "form-control-plaintext");
            id.setAttribute("name", "linkIDSaved");
            id.setAttribute("type", 'text');
            id.setAttribute("hidden", 'true');
            id.value="";
            mainWrap.appendChild(id);

            const newItem = document.createElement("input");
            newItem.setAttribute("type", 'text');
            newItem.setAttribute("id", `item`);
            newItem.setAttribute("name", "items");
            newItem.value = input.value;

            mainWrap.appendChild(newItem);

            const delbtn = document.createElement("button");
            delbtn.setAttribute("class", `del del${count} btn btn-danger`);
            delbtn.setAttribute("id", `del${count}`);

            let text = document.createTextNode("Delete");
            delbtn.appendChild(text);
            mainWrap.appendChild(delbtn);
            
            list.appendChild(mainWrap);

            input.value = "";

            const linkbtn = document.createElement("a");
            linkbtn.setAttribute("class", "btn btn-primary linker-btn");
            linkbtn.setAttribute("id", `linker${count}`);
            linkbtn.setAttribute("data-bs-toggle", "modal");
            linkbtn.setAttribute("data-bs-target", "#exampleModal");

            text = document.createTextNode("Add Link");
            linkbtn.appendChild(text);
            mainWrap.appendChild(linkbtn);

            const link = document.createElement("input");
            link.setAttribute("class", "form-control-plaintext");
            link.setAttribute("id", `noteLink${count}`);
            link.setAttribute("name", "linker");
            link.setAttribute("type", "text");
            link.setAttribute("hidden", true);
            link.value = "";

            mainWrap.appendChild(link);

            count++;

            const d = document.getElementById(`del${count-1}`);
            d.addEventListener("click", (e)=>{
                e.preventDefault();
                e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            });

            const l = document.getElementById(`linker${count-1}`);
            l.addEventListener("click", ()=>{
                async function onLink(evt){
                    async function openCanvas(){
                        const canvas = document.querySelector("#canvasNote");
                        const noteid = evt.target.id;
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

                    evt.preventDefault();
                    console.log(evt.target.text);
                    link.value = evt.target.id;

                    mainWrap.appendChild(link);
                    mainWrap.removeChild(l);

                    const label = document.createElement("a");
                    label.setAttribute("class", "btn link");
                    label.setAttribute("data-bs-toggle", "offcanvas");
                    label.setAttribute("href", "#canvasNote");
                    label.setAttribute("role", "button");
                    label.setAttribute("aria-controls", "canvasNote");
                    const icon = document.createElement("i");
                    icon.setAttribute("class", "bi bi-link");
                    label.appendChild(icon);
                    const t = document.createTextNode(evt.target.text);
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
    }
    addbtn.addEventListener("click", onAdd);
}

document.addEventListener('DOMContentLoaded', main);