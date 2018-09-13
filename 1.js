const getAllBtn = document.querySelector(".js-get");
const result = document.querySelector(".result");
const input = document.querySelector(".js-input-get-id");
const getIdBtn = document.querySelector(".js-get-id");
const getPost = document.querySelector(".js-post");
const postName = document.querySelector(".js-input-post-name");
const postAge = document.querySelector(".js-input-post-age");
const inputRemoveId = document.querySelector(".js-input-remove-id");
const removeId = document.querySelector(".js-remove-id");
const inputUpdateId = document.querySelector(".js-input-update-id");
const inputUpdateName = document.querySelector(".js-input-update-name");
const inputUpdateAge = document.querySelector(".js-input-update-age");
const updateBtn = document.querySelector(".js-update");

getAllBtn.addEventListener("click", getAllUsers);

function getAllUsers(evt) {
  evt.preventDefault();
  fetch(`https://test-users-api.herokuapp.com/users/`)
    .then(response => {
      if (response.ok) {
        result.innerHTML = "";
        return response.json();
      }
      throw new Error("Error" + response.statusText);
    })
    .then(data => data.data)
    .then(data =>
      data.forEach(num => {
        result.innerHTML += `
    <tr scope="row">
      <td>${num.id}</td>
      <td>${num.name}</td>
      <td>${num.age}</td>
    </tr> 
    
`;
      })
    )
    .catch(error => console.log(error));
}

getIdBtn.addEventListener("click", getUserById);

function getUserById(id) {
  id.preventDefault();
  let value = input.value;
  //   console.log(value);
  fetch(`https://test-users-api.herokuapp.com/users/`)
    .then(response => {
      if (response.ok) {
        result.innerHTML = "";
        return response.json();
      }
      throw new Error("Error" + response.statusText);
    })
    .then(data => data.data)
    .then(data =>
      data.find(id => {
        // console.log(id.id);
        if (input.value === id.id) {
          result.innerHTML += `
    <tr scope="row">
      <td>${id.id}</td>
      <td>${id.name}</td>
      <td>${id.age}</td>
    </tr> 
    
`;
        }
      })
    )
    .catch(error => console.log(error));
    
}

getPost.addEventListener("click", addUser);

function addUser(evt) {
  evt.preventDefault();
  const postNewName = postName.value;
  const postNewAge = postAge.value;
  // console.log(postNewName);
  // console.log(postNewAge);
  fetch(`https://test-users-api.herokuapp.com/users/`, {
    method: "Post",
    body: JSON.stringify({ name: postNewName, age: postNewAge }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error" + response.statusText);
    })
    .then(data => console.log(data.data))
    .catch(error => console.log("ERROR" + error));
    postName.value = '';
    postAge.value = '';
    
}

removeId.addEventListener("click", removeUser);

function removeUser(id) {
  id.preventDefault();
  const removeUserById = inputRemoveId.value;
  console.log(removeUserById);
  fetch(`https://test-users-api.herokuapp.com/users/${removeUserById}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error" + response.statusText);
    })
    .then(data => console.log(`UserId: ${removeUserById} is deleted`))
    .catch(error => console.log("ERROR" + error));
    inputRemoveId.value = '';
    
}


updateBtn.addEventListener("click", updateUser);

function updateUser (evt) {
    evt.preventDefault()
    const updateId = inputUpdateId.value;
    const updateName = inputUpdateName.value;
    const updateAge = inputUpdateAge.value;
    console.log(updateId);
    console.log(updateName);
    console.log(updateAge);
    fetch(`https://test-users-api.herokuapp.com/users/${updateId}`, {
        method: "PUT",
        body: JSON.stringify({ name: updateName, age: updateAge }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Error" + response.statusText);
        })
        .then(data => console.log(data.data))
        .catch(error => console.log("ERROR" + error));
    inputUpdateId.value = '';
    inputUpdateName.value = '';
    inputUpdateAge.value = '';
}