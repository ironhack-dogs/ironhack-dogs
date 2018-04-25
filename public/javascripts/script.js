const dogAPI = new APIHandler("https://dog.ceo/api/breeds")

$(document).ready(() => {
  console.log("document loaded");
  dogAPI.getOneRegister()
  .then((data) => {
    console.log(data.message)
    const newDogPhoto = `<img src="${data.message}">Foto de perro</img>`
    $("#dog-container").append(newDogPhoto);
  })

});
