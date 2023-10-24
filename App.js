fetch("https://randomuser.me/api/?results=5")
    .then((response) => {
        return response.json(); // Convert the response to JSON
    })
    .then((data) => {
        const users = data.results; // Access the array of users

        let tableData = "";

        users.forEach((user) => {
            tableData += `
                <tr>
                    <td>${user.name.first}</td>
                    <td>${user.location.city}</td>
                </tr>
            `;
        });

        // Update the table body with the generated data
        document.getElementById("table_body").innerHTML = tableData;
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

