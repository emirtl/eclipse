import { Component, HostListener, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [NgForOf],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  cow = { x: 100, y: 100 };
  people = this.generatePeople();
  score = 0;

  @HostListener('window:keydown', ['$event'])
  moveCow(event: KeyboardEvent) {
    const step = 20;
    if (event.key === 'ArrowUp') this.cow.y -= step;
    if (event.key === 'ArrowDown') this.cow.y += step;
    if (event.key === 'ArrowLeft') this.cow.x -= step;
    if (event.key === 'ArrowRight') this.cow.x += step;
    this.checkCollision();
  }

  generatePeople() {
    return Array.from({ length: 5 }, () => ({
      x: Math.random() * 400 + 50,
      y: Math.random() * 400 + 50,
    }));
  }

  checkCollision() {
    this.people = this.people.filter((person) => {
      const hit =
        Math.abs(this.cow.x - person.x) < 30 &&
        Math.abs(this.cow.y - person.y) < 30;
      if (hit) this.score++;
      return !hit;
    });

    if (this.people.length === 0) {
      this.people = this.generatePeople();
    }
  }
}
