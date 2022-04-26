function main(){
    const color = document.querySelector("#colors");
    const font = document.querySelector("#fonts");
    const form = document.querySelector("#wrapper");
    async function onChangeColor(){
        console.log(form.className.match(/\bc-.+?\b/));
        if(form.className.match(/\bc-.+?\b/)){
            form.className = form.className.replace(/\bc-.+?\b/, this.value);
        }
        else{
            form.classList.add(this.value);
        }
    }
    async function onChangeFont(){
        if(form.className.match(/\bf-.+?\b/)){
            form.className = form.className.replace(/\bf-.+?\b/, this.value);
        }
        else{
            form.classList.add(this.value);
        }
    }
    color.addEventListener("change", onChangeColor);
    font.addEventListener("change", onChangeFont);
}
document.addEventListener('DOMContentLoaded', main);