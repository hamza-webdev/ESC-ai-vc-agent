import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlayerService } from './player.service';
import { Player } from './player.model';

describe('PlayerService', () => {
  let service: PlayerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlayerService]
    });
    service = TestBed.inject(PlayerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve players from API', () => {
    const mockPlayers: Player[] = [
      { id: 1, name: 'Ali', position: 'Attaquant', number: 9 },
      { id: 2, name: 'Sami', position: 'Défenseur', number: 4 }
    ];
    service.getPlayers().subscribe(players => {
      expect(players.length).toBe(2);
      expect(players).toEqual(mockPlayers);
    });
    const req = httpMock.expectOne('http://localhost:5000/players');
    expect(req.request.method).toBe('GET');
    req.flush(mockPlayers);
  });
});
