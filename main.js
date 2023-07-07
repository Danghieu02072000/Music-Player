const nameSong = document.querySelector('.music__header-name');
const imgSong = document.querySelector('.music__cd-img');
const audio = document.querySelector('#audio');
const btnPlay = document.querySelector('.btn-play');
const progress = document.querySelector('.progress');
const cdImg = document.querySelector('.music__cd-img');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');

const app = {
    currenIndex : 1,
    isPlaying: false,
    songs: [
                {
                    name: 'Heat Wave',
                    singer:'Glass Animals',
                    path: './assets/mp3/heat_waves.mp3',
                    image:'./assets/images/heat_wave.jpg'
                },
                {
                    name: 'Head In The Clouds',
                    singer:'Hayd',
                    path: './assets/mp3/head_in.mp3',
                    image:'./assets/images/head_in.jpg'
                },
                {
                    name: 'Pay Phone',
                    singer:'Vicetone',
                    path: './assets/mp3/pay_phone.mp3',
                    image:'./assets/images/pay_phone.jpg'
                },
                {
                    name: 'Stereo Hearts',
                    singer:'Adam Levine',
                    path: './assets/mp3/heroes_stereo.mp3',
                    image:'./assets/images/steriol.jpg'
                },
                {
                    name: 'Wake Me Up',
                    singer:'Avicii',
                    path: './assets/mp3/wake_me_up.mp3',
                    image:'./assets/images/up.jpg'
                },
                {
                    name: 'Wake Me Up',
                    singer:'Avicii',
                    path: './assets/mp3/wake_me_up.mp3',
                    image:'./assets/images/up.jpg'
                },
                {
                    name: 'Wake Me Up',
                    singer:'Avicii',
                    path: './assets/mp3/wake_me_up.mp3',
                    image:'./assets/images/up.jpg'
                },
            ],
    render: function() {
        var listSongs = document.querySelector('.music__playlist');
        var html = this.songs.map(function(song,index){
            return `<div class="music__song">
                        <div class="music__song-img" style="background-image: url(${song.image});"></div>
                        <div class="music__song-content">
                            <h3 class="music__song-name">${song.name}</h3>
                            <p class="music__song-author">${song.singer}</p>
                        </div>
                        <div class="music__song-option"><i class="bi bi-three-dots"></i></div>
                    </div>`
        });
        html = html.join('');
        listSongs.innerHTML = html;
    },
    handleEvents: function() {
        var _this = this;
        var imgCd = document.querySelector('.music__cd-img');
        var widthImgCd = imgCd.offsetHeight;
        var cdRound = cdImg.animate([{transform: "rotate(360deg)" }],{  duration: 8000, iterations: Infinity,});
        cdRound.pause();
        document.onscroll = function() {
            var scollY = window.scrollY || document.documentElement.scrollTop;
  
            var newWidthImgCd = widthImgCd - scollY  ;
            imgCd.style.width = newWidthImgCd > 0 ? newWidthImgCd + 'px': 0 ;
            imgCd.style.height = newWidthImgCd > 0 ? newWidthImgCd +'px ': 0 ;
            imgCd.style.opacity = newWidthImgCd / widthImgCd;
        }
        btnPlay.onclick = function() {
            if(_this.isPlaying) {
                audio.pause();
            }
            else {                
                audio.play();
            }
         //bắt sự kiện bấm play
         audio.onplay = function() {
            _this.isPlaying = true;
            btnPlay.classList.add('playing');
            cdRound.play();
         }
         // bắt sự kiện bấm pause
         audio.onpause = function() {
            _this.isPlaying = false;
            btnPlay.classList.remove('playing');
            cdRound.pause();
         }
         // bắt sự kiện thay đổi tiến độ bài hát
         progress.oninput = function(e) {
            let seekTime = e.target.value * (audio.duration / 100);
            audio.currentTime = seekTime;
         }
         audio.ontimeupdate = function() {
            progress.value = (audio.currentTime/ audio.duration) * 100;
            if(progress.value == 100) {
                app.nextSong();
                audio.play();
            }
         }
         // bắt sự kiện tua bài hát
         
        }
        btnNext.onclick = function(){
            _this.nextSong();
            audio.play();
        }
        btnPrev.onclick =function() {
            _this.prevSong();
            audio.play();
        }
    },
    // định nghĩa thuộc tính cho object
    defineProperties: function() {
        Object.defineProperty(this,'currenSong', {
            get: function(){
                return this.songs[this.currenIndex]
            }
        })
    },
    loadCurrentSong: function() {
        nameSong.textContent = this.currenSong.name;
        imgSong.style.backgroundImage  = `url(${this.currenSong.image})`;
        audio.src = this.currenSong.path
    },
    nextSong: function() {
        this.currenIndex ++;
        if(this.currenIndex >= this.songs.length) {
            this.currenIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currenIndex --;
        if(this.currenIndex < 0) {
            this.currenIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    start : function() {
        this.defineProperties()
        this.handleEvents()
        // tải bài hát đầu tiên khi người dùng chạy ứng dụng
        this.loadCurrentSong()
        this.render()
    }


}
app.start();