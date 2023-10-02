import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/common/storage.service';
import { GameState } from '../../common/game-state';

@Component({
  selector: 'app-saved-maps-tab',
  templateUrl: './saved-maps-tab.component.html',
  styleUrls: ['./saved-maps-tab.component.css']
})
export class SavedMapsTabComponent implements OnInit{

  public gameStates$: Observable<GameState[]>;

  constructor(private storageService: StorageService){}

  async ngOnInit() {
    await delay(1000);
    this.storageService.getGameState();
    this.gameStates$ = this.storageService._gameState;
  }
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
