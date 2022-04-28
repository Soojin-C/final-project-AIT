function main(){
    const done = document.querySelector("#doneEdit");
    const start = document.querySelector("#startDel");
    const btns = document.getElementsByClassName("deleteThisItem");
    const info = document.querySelector("#delInfo");
    async function onDone (e){
        e.target.style.display = "none";
        start.style.display = "inline";
        let count = btns.length;
        while(count !== 0){
            count --;
            const each = btns[count];
            each.style.visibility = "hidden";
        }
        info.removeChild(info.firstChild);
    }
    async function onStart(e){
        e.target.style.display = "none";
        done.style.display = "inline";
        let count = btns.length;
        while(count !== 0){
            count --;
            const each = btns[count];
            //console.log(each.style);
            each.style.visibility = "visible";
        }
        const infoText = document.createTextNode("You can delete any of the following. Click the done button when done.");
        info.appendChild(infoText);
    }
    done.addEventListener("click", onDone);
    start.addEventListener("click", onStart);
}

document.addEventListener('DOMContentLoaded', main);