import { Component } from '@angular/core';
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
export class WeatherCardComponent {
  city: string = '';
  weatherData: any;
  backgroundImage: string = '';

  constructor(private weatherService: WeatherService) { }

  searchWeather(): void {
    this.weatherService.getWeather(this.city).subscribe(data => {
      this.weatherData = data;
      this.setBackgroundImage(data.weather[0].main);
    });
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


}

