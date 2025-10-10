import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'main-menu',
  imports: [
    MenubarModule,
  ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent {
items: MenuItem[] | undefined;

ngOnInit() {
    this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: ['/'],
          routerLinkActiveOptions: { exact: true }
        },
        {
          label: 'Todo',
          icon: 'pi pi-star',
          routerLink: ['/todo'],
          routerLinkActiveOptions: { exact: true }
        },
        {
          label: 'Counter',
          icon: 'pi pi-stopwatch',
          routerLinkActiveOptions: { exact: true }
        }
    ]
  }
}
