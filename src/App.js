import React, { Component } from 'react'
import Player from './assets/Player'
import Enemy from './assets/Enemy'
import Projectile from './assets/Projectile'
import Lifebar from './assets/Lifebar';
import io from 'socket.io-client'
import './App.css'
import Scoreboard from './assets/Scoreboard';
const socket = io.connect('localhost:3001')

const SAMPLE_GAME_STATE = {
    // parameters
    maxTracks: 8,
    maxLives: 3,
    intervalBetweenShots: 0.2,
    projectileSpeed: 2,

    // game state
    playerLives: 2, 
    playerTrack: 0, // which track the player is looking at
    playerShotCooldown: 0, // amount of ticks before allowed to shoot again (can shoot if 0)
    projectiles: [ // array of current projectiles
        { track: 1, position: 0, id: 'projectile1' }
    ],
    enemies: [
        { track: 1, position: 0.9, speed: 0.4, id: 'enemy1' },
        { track: 2, position: 0.8, speed: 0.4, id: 'enemy2' },
        { track: 3, position: 0.7, speed: 0.4, id: 'enemy3' },
		{ track: 4, position: 0.6, speed: 0.3, id: 'enemy4' },
		{ track: 5, position: 0.5, speed: 0.4, id: 'enemy5' },
        { track: 6, position: 0.4, speed: 0.4, id: 'enemy6' },
		{ track: 7, position: 0.3, speed: 0.3, id: 'enemy7' },
		{ track: 8, position: 0.2, speed: 0.3, id: 'enemy8' }
    ],
    tick: 15,
    score: 30
}

class App extends Component {

    constructor(props) {
        super(props)

        this.degPerTrack = 360 / SAMPLE_GAME_STATE.maxTracks
        this.maxDistance = 400

        this.state = {
            playerLives: SAMPLE_GAME_STATE.playerLives, 
			playerTrack: SAMPLE_GAME_STATE.playerTrack, // which track the player is looking at
			score: SAMPLE_GAME_STATE.score, // really??
            playerShotCooldown: SAMPLE_GAME_STATE.playerShotCooldown, // amount of ticks before allowed to shoot again (can shoot if 0)
            projectiles: SAMPLE_GAME_STATE.projectiles,
            enemies: SAMPLE_GAME_STATE.enemies // amount of ticks before allowed to shoot again (can shoot if 0)
		}
    }

    componentDidMount() {
		console.log('aaa')
        socket.on('gameState', (state) => {
			this.setState(state)
        })

<<<<<<< HEAD
        socket.on('voltaSQL', (resultsql) => {
            console.log(resultsql)
        })
=======
>>>>>>> 8dd6d28048552e1339feadfdb5c9660334bf9186

        window.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'Space':
                    socket.emit('shoot')
                    //  this.setState({ projectiles: (this.state.projectiles.position +0.1) % SAMPLE_GAME_STATE.maxTracks })
                    break;
                case 'KeyD':
                    socket.emit('turnRight')
                    // this.setState({ playerTrack: (this.state.playerTrack + 1) % SAMPLE_GAME_STATE.maxTracks })
                    break;
                case 'KeyW':
                    socket.emit('testaSQL')
                    // this.setState({ playerTrack: (this.state.playerTrack + 1) % SAMPLE_GAME_STATE.maxTracks })
                    break;
                case 'ArrowRight':
                    socket.emit('turnRight')
                    // this.setState({ playerTrack: (this.state.playerTrack + 1) % SAMPLE_GAME_STATE.maxTracks })
                    break;
                case 'KeyA':
                    socket.emit('turnLeft')
                    // this.setState({ playerTrack: (this.state.playerTrack - 1) % SAMPLE_GAME_STATE.maxTracks })
                    break;
                case 'ArrowLeft':
                    socket.emit('turnLeft')
                    // this.setState({ playerTrack: (this.state.playerTrack - 1) % SAMPLE_GAME_STATE.maxTracks })
					break;
				default:
					break;
            }
            
        })



        
		
		socket.emit('start')
    }

    viraDireita = () => {
            socket.emit('turnRight')
    }
    viraEsquerda = () => {
            socket.emit('turnLeft')
    }
    atira = () => {
            socket.emit('shoot')
    }

    render() {
        return (
            <div className="App">
                <content className='game'>
					{this.state.playerLives === 0 && 
						<div className="error">YOU LOSE</div>
					}
                    {
                        this.state.enemies.map(enemy => (
							<Enemy
								key={enemy.id} 
								enemy={enemy}
								degPerTrack={this.degPerTrack}
								maxDistance={this.maxDistance}
							/>
                        ))
                    }
                    {
                        this.state.projectiles.map(projectile => (
							<Projectile
								key={projectile.id} 
								projectile={projectile}
								degPerTrack={this.degPerTrack}
								maxDistance={this.maxDistance}
							/>
                        ))
                    }
                    <Player playerTrack={this.state.playerTrack} degPerTrack={this.degPerTrack} />
					{/*{
                        this.state.enemies.map(enemy => (
							<div
							 style={{ 
								borderTop:'1px solid blue',
								transform: `rotate(${enemy.track * this.degPerTrack}deg)`,
								zIndex: '1',
								margin: 0,
								width: '100%',
								position: 'absolute',
								top: '55vh',
								left: '2vw'
							  }}></div>
                        ))
                    }*/}
					<Lifebar playerLives={this.state.playerLives} />
					<Scoreboard score={this.state.score} />
                </content>
                <button className="btnLeft" onClick={this.viraEsquerda}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="icon">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </button>
                <button className="btnShoot" onClick={this.atira}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="icon">
                        <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </button>
                <button className="btnRight" onClick={this.viraDireita}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="icon">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </button>
            </div>
        )
    }
}

export default App
