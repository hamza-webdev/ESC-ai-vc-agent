import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlayerService } from './player.service';
import { Player } from './player.model';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent {
  players: Player[] = [];
  selectedPlayer: Player = this.emptyPlayer();

  constructor(private playerService: PlayerService) {
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
