
fetch('/api/current', {
    method: "GET",
    headers: {
    },
})
    .then((response) => {
        if (response.status === 401) {
            window.location.replace('/login');
        } else {
            return response.json();
        }
    })
    .then((json) => {
        const paragraph = document.getElementById("result");
        paragraph.innerHTML = `Usuario autenticado -->  Id: ${json.user._id} Nombre:${json.user.name}  Mail: ${json.user.email}  `;
 
    });


