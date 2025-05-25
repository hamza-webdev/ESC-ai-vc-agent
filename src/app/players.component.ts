import { Component, OnInit } from '@angular/core';
import { Player } from './player.model';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];
  selectedPlayer: Player = this.emptyPlayer();

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers() {
    this.playerService.getPlayers().subscribe(players => this.players = players);
  }

  onSubmit() {
    if (this.selectedPlayer.id) {
      this.playerService.updatePlayer(this.selectedPlayer.id, this.selectedPlayer).subscribe(() => {
        this.loadPlayers();
        this.resetForm();
      });
    } else {
      this.playerService.addPlayer(this.selectedPlayer).subscribe(() => {
        this.loadPlayers();
        this.resetForm();
      });
    }
  }

  editPlayer(player: Player) {
    this.selectedPlayer = { ...player };
  }

  deletePlayer(id?: number) {
    if (!id) return;
    this.playerService.deletePlayer(id).subscribe(() => this.loadPlayers());
  }

  resetForm() {
    this.selectedPlayer = this.emptyPlayer();
  }

  private emptyPlayer(): Player {
    return { name: '', position: '', number: 0, age: undefined };
  }
}
