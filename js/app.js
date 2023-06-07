const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container');
//previous search result ta ke clear kore , new ta first e show korar jonno
    phoneContainer.textContent = '';
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    
    if(dataLimit && phones.length > 10){
    phones = phones.slice(0,10);
         showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    //display no phones found
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    
    // display all phones

    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
                    <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone.phone_name}</h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <button onclick = "loadPhonesDetails('${phone.slug}') " class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                         </div>
                    </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    // stop spinner or loader
    toggleSpinner(false);

}

const processSearch = (dataLimit) =>{
      // start loader
      toggleSpinner(true);

      const searchField = document.getElementById('search-field');
      const searchText = searchField.value;
      loadPhones(searchText,dataLimit);
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    // toggleSpinner(true);

    // const searchField = document.getElementById('search-field');
    // const searchText = searchField.value;
    // loadPhones(searchText);
    processSearch(10);
})
// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress',function(e) {
    if(e.key === 'Enter'){
        //code f0r enter
        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

// not the best way to show all
document.getElementById('btn-show-all').addEventListener('click', function(){
      processSearch();
})

const loadPhonesDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPHoneDetails (data.data);
}
const displayPHoneDetails = phone =>{
console.log(phone);
const modalTitle = document.getElementById('phoneDetailModalLabel');
modalTitle.innerText = phone.name;
const modalImage = document.getElementById('modalImage');
const modalImageTag = document.createElement('div');
modalImageTag.innerHTML = `
<img src="${phone.image}" alt="..." class= "">
<p> <b> Release Date: </b> ${phone.releaseDate ? phone.releaseDate: 'No Release Date Found'}</p>
<p> Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information Found'} </p> 
<p> Others: ${phone.others ? phone.others.Bluetooth: 'No Bluetooth Information'} </p> 
`
/// upor er p tag ta turnery operator maddhome kora hoise

modalImage.appendChild(modalImageTag);
//modalImage.innerText = phone.image;
}

loadPhones('apple');