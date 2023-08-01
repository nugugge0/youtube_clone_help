// 검색기능 구현 (검색 시 메인페이지로 이동하여 검색)
document.getElementsByClassName("search_box_icon")[0].addEventListener("click", search); 

function search(event) {
    event.preventDefault(); // form action을 막기 위해
    
    let text = document.getElementsByClassName("search_box")[0].value;
    
    // 메인 페이지 URL
    let mainPageUrl = "http://127.0.0.1:5500/HTML/index_home.html";
    // 검색어를 쿼리 스트링으로 추가한 URL
    let newURL = mainPageUrl + '?search=' + encodeURIComponent(text);
    
    // 리다이렉트
    window.location.href = newURL;
}

window.addEventListener('DOMContentLoaded', (event) => {
    let urlParams = new URLSearchParams(window.location.search);
    let searchKeyword = urlParams.get('search');

    // 검색어가 있을 경우 검색 수행
    if (searchKeyword) {
        fetch("http://oreumi.appspot.com/video/getVideoList")
        .then((response) => response.json())
        .then((videoAll) => {
            search_video = videoAll;
            let search_video_with_info = [];

            // 각 비디오에 대해 추가 정보를 가져오는 Promise를 배열에 저장
            let promises = search_video.map(video => {
                return fetch(`http://oreumi.appspot.com/video/getVideoInfo?video_id=${video.video_id}`)
                        .then(response => response.json())
                        .then(videoInfo => {
                            search_video_with_info.push({...video, ...videoInfo});
                        });
            });

            // 모든 Promise가 완료될 때까지 기다림
            Promise.all(promises).then(() => {
                let value = search_video_with_info.filter((video) => video.video_title.includes(searchKeyword));
                let container = document.getElementById('videoContainer');

                // videoContainer의 기존 내용을 제거
                container.innerHTML = '';

                for (let video of value) {
                    let videoDiv = document.createElement('div');
                    videoDiv.innerHTML = `
                                    <article class="Thumbnail_art">
                                        <a href="${video.video_link}">
                                            <img class="Thumbnail_img" src='${video.image_link}' alt='Video Thumbnail'>
                                        </a>
                                        <h3 class="Thumbnail_h3">${video.video_title}</h3>
                                        <p>채널명: <a href="/HTML/index_channel.html?channel_name=${encodeURIComponent(video.video_channel)}">${video.video_channel}</a></p>
                                        <p>등록일: ${video.upload_date}, 조회수: ${video.views}회</p>
                                    </article>
                                        `;

                    container.appendChild(videoDiv);
                }
            });
        });
    }
});


// let videoAll = [];
// let search_video = [];

// fetch("http://oreumi.appspot.com/video/getVideoList")
//     .then((response) => response.json())
//     .then((data) => {
//         videoAll = data;
//         getVideo(videoAll);
//     });

// async function getVideo(videoList) {
//     for (let i = 0; i < videoList.length; i++) {
//         const data = await fetch(`http://oreumi.appspot.com/video/getVideoInfo?video_id=${videoList[i].video_id}`).then((response) => response.json());
//         search_video[i] = data
//     }
// }

// function search() {
//     let text = document.getElementsByClassName("search_box")[0].value;
//     let value = search_video.filter((video) => video.video_title.includes(text));
//     let container = document.getElementById('videoContainer');

//     // videoContainer의 기존 내용을 제거
//     container.innerHTML = '';

//     for (let video of value) {
//         let videoDiv = document.createElement('div');
//         videoDiv.innerHTML = `
//                             <article class="Thumbnail_art">
//                             <a href="${video.video_link}"><img class="Thumbnail_img" src='${video.image_link}' alt='Video Thumbnail'></a>
//                             <h3 class="Thumbnail_h3">${video.video_title}</h3>
//                             <p>채널명: <a href="index_channel.html?channel_name=${encodeURIComponent(video.video_channel)}">${video.video_channel}</a></p>
//                             <p>등록일: ${video.upload_date}, 조회수: ${video.views}회</p>
//                             </article>
//                             `;

//         container.appendChild(videoDiv);
//     }
//      // URL에 검색어를 쿼리 스트링으로 추가
//      let newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + '?search=' + encodeURIComponent(text);
//      window.history.pushState({path: newURL}, '', newURL);
// }

// document.getElementsByClassName("search_box_icon")[0].addEventListener("click", search); // 혹은 "click" 이벤트를 "input" 이벤트로 변경할 수 있습니다.





