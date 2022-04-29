function main(){
    //const host = "http://localhost:3000";
    const host = "https://serene-cliffs-35929.herokuapp.com";
    const allNotes = document.getElementsByClassName("list-group-item");
    //console.log(allNotes);
    let count = allNotes.length;
    async function addNote(e){
        e.preventDefault();
        const folderId = document.querySelector("h2").id;
        const noteId = e.target.id;
        const config = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({noteid: noteId})
        };
        const url = `${host}/api/saveNoteTo/${folderId}`;
        await fetch(url, config);
        location.replace(`/folders/${folderId}`);
    }
    while (count !== 0){
        count--;
        allNotes[count].addEventListener("click", addNote);
    }
}
document.addEventListener('DOMContentLoaded', main);