import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-sidenav',
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatDrawer,
    MatListModule,
    MatDrawerContainer,
    MatIconModule,
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {}
