import { StorageService } from './../common/storage.service';
import { TerrainFeature } from '../common/terrain-feature';
import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import Phaser from 'phaser';
import { MapObject } from '../common/map-object';
import { TerrainFeatureOption } from '../setup/setup.component';
import { Scenario } from '../setup/scenario-list/scenario';
import { ScenarioOption } from '../setup/scenario-list/scenario-list.component';
import {v4 as uuidv4} from 'uuid';
import { GameState } from '../common/game-state';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
@Injectable()
export class GameComponent implements OnInit, OnDestroy {

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: 600,
      width: 800,
      scene: [ MainScene ],
      parent: 'gameContainer',
      backgroundColor: 'rgba(103, 86, 73, 0)',
      physics: {
        default: 'matter',
        matter: {
          gravity: {
            y: 0
          },
          debug: true
        }
      }
    };
  }
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }
  ngOnDestroy(): void {
      this.phaserGame.destroy(true);
  }
}

@Injectable()
class MainScene extends Phaser.Scene {

  private terrainFeatures: TerrainFeature[];
  private scenarios: Scenario[];
  private activeScenario: Scenario;
  private mapObjects: MapObject[] = [];
  private physObjects: Phaser.Physics.Matter.Sprite[] = [];
  private textObjects: Phaser.GameObjects.Text[] = [];
  private options: TerrainFeatureOption[];
  private scenarioOptions: ScenarioOption[];
  private storage: Storage = localStorage;
  private storageService: StorageService;
  private table:GameTable;

  constructor() {
    super({ key: 'main' });
    this.storageService = new StorageService();
  }
  create() {
    console.log('create method');

    const offset = 25
    const canvasW = 800
    const canvasL = 600;

    this.initTable(canvasW, canvasL, offset);

    this.terrainFeatures = this.cache.json.get('terrainJSON');
    this.scenarios = this.cache.json.get('scenarioJSON');


    this.storageService.setTerrainFeatures(this.terrainFeatures);

    this.storageService.getTerrainFeatureOptions();
    this.storageService._terrainFeatureOptions.subscribe(data => {
      this.options = data
    });
    this.storageService.getScenarioOptions();
    this.storageService._scenarioOptions.subscribe((data) => {
      this.scenarioOptions = data
    });

    const mode = this.storageService.getMode();

    if (mode === 'generate')
      this.newMap();
    else if (mode === 'load')
      this.loadMap();
    else
      throw new Error('unknown mode detected.');
  }


  findScaleFactor(canvasW: number, canvasL: number, tableW: number, tableL: number, offset) {
    var scaleFactor = 0;
    while(((tableW * scaleFactor) <= (canvasW - offset)) && ((tableL * scaleFactor) <= (canvasL - offset)))
      scaleFactor++;
    return scaleFactor;
  }

  initTable(canvasW, canvasL, offset) {
    var tableWidth:number = +this.storage.getItem('tableWidth');
    var tableLength:number = +this.storage.getItem('tableLength');
    if (tableLength > tableWidth)
    {
      var temp:number = tableWidth;
      tableWidth = tableLength;
      tableLength = temp;
    }
    const scaleFactor:number = this.findScaleFactor(canvasW, canvasL, tableWidth, tableLength, offset)
    const gridWidth:number = tableWidth * scaleFactor
    const gridLength:number = tableLength * scaleFactor
    const gridCellsPerRow:number = 12 * tableWidth;
    const gridCellsPerColumn:number = 12 * tableLength;
    const cellWidth:number = gridWidth / gridCellsPerRow;
    const origX:number = gridWidth/2 + cellWidth;
    const origY:number = gridLength/2 + cellWidth;
    this.add.grid(origX, origY, gridWidth, gridLength, cellWidth, cellWidth, 0x488962);
    this.matter.world.setBounds(cellWidth, cellWidth, gridWidth, gridLength);

    const table: GameTable = {
      x: cellWidth,
      y: cellWidth,
      origX: origX,
      origY: origY,
      widthFeet: tableWidth,
      lengthFeet: tableLength,
      widthPixels: gridWidth,
      lengthPixels: gridLength,
      grid: {
        cellWidth: cellWidth,
        cellsPerRow: gridCellsPerRow,
        cellsPercolumn: gridCellsPerColumn
      }
    }
    this.storageService.setGameTable(table);
  }

