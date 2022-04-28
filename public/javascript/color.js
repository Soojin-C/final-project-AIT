function main(){
    const color = document.querySelector("#colors");
    const font = document.querySelector("#fonts");
    const form = document.querySelector("#wrapper"); 
    const fontInputs = document.getElementsByClassName("fontChange");
    async function onChangeColor(){
        //console.log(form.className.match(/\bc-.+?\b/));
        if(form.className.match(/\bc-.+?\b/)){
            form.className = form.className.replace(/\bc-.+?\b/, this.value);
        }
        else{
            form.classList.add(this.value);
        }
    }
    async function onChangeFont(){
        let count = fontInputs.length;
        while(count !== 0){
            count--;
            const item = fontInputs[count];
            if(item.className.match(/\bf-.+?\b/)){
                item.className = item.className.replace(/\bf-.+?\b/, this.value);
            }
            else{
                item.classList.add(this.value);
            }
        }
    }
    color.addEventListener("change", onChangeColor);
    font.addEventListener("change", onChangeFont);
}
document.addEventListener('DOMContentLoaded', main);