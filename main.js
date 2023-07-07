const app = {
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
        var imgCd = document.querySelector('.music__cd-img');
        var widthImgCd = imgCd.offsetHeight
        document.onscroll = function() {
            var scollY = window.scrollY || document.documentElement.scrollTop;
  
            var newWidthImgCd = widthImgCd - scollY  ;
            imgCd.style.width = newWidthImgCd > 0 ? newWidthImgCd + 'px': 0 ;
            imgCd.style.height = newWidthImgCd > 0 ? newWidthImgCd +'px ': 0 ;
            imgCd.style.opacity = newWidthImgCd / widthImgCd;
        }
    },
    start : function() {
        this.render()
        this.handleEvents()
    }


}
app.start();