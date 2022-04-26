function main(){
    let count = 0;
    function cleanText(data, max){
        count = data.length;
        while (count !== 0){
            count--;
            const e = data[count];
            let text = e.childNodes[0];
            if (text){
                text = e.childNodes[0].nodeValue;
                if (text.length > max) {
                    text = text.slice(0,max) + ' ...';
                }
                console.log(text);
                const newText = document.createTextNode(text);
                e.removeChild(e.childNodes[0]);
                e.appendChild(newText);
            }
        }
    }
    const allHeadings = document.getElementsByClassName("titleRestrict");
    cleanText(allHeadings, 12);
    const allNames = document.getElementsByClassName("b-titleRestrict");
    cleanText(allNames, 18);
    const allText = document.getElementsByClassName("t-titleRestrict");
    cleanText(allText, 165);
    
}
document.addEventListener('DOMContentLoaded', main);