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

function displayVideos(videoIds) {
    const container = document.getElementById('videoContainer'); 

    videoIds.forEach(videoId => {
        searchYoutube(videoId, container);
    });
}

function searchYoutube(searchData, container){
    const apiUrl = `https://oreumi.appspot.com/video/getVideoInfo?video_id=${searchData}`;

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState === XMLHttpRequest.DONE){
            if (xhr.status === 200){ 
                let data = JSON.parse(xhr.responseText)
                if (data.Response === 'False'){
                    alert('정보를 가져오는데 실패했습니다.')
                } else{
                    
                    // channel_name 담기
                    let channelName = data.video_channel;
                    let existingData = JSON.parse(localStorage.getItem(channelName) || '[]');
                    
                    let isExist = existingData.some(function(el) {
                      return el.video_title === data.video_title;
                    });

                    if (!isExist) {
                        existingData.push(data);
                        localStorage.setItem(channelName, JSON.stringify(existingData));
                    }
                    
                    // let videoDiv = '';
                    let videoDiv = document.createElement('div');
                    let date = formatDate(data.upload_date);
                    fetch(`http://oreumi.appspot.com/channel/getChannelInfo?video_channel=${channelName}`, {method: 'POST'})
                        .then((response) => response.json())
                        .then((channelData) => {
                            videoDiv.innerHTML = `
                            <article class="Thumbnail_art">
                                <a href="index_video.html?video_id=${searchData}">
                                    <img
                                        class="Thumbnail_img"
                                        src='${data.image_link}'
                                        alt='Video Thumbnail'
                                    >
                                </a>
                                <div>
                                    <a href="index_channel.html?channel_name=${encodeURIComponent(data.video_channel)}">
                                        <img 
                                            class="Thumbnail_profile_img"
                                            src="${channelData.channel_profile}"
                                            alt="Channel Avatar"
                                        >
                                    </a>
                                    <div>
                                        <h3>
                                            <a  class="Thumbnail_h3" href="index_video.html?video_id=${searchData}">
                                            ${data.video_title}
                                            </a>
                                        </h3>
                                        <a href="index_channel.html?channel_name=${encodeURIComponent(data.video_channel)}">
                                            ${data.video_channel}
                                        </a>
                                        <p>${date} • ${data.views} views.</p>
                                    </div>
                                </div>
                            </article>
                            `;
                            container.appendChild(videoDiv);
                        });
                    
                    // document.getElementById('InfoTitle').innerHTML = videoDiv
                }
            } else {
                alert('정보를 가져오는데 실패했습니다.');
            }
        }

    };
    xhr.open('GET', apiUrl, true); 
    xhr.send();
}

let videoIds = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]; // 여기에 비디오 id 작성해주시면 됩니다!
displayVideos(videoIds);

    


function formatDate(dateString) {
    const uploadDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - uploadDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    let formattedDate;

    if (diffDays < 7) {
        formattedDate = `${diffDays} days ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        formattedDate = `${weeks} weeks ago`;
    } else {
        const months = Math.floor(diffDays / 30);
        formattedDate = `${months} months ago`;
    }

    return formattedDate;
}

