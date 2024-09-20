let allMusic = [
  {
    name: "Harley Bird - Home",
    artist: "Jordan Schor",
    img: "./images/music-1.jpg",
    src: "./songs/music-1.mp3",
  },
  {
    name: "Ikson Anywhere – Ikson",
    artist: "Audio Library",
    img: "./images/music-2.jpg",
    src: "./songs/music-2.mp3",
  },
  {
    name: "Beauz & Jvna - Crazy",
    artist: "Beauz & Jvna",
    img: "./images/music-3.jpg",
    src: "./songs/music-3.mp3",
  },
  {
    name: "Hardwind - Want Me",
    artist: "Mike Archangelo",
    img: "./images/music-4.jpg",
    src: "./songs/music-4.mp3",
  },
  {
    name: "Jim - Sun Goes Down",
    artist: "Jim Yosef x Roy",
    img: "./images/music-5.jpg",
    src: "./songs/music-5.mp3",
  },
  {
    name: "Lost Sky - Vision NCS",
    artist: "NCS Release",
    img: "./images/music-6.jpg",
    src: "./songs/music-6.mp3",
  },
];
let choices=["repeat","repeat_one","shuffle"];
let current_choice=0;
let choice_btn=document.getElementById("repeat-plist");
let index=Math.floor(Math.random()*allMusic.length);
const btn_list = document.getElementById("more-music");
let list = document.querySelector(".list");
let close_btn = document.getElementById("close");
let music_container = document.querySelector(".container");
let audio = document.getElementById("audio");
let current_time = document.querySelector(".timer .current");
let duration = document.querySelector(".timer .duration");
let play_btn = document.querySelector(".play-pause");
let next_btn=document.getElementById('next');
let prev_btn=document.getElementById('prev');
let progressbar=document.querySelector(".progress-bar")
btn_list.addEventListener("click", () => {
  list.classList.toggle("show");
});
close_btn.addEventListener("click", () => {
  list.classList.toggle("show");
});
function render_list() {
  music_container.innerHTML = allMusic
    .map(
      (item, idx) => ` <div onclick="change_song(null,${idx})" class="music flex ${
        idx == index ? "active" : ""
      }"><div class="detail">
             <audio onloadeddata="render_duration(this)" id="audio" src=${
               item.src
             }></audio>
              <h4 class="name-song">${item.name}</h4>
              <p class="artist">${item.artist}</p>
            </div>
            <span class="duration">3:20</span>
          </div>`
    )
    .join("");
}
function render_song() {
  document.querySelector(".image img").src = allMusic[index].img;
  document.querySelector(".title h2").innerText = allMusic[index].name;
  document.querySelector(".title p").innerText = allMusic[index].artist;
  audio.src = allMusic[index].src;
}
function render_duration(obj) {
  obj.parentNode.nextElementSibling.innerText = converter(obj.duration);
}
render_list();
render_song();
function converter(seconds) {
  let minute = Math.floor(seconds / 60);
  let second = Math.floor(seconds % 60);

  return minute + ":" + second.toString().padStart(2, "0");
}
audio.addEventListener("loadeddata", (e) => {
  duration.innerText = converter(e.target.duration);
});
let is_playing = false;
function play() {
  is_playing=true;
  play_btn.innerHTML = '<span class="material-icons play">pause</span>';
  audio.play();
}
function pause() {
    is_playing = false;
    play_btn.innerHTML = '<span class="material-icons play">play_arrow</span>';
    audio.pause();
}
play_btn.addEventListener("click", () => {
  if (is_playing) {
    pause()
  } else {
    play()
  }
});
audio.addEventListener("timeupdate", (e) => {
  current_time.innerText = converter(e.target.currentTime);
  progressbar.style.width=e.target.currentTime/e.target.duration*100+"%";
});
audio.addEventListener("ended",()=>{
     switch (choices[current_choice]) {
      case "repeat_one":
        audio.currentTime=0;
        play();
        break;
        case "repeat":
        change_song("next")
        break;
        case "shuffle":
        let newsong_index;
        do {
         newsong_index=Math.floor(Math.random()*allMusic.length);
        } while (newsong_index==index);
        index=newsong_index;
        render_list();
        render_song();
        play();
        break;
      default:
        break;
     }
})
next_btn.addEventListener('click',()=>change_song("next"))
prev_btn.addEventListener('click',()=>change_song("prev"))
progressbar.parentElement.addEventListener('click',(e)=>{
    let width=progressbar.parentElement.clientWidth;
    let distance=e.offsetX;
    console.log(width,distance);
     audio.currentTime=distance/width*audio.duration;
})
function change_song(type,idx) {
   if (type=="next") {
     index= index+1>=allMusic.length ? 0 : index+1;
   } else {
     index=index-1<0 ? allMusic.length-1 : index-1;
   }
   if (idx) index=idx;
   render_song();
   render_list();
   play();
}
choice_btn.addEventListener('click',()=>{
  current_choice= current_choice+1>=choices.length ? 0 : current_choice+1;
  choice_btn.innerHTML=choices[current_choice];
})