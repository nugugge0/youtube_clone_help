// 네비게이션
// const showMenu = (headerToggle,navbarID) =>{
//   const toggleBtn = document.getElementById(headerToggle);

//   if (headerToggle && navbarID) {
//     toggleBtn.addEventListener('click',() => {
//       nav.classList.toggle('show-menu')
//       toggleBtn.classList.toggle('x-times')
//     })
//   }
// }
// showMenu('header-toggle', 'navbar')

// const linkcolor = document.querySelectorAll('.nav_link');

// function colorLink() {
//   linkcolor.forEach((1, => 1.classList.remove('active'))
//   this.classList.add('active')
// }
//

function searchYoutube() {
    const searchData = document.getElementById('search').value; // x에는 검색어 입력/input ID
    const apiUrl = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${searchData}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displaySearchResults(data);
        saveSearchHistory(searchData);
      })
      .catch(error => console.error('API 요청 실패:', error));
  }
  
  function displaySearchResults(data) {
    const searchResultsDiv = document.getElementById('searchResults'); // searchResult를 가져와서 저장
    searchResultsDiv.innerHTML = ''; 
  
  if (data.items.length === 0) {
    searchResultsDiv.innerHTML = '<p>검색 결과가 없습니다.</p>';
    return;
  }

//   오르미 api 에서 해당값들을 입력받아 작동하게 만들어야 되는데 방법을 잘 모르겠어요

  data.items.forEach(item => {
    const videoId = 
    const videoTitle = 
    const videoThumbnail = 
    const videoLink = 