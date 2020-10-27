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

  constructor() { }

  ngOnDestroy(): void {
    this.onStopAlert();
  }

  ngOnInit() { 
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      console.log('end')
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  uploadFile(){
    console.log(this.file);
  }

  playFile(){
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (event) => {
      this.fileUrl = event.target.result;
    }
    this.audio.src = this.fileUrl;
    this.audio.autoplay = true;
    this.audio.load();
    this.isPlaying = true;
  }

  onPlayAlert() {
    this.audio.src = '../../assets/audio/alert.mp3';
    this.audio.play();
    // this.audio.volume = 0.1;
    let vol = this.audio.volume;

    this.isPlaying = true;
  }

  onStopAlert() {
    this.audio.pause();
    this.isPlaying = false;
  }

  onPlayBeep() {
    this.audio.src = '../../assets/audio/beep.mp3';
    this.audio.loop = true;
    // this.audio.volume = 0.0;
    this.audio.load()
    this.audio.addEventListener('loadeddata', () => {
      console.log('end')
    });
    this.audio.play();
    this.audio.autoplay = true;

    // this.audio.muted = true;
    setTimeout(() => {
      this.onStopAlert();
    }, 2000);
    this.isPlaying = true;
  }

}
