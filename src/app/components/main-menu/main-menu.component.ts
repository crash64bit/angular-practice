import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'main-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIcon,
],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent {
items: any | undefined;

ngOnInit() {
    this.items = [
        {
          label: 'Home',
          icon: 'home',
          routerLink: ['/'],
          routerLinkActiveOptions: { exact: true }
        },
        {
          label: 'Todo',
          icon: 'star',
          routerLink: ['/todo'],
          routerLinkActiveOptions: { exact: true }
        },
        {
          label: 'Counter',
          icon: 'timer',
          routerLinkActiveOptions: { exact: true }
        }
    ]
  }
}
