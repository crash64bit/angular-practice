import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MenuItem } from '../../models/menuItem.interface';

@Component({
  selector: 'app-main-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIcon,
],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit(): void {
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
