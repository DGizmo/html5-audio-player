import React, { Component } from 'react';
import '../styles/App.css';

import bass from '../music/Bass.m4a'
import drums from '../music/Drums.m4a'
import solo from '../music/Solo.m4a'
import guitar from '../music/Guitar.m4a'
import vocals from '../music/Vocals.m4a'

let loopInd = false
let requestId = undefined
let num = null
const initAudio = []

class App extends Component {

  play = () => {
    const mas = document.querySelectorAll('audio')
    for (var i = 0; i < mas.length; i++) {
      mas[i].play()
    }
  }

  pause() {
    const mas = document.querySelectorAll('audio')
    for (var i = 0; i < mas.length; i++) {
      mas[i].pause()
    }
  }

  reset() {
    const mas = document.querySelectorAll('audio')
    for (var i = 0; i < mas.length; i++) {
      mas[i].pause()
      mas[i].currentTime = 0
    }
  }

  loop = (e) => {
    if (num !== e.target.getAttribute('data-num')) {
      requestId = undefined
      loopInd = false
    }
    num = e.target.getAttribute('data-num')
    loopInd =!loopInd

    const loopId = e.target.id
    const loop = document.querySelectorAll('.Loop')
    for (var i = 0; i < loop.length; i++) {
      if(loopInd !== loop[i].id) {
        if(loop[i].classList.contains('active')) {
          loop[i].classList.remove('active')
        }
      }
    }

    if (loopInd) {
      e.target.classList.add('active')
      const mas = document.querySelectorAll('audio')
      const track = mas[0]
      const limit = num + 0.1
      for (var i = 0; i < mas.length; i++) {
        mas[i].currentTime = num - 5
      }

      (function audio() {
        if (track.currentTime >= num && track.currentTime < limit) {
          for (var i = 0; i < mas.length; i++) {
            mas[i].currentTime = num - 5
          }
        }
        requestId = requestAnimationFrame(audio)
      })()

    } else {
      cancelAnimationFrame(requestId)
      requestId = undefined
      e.target.classList.remove('active')
    }
  }

  customLoop = (e) => {
    this.removeLoop()

    const min = +document.querySelector('#min').value || 0
    const max = +document.querySelector('#max').value || 1

    const mas = document.querySelectorAll('audio')
    const track = mas[0]
    const limit = max + 0.1
    for (var i = 0; i < mas.length; i++) {
      mas[i].currentTime = min
    }

    (function audio() {
      if (track.currentTime >= max && track.currentTime < limit) {
        for (var i = 0; i < mas.length; i++) {
          mas[i].currentTime = min
        }
      }
      requestId = requestAnimationFrame(audio)
    })()

  }

  removeLoop = (e) => {
    cancelAnimationFrame(requestId)
    requestId = undefined

    const loop = document.querySelectorAll('.Loop')
    for (var i = 0; i < loop.length; i++) {
      loop[i].classList.remove('active')
    }
  }

  solo = (e) => {
    const target = e.target
    const muteId = '#mute' + e.target.id.slice(4)
    const mute = document.querySelector(muteId)

    if (target.checked) {
      if (mute.checked) mute.checked = 0
    }

    const audio = document.querySelectorAll('audio')
    const solo = document.querySelectorAll('.Solo')
    const mute2 = document.querySelectorAll('.Mute')
    
    let volume = 0

    for (var j = 0; j < solo.length; j++) {
      if (solo[j].checked) {
        audio[j].muted = false
      } else if (mute2[j].checked){
        audio[j].muted = true
      } else {
        audio[j].muted = true
      }
    }

    this.default()
  }

