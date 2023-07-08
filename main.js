const nameSong = document.querySelector('.music__header-name');
const imgSong = document.querySelector('.music__cd-img');
const audio = document.querySelector('#audio');
const btnPlay = document.querySelector('.btn-play');
const progress = document.querySelector('.progress');
const cdImg = document.querySelector('.music__cd-img');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
const btnRandom = document.querySelector('.btn-random');
const btnRepeat = document.querySelector('.btn-repeat');
var listSongs = document.querySelector('.music__playlist');
const PLAYER_STORAGE = "Dang Hieu";
const timeStart = document.querySelector('.time-start');
const timeEnd = document.querySelector('.time-end');
const volumnStart = document.querySelector('.volumn');
const volume_0 = document.querySelector('.volum0');
const volume_1 = document.querySelector('.volum1');
const volume_2 = document.querySelector('.volum2');
const volume_3 = document.querySelector('.volum3');
const iconVolume = document.querySelectorAll('.volum')


const app = {
    currenIndex : 1,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMuted: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE)) || {},
    Seting: function(key, val) {
        this.config[key] = val;
        localStorage.setItem(PLAYER_STORAGE,JSON.stringify(this.config) )
    },
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
                    name: '하루하루',
                    singer:'BIGBANG',
                    path: './assets/mp3/haru.mp3',
                    image:'./assets/images/haru.jpg'
                },
                {
                    name: '눈,코,입',
                    singer:'TAEYANG',
                    path: './assets/mp3/eyes.mp3',
                    image:'./assets/images/eyes.jpg'
                },
            ],
    render: function() {
        var html = this.songs.map(function(song,index){
            return `<div class="music__song ${index === app.currenIndex ? 'active' : ''} " data-index='${index}'>
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
        }

        iconVolume.forEach(function(item) {
            item.onclick = function(e) {
                _this.HandleClickVolume(e.target)
            }
        })
         //bắt sự kiện bấm play
         audio.onplay = function() {
            _this.isPlaying = true;
            btnPlay.classList.add('playing');
            cdRound.play();
            _this.render();
            _this.scollViewActive();
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
         volumnStart.oninput = function(e) {
            let volumCurren = e.target.value;
            audio.volume = volumCurren / 100;
            _this.handleVolum(volumCurren)
         }
         // bắt thanh progress chạy khi bài chạy
         audio.ontimeupdate = function() {
            if(audio.duration) {
                progress.value = (audio.currentTime/ audio.duration) * 100;
                _this.convertSecon(audio.currentTime, audio.duration)
            }

         }
         //bắt sự kiện bài hát hết sang bài mới
         audio.onended = function() {
            if(_this.isRepeat) {
                audio.play();
            }
            else{
                if(_this.isRandom) {
                    _this.randomSong();
                }
                else{
                    _this.nextSong();
                }
                audio.play();
            }
  
         }

         // bắt sự kiện tua bài hát
         
        
        btnNext.onclick = function(){
            if(_this.isRandom) {
                _this.randomSong()
            }
            else{
                _this.nextSong();
            }
            audio.play();

        }
        btnPrev.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong();
            }
            else{
                _this.prevSong();
            }
            audio.play();

        }

        btnRepeat.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            console.log(_this.isRepeat)
            _this.Seting('isRepeat', _this.isRepeat)
            btnRepeat.classList.toggle('active', _this.isRepeat);
        }

        btnRandom.onclick = function() {
            _this.isRandom = ! _this.isRandom;
            _this.Seting('isRandom', _this.isRandom)
            this.classList.toggle('active', _this.isRandom);
                        btnRepeat.classList.toggle('active', _this.isRepeat);
            console.log(_this.isRandom)
        }
        listSongs.onclick = function(e){
            var songNoActive = e.target.closest('.music__song:not(.active)');

            if(songNoActive|| e.target.closest('.music__song-option')){

                if(songNoActive) {
                  _this.currenIndex =  Number(songNoActive.dataset.index);
                  _this.loadCurrentSong();
                  audio.play();
                }

                if(e.target.closest('.music__song-option')){
                    console.log('hi')
                }
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
    convertSecon: function(curren, duration){
        let miliDuration = Math.floor(duration / 60);
        var seconDuration = ((duration % 60)).toFixed(0);
        seconDuration = seconDuration < 10 ? '0' + seconDuration :  seconDuration;


        let miliCurren = Math.floor(curren / 60);
        var seconCurren = ((curren % 60)).toFixed(0);
        seconCurren = seconCurren < 10 ? '0' + seconCurren : seconCurren;


        timeEnd.innerText = `${miliDuration}:${seconDuration}`;
        timeStart.innerText = `${miliCurren}:${seconCurren}`;

    },
    handleVolum: function(volumCurren){
        volumCurren = Number(volumCurren)
        switch(true)
        {
        case (volumCurren == 0):
          console.log('0')
          document.querySelector('.volum.active').classList.remove('active')
          volume_0.classList.add('active');
          break;
        case ((volumCurren >= 1) && (volumCurren <= 30)):
            console.log('25')
            document.querySelector('.volum.active').classList.remove('active')
            volume_1.classList.add('active');
          break;
        case ((volumCurren >= 31) && (volumCurren <= 70)):
            console.log('50')
            document.querySelector('.volum.active').classList.remove('active')
            volume_2.classList.add('active');
          break;
        case ((volumCurren >= 71) && (volumCurren <= 100)):
            console.log('100')
            document.querySelector('.volum.active').classList.remove('active')
            volume_3.classList.add('active');
          break;
        }
    },
    HandleClickVolume : function(icon){
        this.isMuted = !(this.isMuted)
        if(this.isMuted) {
            icon.classList.remove('active');
            volume_0.classList.add('active');
            audio.muted = true;
        }
        else {
           let volum = volumnStart.value;
           this.handleVolum(volum);
           audio.muted = false;
        }

    },
    loadCurrentSong: function() {
        nameSong.textContent = this.currenSong.name;
        imgSong.style.backgroundImage  = `url(${this.currenSong.image})`;
        audio.src = this.currenSong.path;
        audio.volume = volumnStart.value / 100;
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat
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
    randomSong: function() {
        let newIndex;
        do{
            newIndex = Math.floor(Math.random()* this.songs.length );
        }while(newIndex === this.currenIndex );
        this.currenIndex = newIndex;
        this.loadCurrentSong();
    },
    repeatSong: function() {
        this.currenIndex = this.currenIndex;
        this.loadCurrentSong();
    },
    scollViewActive: function() {
        setTimeout(function(){
            document.querySelector('.music__song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
        },200)
    },
    start : function() {
        this.loadConfig
        this.defineProperties()
        this.handleEvents()
        // tải bài hát đầu tiên khi người dùng chạy ứng dụng
        this.loadCurrentSong()
        this.render()
    }


}
app.start();