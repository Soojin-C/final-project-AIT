function main(){
    const color = document.querySelector("#colors");
    const icon = document.querySelector("#folderIcon");
    async function onChangeColor(){
        //console.log(icon.className.match(/\bfc-.+?\b/));
        if(icon.className.match(/\bfc-.+?\b/)){
            icon.className = icon.className.replace(/\bfc-.+?\b/, this.value);
        }
        else{
            icon.classList.add(this.value);
        }
    }
    color.addEventListener("change", onChangeColor);
}
document.addEventListener('DOMContentLoaded', main);