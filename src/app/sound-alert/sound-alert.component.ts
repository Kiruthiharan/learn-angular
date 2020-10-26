import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-sound-alert',
  templateUrl: './sound-alert.component.html',
  styleUrls: ['./sound-alert.component.css']
})
export class SoundAlertComponent implements OnInit, OnDestroy {
  audio;
  isPlaying = false;

  constructor() { }

  ngOnDestroy(): void {
    this.onStopAlert();
  }

  ngOnInit() {
    this.audio = new Audio();
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
    });
  }

  onPlayAlert() {
    this.audio.src = '../../assets/audio/alert.mp3';
    this.audio.play();
    this.isPlaying = true;
  }

  onStopAlert() {
    this.audio.pause();
    this.isPlaying = false;
  }

  onPlayBeep() {
    this.audio.src = '../../assets/audio/beep.mp3';
    this.audio.loop = true;
    this.audio.play();
    setTimeout(() => {
      this.onStopAlert();
    }, 30000);
    this.isPlaying = true;
  }

}
