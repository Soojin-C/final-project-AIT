function main(){
    let count = 0;
    const addbtn = document.querySelector("#addItem");
    const list = document.querySelector("#items");
    addbtn.addEventListener("click", (evt)=>{
        evt.preventDefault();
        const input = document.querySelector("#inputItem");
        if (input.value !== ""){
            const mainWrap = document.createElement("div");
        mainWrap.setAttribute("class", "d-flex flex-row");

        //let wrapper = document.createElement("div");
        //wrapper.setAttribute("class", "col-auto");

        const newItem = document.createElement("input");
        newItem.setAttribute("type", 'text');
        newItem.setAttribute("id", `item`);
        newItem.setAttribute("name", "items");
        newItem.value = input.value;

        //wrapper.appendChild(newItem);
        mainWrap.appendChild(newItem);

        const delbtn = document.createElement("button");
        delbtn.setAttribute("class", `del del${count} btn btn-danger`);
        delbtn.setAttribute("id", `del${count}`);
        count++;

        const text = document.createTextNode("Delete");
        delbtn.appendChild(text);
        //wrapper = document.createElement("div");
        //wrapper.setAttribute("class", "col-auto");
        //wrapper.appendChild(delbtn);
        mainWrap.appendChild(delbtn);
        
        list.appendChild(mainWrap);

        input.value = "";

        const d = document.getElementById(`del${count-1}`);
        d.addEventListener("click", (e)=>{
            e.preventDefault();
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        });
        }
    });
}

document.addEventListener('DOMContentLoaded', main);