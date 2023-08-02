let sidebarHidden = false; //처음엔 숨겨져 있는 상태가 아님
let navbarLonger = false; //처음엔 네비바 길이 기존 상태
let ThumbnailWider = false;
const allowedLinkNames = ["Home", "Explore", "Subscriptions", "Library", "History", "Your Videos", "watch Later"];
function toggleSidebar() {
    const sidebarLinks = document.querySelectorAll('.sidebar> div > div');
    sidebarHidden = !sidebarHidden;//버튼 눌러서 숨김으로 반전
    const sidebar = document.querySelector('.sidebar');
    const navbar = document.querySelector('.navigation');
    const thmbox = document.querySelector('.Thumbnail');
    if (sidebarHidden) {
        sidebar.classList.add('sidebarHidden');
        navbar.classList.add('navbarLonger');
        thmbox.classList.add('ThumbnailWider');
    } else {
        sidebar.classList.remove('sidebarHidden');
        navbar.classList.remove('navbarLonger');
        thmbox.classList.remove('ThumbnailWider');
    }


    sidebarLinks.forEach((link) => {
        const linkname = link.querySelector('a').textContent.trim();

        if (allowedLinkNames.includes(linkname)) { //무조건 보일 요소들 집합에 linkname이 있으면 block
            link.style.display = 'block';
        }
        else if (sidebarHidden) {// sidebar 상태가 숨겨져 있는걸로 설정 되어있으면 none
            link.style.display = 'none';
        }
        else {//sidebar 상태가 보이는 걸로 설정 되어있으면 block
            link.style.display = 'block';
        }
    });

}