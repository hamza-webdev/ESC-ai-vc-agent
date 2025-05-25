import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersComponent } from './players.component';
import { PlayerService } from './player.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('PlayersComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;
  let playerServiceSpy: jasmine.SpyObj<PlayerService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PlayerService', ['getPlayers', 'addPlayer', 'updatePlayer', 'deletePlayer']);
    await TestBed.configureTestingModule({
      imports: [PlayersComponent, CommonModule, FormsModule],
      providers: [{ provide: PlayerService, useValue: spy }]
    }).compileComponents();
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    playerServiceSpy = TestBed.inject(PlayerService) as jasmine.SpyObj<PlayerService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load players on init', () => {
    const mockPlayers = [
      { id: 1, name: 'Ali', position: 'Attaquant', number: 9 },
      { id: 2, name: 'Sami', position: 'Défenseur', number: 4 }
    ];
    playerServiceSpy.getPlayers.and.returnValue(of(mockPlayers));
    component.loadPlayers();
    expect(component.players.length).toBe(2);
    expect(component.players).toEqual(mockPlayers);
  });
});
