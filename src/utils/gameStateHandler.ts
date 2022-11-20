import { GameState } from 'csgo-gsi-types'
import { beepsPerSecond } from './beepsPerSecond'


export class GameStateHandler {
  bombPlantedDate: Date | null = null
  isBombPlanted: boolean = false
  lastBombSecond: number = 0
  bayeux: any

  constructor(bayeux: any) {
    this.bayeux = bayeux
  }
  
  handle(state: GameState): void {
    if (state.added?.round?.win_team) {
      this.bayeux.getClient().publish('/win', { team: state.round?.win_team })
      this.resetBomb()
      return 
    }

    if (!this.isBombPlanted && state.round?.phase === 'live') {
      this.bayeux.getClient().publish('/round', { state: 'live' })
    }

    if (state.round?.phase !== 'live') {
      this.isBombPlanted = false;
    }
    
    if (state.added?.round?.bomb && state?.round?.bomb === 'planted'){
        this.isBombPlanted = true
        this.bombPlantedDate = new Date()
        this.bayeux.getClient().publish('/bomb', { state: 'planted' })
      }

    if (this.isBombPlanted) {
      const bombSeconds = this.getBombPlantedSeconds() as number
      this.bombBeep(this.getBombSecondsPercentage(bombSeconds), bombSeconds) 
    }

    if (this.isBombPlanted && state?.round?.bomb === 'defused') {
        this.resetBomb()
        this.bayeux.getClient().publish('/bomb_defused', { state: 'defused' })
      } else if (this.isBombPlanted && state?.round?.bomb === 'exploded') {
        this.resetBomb()
        this.bayeux.getClient().publish('/bomb_exploded', { state: 'exploded' })
      }
  }

  getBombPlantedSeconds(): number | null {
    if(this.bombPlantedDate) {
      return Math.round((new Date().getTime() - this.bombPlantedDate?.getTime()) / 1000)
    }

    return null
  }

  getBombSecondsPercentage(bombSeconds: number): number | null {
    const bombExplosionTime = 40

    if(!bombSeconds) {
      return null;
    }

    return bombSeconds / bombExplosionTime
  }

  bombBeep(bombSecondsPercentage: number | null, bombSeconds: number): void {
    if (!bombSecondsPercentage) {
      return
    }
    
    if (bombSeconds !== this.lastBombSecond) {
      const beeps = beepsPerSecond(bombSecondsPercentage)
      const beepMilliseconds = 1000 / beeps

      for (let i = 1; i <= beeps; i++) {
        setTimeout(() => {
          if (this.bombPlantedDate) {
            this.bayeux.getClient().publish('/bomb', { state: 'beep' })
          }
        }, i * beepMilliseconds)
      }

      this.lastBombSecond = bombSeconds
    }
  }

  resetBomb(): void {
    this.bombPlantedDate = null
    this.isBombPlanted = false
    this.lastBombSecond = 0
  }
}