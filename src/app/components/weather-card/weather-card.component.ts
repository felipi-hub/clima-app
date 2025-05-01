import { Component, HostListener, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {
  city: string = '';
  weatherData: any;
  backgroundImage: string = '';
  showResult = false;
  loading = false;
  errorMessage: string = '';


  constructor(private weatherService: WeatherService) { }
  ngOnInit(): void {
    // Define o fundo padrão ao iniciar o componente
    this.backgroundImage = 'url("assets/imgpadrao.jpeg")';
  }

  searchWeather(): void {
    this.showResult = false;
    this.weatherData = null;
    this.loading = true;
    this.errorMessage = '';

    this.weatherService.getWeather(this.city).subscribe(
      data => {
        this.weatherData = data;
        this.setBackgroundImage(data.weather[0].main);

        setTimeout(() => {
          this.showResult = true;
          this.loading = false;
        }, 100);
      },
      error => {
        console.error(error);
        this.loading = false;
        this.errorMessage = 'Cidade não encontrada. Verifique o nome digitado.';
      }
    );
  }

  private setBackgroundImage(weatherCondition: string): void {
    const condition = weatherCondition.toLowerCase();
    if (condition.includes('clear')) {
      this.backgroundImage = 'url("assets/imgcellimpo2.jpeg")';
    } else if (condition.includes('cloud')) {
      this.backgroundImage = 'url("assets/imgnublado.jpeg")';
    } else if (condition.includes('rain')) {
      this.backgroundImage = 'url("assets/imgchuva.jpeg")';
    } else {
      this.backgroundImage = 'url("assets/imgpadrao.jpeg")';
    }
  }

  // Detecta clique fora do card para resetar
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.card-content');

    if (!clickedInside && this.showResult) {
      this.resetState();
    }
  }

  private resetState(): void {
    this.weatherData = null;
    this.city = '';
    this.showResult = false;
    this.errorMessage = '';
  }
}
