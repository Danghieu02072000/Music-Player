const nameSong = document.querySelector('.music__header-name');
const imgSong = document.querySelector('.music__cd-img');
const audio = document.querySelector('#audio');
const btnPlay = document.querySelector('.btn-play');

const app = {
    currenIndex : 0,
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
        var widthImgCd = imgCd.offsetHeight
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
            btnPlay.classList.add('playing')
         }
         // bắt sự kiện bấm pause
         audio.onpause = function() {
            _this.isPlaying = false;
            btnPlay.classList.remove('playing');
         }
         // bắt sự kiện thay đổi tiến độ bài hát

         audio.ontimeupdate = function() {
            console.log(audio.currentTime)
         }

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
    start : function() {
        this.defineProperties()
        this.handleEvents()
        // tải bài hát đầu tiên khi người dùng chạy ứng dụng
        this.loadCurrentSong()
        this.render()
    }


}
app.start();