console.log("File loaded");
fetch("http://localhost:3000/weather?address=!").then(response => {
    console.log(response)
    response.json().then(data => {
        console.log(data);
    })
})