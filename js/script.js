/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//------------------------------ Define variables ------------------------------
  //the number of students you want to display at a time
  
  //The number of students you want to display at each page
  const limitNum = 10;
  //the collection of students object
  const stuObj = document.getElementsByClassName('student-item');
  //convert stuObj into array
  const students = Object.keys(stuObj).map(val => stuObj[val]);


//------------------------------ Define all functions ------------------------------

//Display 10 students in the list depending on pagination and hide the rest of students
const displayStudents = (startAt, endAt, stu) => {
  //hide all students
  students.map(obj=>{
    return obj.style.display = 'none';
  });
    //Display only 10 students depending on paginations
    const displayStu = stu.slice(startAt,endAt);
    displayStu.map(obj => {
      return obj.style.display = 'block';
    });

}

//Calculate the number of necessary pagination from students list length
//and create li elements for pagination
const generatePaginationHTML = (limit, stu) => {
  //calculate page num
  const pageNum = (stu.length%limit === 0 ? (stu.length/limit) : Math.floor(stu.length/limit)+1);
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
  const a = document.querySelector("a");
  if(a !== null){
    a.className = 'active';
  }

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
const managedisplayedStudents = (num, stu) => {
  //For the second argument used in slice method to extract 10 students from lists
  const endAt = num*limitNum;
  //For the first argument in slice method
  const startAt = endAt - limitNum;
  displayStudents(startAt, endAt, stu);
}

// Click event for pagination buttons
const clickEventForPagination = (stu) => {
  //Select all asynchronous
  const pageLinks = document.querySelectorAll('a');
  Array.from(pageLinks).forEach(eachLink => {
    eachLink.addEventListener('click',(e)=>{
      e.preventDefault();
      toggleActiveClass(e);
      // Get the number of clicked pagination
      const pagination = e.target.innerHTML;
      managedisplayedStudents(pagination,stu);
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

//Delete previous error
const delError = () => {
  const errorLi = document.querySelectorAll('.error');
  errorLi.forEach(ele => ele.remove());
}

//Display error message
const errMessage = () =>{

  delError();

  const li = document.createElement('li');
  li.className = 'student-item cf error';
  const div = document.createElement('div');
  div.className = 'student-details';
  const error = document.createElement('h3');
  error.innerHTML = "No match";
  div.appendChild(error);
  li.appendChild(div);
  document.getElementsByClassName('student-list')[0].appendChild(li);
}

//Search function, display the specific students as the user types
const searchFunction = () => {
  const input = document.querySelector('input');
  const studentsName = document.querySelectorAll('h3');
  // Creat an array for students name without space
  const studentNameArr = Object.keys(studentsName).map((val,index) => {
    return studentsName[index].innerHTML.toLowerCase().replace(/\s/g,"");
  });

  input.addEventListener('keyup',(e) => {
    e.preventDefault();
    delError();
    let newStuArr = [];
    const typing = input.value.toLowerCase();
    studentNameArr.forEach((val,index) => {
      if( val.indexOf(typing) > -1 ){
        newStuArr.push(students[index]);
      }
    });
    init(newStuArr);
    if(newStuArr.length === 0){
      errMessage();
    }

  });

}

//Init function to display necessary information and implement functions
const init = (arr) => {
  displayStudents(0,limitNum, arr);
  //Delete previous pagination
  document.querySelectorAll('.pagination').forEach(ele => ele.remove());
  generatePaginationHTML(limitNum,arr);
  clickEventForPagination(arr);
}


//------------------------------ Call function ------------------------------
generateSearchHTML();
searchFunction();
init(students);
