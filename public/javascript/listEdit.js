function main(){
    const all = document.getElementsByClassName("del");
    console.log(all);
    let count = all.length;
    while (count !== 0){
        count--;
        all[count].addEventListener("click", (e)=>{
            e.preventDefault();
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        });
    }
}

document.addEventListener('DOMContentLoaded', main);