  mute = (e) => {
    const target = e.target
    const soloId = '#solo' + e.target.id.slice(4)
    const solo = document.querySelector(soloId)

    if (target.checked) {
      if (solo.checked) solo.checked = 0
    }

    const audio = document.querySelectorAll('audio')
    const mute = document.querySelectorAll('.Mute')
    const solo2 = document.querySelectorAll('.Solo')

    for (var j = 0; j < mute.length; j++) {
      if (solo2[j].checked) {
        audio[j].muted = false
      } else if (mute[j].checked){
        audio[j].muted = true
      } else {
        audio[j].muted = false
      }
    }

    this.default()
  }

  default = () => {
    const audio = Array.from(document.querySelectorAll('audio'))
    const mute = Array.from(document.querySelectorAll('.Mute'))
    const solo = Array.from(document.querySelectorAll('.Solo'))

    const muteStatus = mute.every(el => el.checked === false)
    const soloStatus = solo.every(el => el.checked === false)

    if (muteStatus && soloStatus) {
      audio.forEach(el => el.muted = false)
    }
  }

  render() {

    return (
      <div className="App">
        <audio src={bass} controls id="a1" />
        <audio src={guitar} controls id="a2" />
        <audio src={solo} controls id="a3" />
        <audio src={drums} controls id="a4" />
        <audio src={vocals} controls id="a5" />
        <table>
          <tbody>
            <tr>
              <td>Instrument</td>
              <td>~</td>
              <td>Solo</td>
              <td>Mute</td>
              <td>Volume</td>
            </tr>
            <tr>
              <td>Bass</td>
              <td></td>
              <td><input type="checkbox" id="solo1" className="Solo" onClick={this.solo}/></td>
              <td><input type="checkbox" id="mute1" className="Mute" onClick={this.mute}/></td>
              <td><input type="range" className="Volume" min="0" max="10" step="1"/></td>
            </tr>
            <tr>
              <td>Guitar</td>
              <td></td>
              <td><input type="checkbox" id="solo2" className="Solo" onClick={this.solo}/></td>
              <td><input type="checkbox" id="mute2" className="Mute" onClick={this.mute}/></td>
              <td><input type="range" className="Volume" min="0" max="10" step="1"/></td>
            </tr>
            <tr>
              <td>Solo</td>
              <td></td>
              <td><input type="checkbox" id="solo3" className="Solo" onClick={this.solo}/></td>
              <td><input type="checkbox" id="mute3" className="Mute" onClick={this.mute}/></td>
              <td><input type="range" className="Volume" min="0" max="10" step="1"/></td>
            </tr>
            <tr>
              <td>Drums</td>
              <td></td>
              <td><input type="checkbox" id="solo4" className="Solo" onClick={this.solo}/></td>
              <td><input type="checkbox" id="mute4" className="Mute" onClick={this.mute}/></td>
              <td><input type="range" className="Volume" min="0" max="10" step="1"/></td>
            </tr>
            <tr>
              <td>Vocals</td>
              <td></td>
              <td><input type="checkbox" id="solo5" className="Solo" onClick={this.solo}/></td>
              <td><input type="checkbox" id="mute5" className="Mute" onClick={this.mute}/></td>
              <td><input type="range" className="Volume" min="0" max="10" step="1"/></td>
            </tr>
          </tbody>
        </table>
        
        <button onClick={this.play} id="play">Play</button>
        <button onClick={this.pause} id="pause">Pause</button>
        <button onClick={this.reset} id="reset">Reset to 0</button>
        <button onClick={this.loop} data-num={10} className="Loop" id="loop1">Loop 5 - 10 sec</button>
        <button onClick={this.loop} data-num={65} className="Loop" id="loop2">Loop 60 - 65 sec</button>
        <button onClick={this.loop} data-num={125} className="Loop" id="loop3">Loop 120 - 125 sec</button>
        <div className="Loop-form">
          <input type="text" placeholder="min 0" id="min"/>
          -
          <input type="text" placeholder="max 242 for this song" id="max"/>
          <button onClick={this.customLoop}>Submit loop</button>
          <button onClick={this.removeLoop}>Remove loop</button>
        </div>
      </div>
    );
  }
}

export default App;