  loadMap() {

    const gameState: GameState = this.storageService.getActiveGameState();

    gameState.mapObjects.forEach((mo) => {
      this.generatePhysicalObject(mo);
    })
    this.storageService.setActiveScenario(gameState.activeScenario);
    this.matter.add.mouseSpring();
  }

  generatePhysicalObject(mapObject: MapObject) {
    const terrainfeatureName = mapObject.type.name.charAt(0).toLowerCase()+mapObject.type.name.slice(1).replaceAll(/\s/g,'');
    const terrainfeaturetype = mapObject.type.type.charAt(0).toLowerCase()+mapObject.type.type.slice(1).replaceAll(/\s/g,'');
    var shapesFilename = terrainfeaturetype+'Shapes';
    var shapes = this.cache.json.get(shapesFilename);
    const sheetName = terrainfeaturetype+'Sheet';
    const imgName =  terrainfeatureName+'.png';

    if (terrainfeaturetype === 'mysteriousRiver')
    {
      this.generateRiver();
    }
    else
    {
      var shape;
      for (var key in shapes) {
      if (shapes[key].label === terrainfeatureName) {
        shape = shapes[key];
        break;
        }
      }
      const sprite = this.matter.add.sprite(mapObject.x, mapObject.y, sheetName, imgName, {shape: shape})

      sprite.setScale(0.8);
      sprite.angle = Phaser.Math.Between(-180, 180);
      this.physObjects.push(sprite);
      this.textObjects.push(this.add.text(mapObject.x, mapObject.y, mapObject.type.name));
    }
  }

  addRiverPiece(id: number, x: number, y: number) {

    const shapes = this.cache.json.get('mysteriousRiverShapes');
    const imgName = 'mysteriousRiver'
    const sheetName = 'mysteriousRiverSheet'

    var shape;
    var image;
    var i = 0;
    var nb: string;

    for (var key in shapes) {
      if (i > 1)
      {
        if (i === id + 2)
        {
          console.log("id found");
          shape = shapes[key]
          nb = (i - 2).toString();
          image = imgName + nb +'.png';
          console.log(image);
          var sprite = this.matter.add.sprite(x, y, sheetName, image, {shape: shape})
          sprite.setScale(0.8);
          console.log(sprite.getCenter().x)
          this.physObjects.push(sprite);
          this.textObjects.push(this.add.text(x, y, imgName+nb));
          break;
        }
      }
      i++;
    }
  }

  generateRiver() {
    console.log('adding river piece');
    const originX = 88;
    const originY = Phaser.Math.Between(88, 300);
    this.addRiverPiece(2, originX, originY);
    this.addRiverPiece(6, originX+170, originY+15);
  }

  newMap() {

    const minElems:number = +this.storage.getItem('minTerrainElements');
    const maxElems:number = +this.storage.getItem('maxTerrainElements');
    const numberOfMapObjects = Phaser.Math.Between(minElems, maxElems);


    for (let i = 0; i < numberOfMapObjects; i++)
        {
          const mapObject: MapObject = this.generateRandomMapObject(this.terrainFeatures);
          this.generatePhysicalObject(mapObject);
        }
    this.matter.add.mouseSpring();
    this.pickRandomScenario();
  }

