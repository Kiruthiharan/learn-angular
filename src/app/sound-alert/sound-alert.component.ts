import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-sound-alert',
  templateUrl: './sound-alert.component.html',
  styleUrls: ['./sound-alert.component.css']
})
export class SoundAlertComponent implements OnInit, OnDestroy {
  audio = new Audio();
  isPlaying = false;
  file: File;
  fileUrl;
  audioTypes = ['audio/pcm', 'audio/wav', 'audio/aiff', 'audio/flac', 'audio/wma', 'audio/m4a', 
                'audio/mp3', 'audio/oga', 'audio/aac', 'audio/mpeg', 'audio/ogg'  ]

  constructor() { }

  ngOnDestroy(): void {
    this.onStopAlert();
  }

  ngOnInit() {
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      console.log('end');
    });
    // this.audioTypes.forEach(element => {
    //   console.log(element + this.audio.canPlayType(element));
    // });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  uploadFile() {
    console.log(this.file);
  }

  playFile() {
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (event) => {
      this.fileUrl = event.target.result;
      this.audio.src = this.fileUrl;
      this.audio.autoplay = true;
      this.audio.load();
      this.audio.play();
      this.isPlaying = true;
    }
  }

  onPlayAlert() {
    this.audio.src = '../../assets/audio/alert.mp3';
    this.audio.play();
    // this.audio.volume = 0.1;
    const vol = this.audio.volume;
    this.isPlaying = true;
  }

  onStopAlert() {
    this.audio.pause();
    this.isPlaying = false;
  }

  onPlayBeep() {
    this.audio.src = '../../assets/audio/beep.mp3';
    // this.audio.loop = true;
    // this.audio.volume = 0.0;
    this.audio.load();
    this.audio.play();
    // this.audio.muted = true;
    // setTimeout(() => {
    //   this.onStopAlert();
    // }, 2000);
    this.isPlaying = true;
  }

  fromCloud() {
    // this.audio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    this.audio.src = 'http://localhost:3000/audio.mp3';
    this.audio.load();
    this.audio.play();
    this.isPlaying = true;
  }

  onLoopToggle() {
    this.audio.loop = !this.audio.loop;
  }

  decreaseVol() {
    this.audio.volume = this.audio.volume - 0.1;
  }

  increaseVol() {
    this.audio.volume = this.audio.volume + 0.1;
  }

  onMuteToggle() {
    this.audio.muted = !this.audio.muted;
  }

}
