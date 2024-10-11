import { error } from "happy-dom/lib/PropertySymbol.js";

// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  const detailImg = document.querySelector("#ramen-detail > .detail-image");
  const detailName = document.querySelector("#ramen-detail > .name");
  const detailRestaurant = document.querySelector(
    "#ramen-detail > .restaurant"
  );
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  detailImg.src = ramen.image;
  detailImg.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailsRating.textContent = ramen.rating;
  detailsComment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  // Add code

  const form = document.getElementById("new-ramen");
  const input = document.getElementById("submit-button");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newRamen = {
      name: document.getElementById("new-name").value,
      restaurant: document.getElementById("new-restaurant").value,
      image: document.getElementById("new-image").value,
      rating: document.getElementById("new-rating").value,
      comment: document.getElementById("new-comment").value,
    };

    addRamenToMenu(newRamen);

    form.reset();
  });

  function addRamenToMenu(ramen) {
    const ramenMenuDiv = document.getElementById("ramen-menu");
    const img = document.createElement("img");
    img.src = ramen.image;
    img.alt = ramen.name;

    img.addEventListener("click", () => {
      handleClick(ramen);
    });

    ramenMenuDiv.appendChild(img);
  }
};

const displayRamens = () => {
  // Add code
  fetch("http://localhost:3000/ramens")
    .then((response) => {
      if (!response.ok) {
        throw new Error("error");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      const ramenMenu = document.getElementById("ramen-menu");
      data.forEach((ramen) => {
        const img = document.createElement("img");
        img.src = ramen.image;

        ramenMenu.appendChild(img);
      });
    })
    .catch((error) => console.error("Something is wrong", error));
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

document.addEventListener("DOMContentLoaded", main);

// Export functions for testing
export { displayRamens, addSubmitListener, handleClick, main };