  preload() {
    console.log('preload method');
    this.load.atlas('steadfastSanctumSheet', 'assets/img/sheets/steadfastSanctumSprites.png', 'assets/physics/steadfastSanctumSprites.json');
    this.load.json('steadfastSanctumShapes', 'assets/physics/steadfastSanctumShapes.json');

    this.load.atlas('sinisterStructureSheet', 'assets/img/sheets/sinisterStructureSprites.png', 'assets/physics/sinisterStructureSprites.json');
    this.load.json('sinisterStructureShapes', 'assets/physics/sinisterStructureShapes.json');


    this.load.atlas('hillSheet', 'assets/img/sheets/hillSprites.png', 'assets/physics/hillSprites.json');
    this.load.json('hillShapes', 'assets/physics/hillShapes.json');

    this.load.atlas('buildingSheet', 'assets/img/sheets/buildingSprites.png', 'assets/physics/buildingSprites.json');
    this.load.json('buildingShapes', 'assets/physics/buildingShapes.json');

    this.load.atlas('obstaclesSheet', 'assets/img/sheets/obstaclesSprites.png', 'assets/physics/obstaclesSprites.json');
    this.load.json('obstaclesShapes', 'assets/physics/obstaclesShapes.json');

    this.load.atlas('mysteriousForestSheet', 'assets/img/sheets/mysteriousForestSprites.png', 'assets/physics/mysteriousForestSprites.json');
    this.load.json('mysteriousForestShapes', 'assets/physics/mysteriousForestShapes.json');


    this.load.atlas('mysteriousRiverSheet', 'assets/img/sheets/mysteriousRiverSprites.png', 'assets/physics/mysteriousRiverSprites.json');
    this.load.json('mysteriousRiverShapes', 'assets/physics/mysteriousRiverShapes.json');


    this.load.atlas('magicalMysterySheet', 'assets/img/sheets/magicalMysterySprites.png', 'assets/physics/magicalMysterySprites.json');
    this.load.json('magicalMysteryShapes', 'assets/physics/magicalMysteryShapes.json');

    this.load.atlas('marshSheet', 'assets/img/sheets/marshSprites.png', 'assets/physics/marshSprites.json');
    this.load.json('marshShapes', 'assets/physics/marshShapes.json');


    this.load.json('terrainJSON', 'assets/json/terrainDB.json');
    this.load.json('scenarioJSON', 'assets/json/scenarioDB.json');
  }

  override update() {
    this.physObjects.forEach((physObj, i) => {
      const pos = physObj.body.position;
      this.textObjects[i].setPosition(pos.x, pos.y);
    })
  }

  render() {

  }

  generateRandomMapObject(terrainFeatures: TerrainFeature[]): MapObject {

    const typeNb: number = Phaser.Math.Between(1, 6) + Phaser.Math.Between(1, 6)
    const terrainFeature: TerrainFeature = this.getRandomTerrainFeatureFromType(typeNb - 2, terrainFeatures);
    const newObject = new MapObject();

    this.storageService._gameTable.subscribe((data) => {
      this.table = data
    });

    newObject.type = terrainFeature;

    const x = Phaser.Math.Between(this.table.x, this.table.x + this.table.widthPixels);
    const y = Phaser.Math.Between(this.table.y, this.table.y + this.table.lengthPixels);

    newObject.x = x;
    newObject.y = y;
    newObject.w = 0;
    newObject.h = 0;
    newObject.clicked = false;
    newObject.id = uuidv4();

    this.addMapObject(newObject);
    return newObject;
  }

  addMapObject(mapObject: MapObject) {
    this.mapObjects.push(mapObject);
    this.storageService.setMapObjects(this.mapObjects);
  }

  pickRandomScenario() {
    const id = Phaser.Math.Between(0, this.scenarioOptions.length - 1);
    if (this.scenarioOptions[id].completed === true)
      this.activeScenario = this.scenarios[id];
    else
      this.pickRandomScenario();
    this.storageService.setActiveScenario(this.activeScenario);
  }

  getRandomTerrainFeatureFromType(typeId: number, terrainFeatures: TerrainFeature[]): TerrainFeature {
    const featuresOfType: TerrainFeature[] = terrainFeatures.filter(
      (tf) => tf.type_id === typeId
    );
    const id = Phaser.Math.Between(0, featuresOfType.length - 1) + featuresOfType[0].id;
    var terrainFeature = featuresOfType.find(tf => tf.id === id);
    if(!this.checkFeatureSelectionStatus(terrainFeature))
    {
      terrainFeature = this.getRandomTerrainFeatureFromType( Phaser.Math.Between(1, 6) + Phaser.Math.Between(1, 6) - 2, this.terrainFeatures);
    }
    return terrainFeature;
  }

  checkFeatureSelectionStatus(terrainFeature: TerrainFeature): boolean {
    this.storageService.getTerrainFeatureOptions();
    this.storageService._terrainFeatureOptions.subscribe((data) => {
      this.options = data;
    })
    const suboptions = this.options[terrainFeature.type_id].suboptions;
    if(suboptions[terrainFeature.id - suboptions[0].terrainFeature.id].completed)
      return true;
    else
      return false;
  }
}

export class GameTable {
  x: number;
  y: number;
  origX: number;
  origY: number;
  widthFeet: number;
  lengthFeet: number;
  widthPixels: number;
  lengthPixels: number;
  grid: Grid;
}

export class Grid {
  cellWidth: number;
  cellsPerRow: number;
  cellsPercolumn: number;
}
