function main(){
    const color = document.querySelector("#colors");
    const font = document.querySelector("#fonts");
    const form = document.querySelector("#wrapper");
    form.setAttribute("class", "grey");
    async function onChangeColor(){
        console.log(this);
        form.setAttribute("class", this.value);
    }
    async function onChangeFont(){
        form.setAttribute("class", this.value);
    }
    color.addEventListener("change", onChangeColor);
    font.addEventListener("change", onChangeFont);
}
document.addEventListener('DOMContentLoaded', main);