import {fetchData} from '../lib/fetchData.js';

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';
const taulukko = document.querySelector('#target');
const modal = document.querySelector('#modal');
let restaurants = [];

//html functiot
function createRestaurantCells(restaurant, tr) {
  //nimi solu
  const nameTd = document.createElement('td');
  nameTd.innerText = restaurant.name;
  //osoitesolu
  const addressTd = document.createElement('td');
  addressTd.innerText = restaurant.address;
  //kaupunki soluh
  const cityTd = document.createElement('td');
  cityTd.innerText = restaurant.city;
  tr.append(nameTd, addressTd, cityTd);
}

function createModalHtml(restaurant, modal) {
  const nameP = document.createElement('h3');
  nameP.innerText = restaurant.name;
  const addressP = document.createElement('p');
  (addressP.innerText = restaurant.address), restaurant.phone;

  modal.append(nameP, addressP);
}

function createMenuHtml(courses) {
  let html = '';
  for (const course of courses) {
    html += `
  <article class = "course">
  <p><strong>${course.name}</strong></p>,
  Hinta: ${course.price},
  Ruokavaliot: ${course.diets}</p>
  </article>
  `;
  }
  return html;
}

//hakee daily menun
async function getDailyMenu(id, lang) {
  try{
  return await fetchData(apiUrl + '/restaurants/daily/' + id + '/' + lang);
}catch (error) {
  console.error('An error occurred:', error);
}
}

async function getRestaurants() {
  try {
    restaurants = await fetchData(apiUrl + '/restaurants');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

function sortRestaurants() {
  restaurants.sort(function (a, b) {
    return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
  });
}

function createTable() {
  for (const restaurant of restaurants) {
    //rivi
    const tr = document.createElement('tr');
    tr.addEventListener('click', async function () {
      try{
      for (const elem of document.querySelectorAll('.highlight')) {
        elem.classList.remove('highlight');
      }
      tr.classList.add('highlight');

      const courseResponse = await getDailyMenu(restaurant._id, 'fi');

      const menuHtml = createMenuHtml(courseResponse.courses);

      await getDailyMenu(restaurant._id, 'fi');

      modal.innerHTML = '';
      modal.showModal();
      createModalHtml(restaurant, modal);
      modal.insertAdjacentHTML('beforeend', menuHtml);
    } catch (error) {
      console.error('An error occurred:', error);
    }
    });

    //lisätään solut riviin
    createRestaurantCells(restaurant, tr);
    taulukko.append(tr);
  }
}
async function main() {
  try{
    await getRestaurants();
  sortRestaurants();
  createTable();
  }catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
