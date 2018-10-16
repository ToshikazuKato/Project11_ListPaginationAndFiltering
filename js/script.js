/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//------------------------------ Define variables ------------------------------
  //the number of students you want to display at a time
  const limitNum = 10;
  //the collection of students object
  const students = document.getElementsByClassName('student-item');

//------------------------------ Define all functions ------------------------------

//Display 10 students in the list depending on pagination and hide the rest of students
const displayStudents = (startAt, endAt) => {
  //Convert collection of object into array and hide all students
  const stuArr = Object.keys(students).map(val => students[val]);
  stuArr.map(obj=>{
    return obj.style.display = 'none';
  });
  //Display only 10 students depending on paginations
  const displayStu = stuArr.slice(startAt,endAt);
  displayStu.map(obj => {
    return obj.style.display = 'block';
  });
}

//Calculate the number of necessary pagination from students list length
//and create li elements for pagination
const generatePaginationHTML = (limit) => {
  //calculate page num
  const pageNum = (students.length%limit === 0 ? (students.length/limit) : Math.floor(students.length/limit)+1);
  //Create <div class="pagination"></div>
  const pageDiv = document.createElement('div');
  pageDiv.className = 'pagination';
  //Create <ul></ul>
  const ul = document.createElement('ul');
  //Create <li> <a href="#"> 1 </a> </li> and append it to the right place
  let li = "";
  for (let i = 1; i < pageNum+1 ; i++) {
     li += `
            <li>
              <a href="#">${i}</a>
            </li>
           `;
  }
  ul.innerHTML = li;
  pageDiv.appendChild(ul);
  const page = document.getElementsByClassName('page')[0];
  const studentUl = document.getElementsByClassName('student-list')[0];
  page.insertBefore(pageDiv,studentUl.nextSibling);
  //Add 'active' class to the first asynchronous
  document.querySelector("a").className = 'active';
}

//Toggle active class when it's clicked
const toggleActiveClass = (e) => {
  //Get an element having active class and remove it
  document.getElementsByClassName('active')[0].classList.remove('active');
  //Add active class to the element that's clicked
  e.target.className = 'active';
}

//Change displayed students when page changes
//Parameter => the number of page passed from click event
const managedisplayedStudents = (num) => {
  //For the second argument used in slice method to extract 10 students from lists
  const endAt = num*limitNum;
  //For the first argument in slice method
  const startAt = endAt - limitNum;
  displayStudents(startAt, endAt);
}

// Click event for pagination buttons
const clickEventForPagination = () => {
  //Select all asynchronous
  const pageLinks = document.querySelectorAll('a');
  Array.from(pageLinks).forEach(eachLink => {
    eachLink.addEventListener('click',(e)=>{
      e.preventDefault();
      console.log(e);
      toggleActiveClass(e);
      // Get the number of clicked pagination
      const pagination = e.target.innerHTML;
      managedisplayedStudents(pagination);
    });//eachLink
  })
}//clickEventForPagination

//Generate search input
const generateSearchHTML = () => {
  //Create <div class="student-search"></div>
  const searchDiv = document.createElement('div');
  searchDiv.className = 'student-search';
  //Create <input placeholder="Search for students...">
  const input = document.createElement('input');
  input.placeholder = "Search for students...";
  //Create <button>Search</button>
  const btn = document.createElement('button');
  btn.innerHTML = "Search";
  // <div class="student-search">
  //   <input placeholder="Search for students...">
  //   <button>Search</button>
  // </div>
  searchDiv.appendChild(input);
  searchDiv.insertBefore(btn, input.nextSibling);

  //Append searchDiv after <h2>Students</h2> that has <div class="page-header cf"> as its parents
  const pageHeader = document.getElementsByClassName('page-header')[0];
  const h2 = document.querySelector('.page-header h2');
  pageHeader.insertBefore(searchDiv, h2.nextSibling);

}

//Search function, display the specific students as the user types
const searchFunction = () => {
  
}

//Init function to display necessary information
const init = () => {
  generateSearchHTML();
  displayStudents(0,limitNum);
  generatePaginationHTML(limitNum);
  clickEventForPagination();
}


//------------------------------ Call function ------------------------------
init();
