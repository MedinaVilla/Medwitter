import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

interface IEvent {
  title: string,
  media?: {
    principalContent: string,
    extra?: string[]
  },
  categorie: string,
  type: number,
  description: string,

}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event: IEvent = {
    title: "Se alcanza el 38,765 contagiados en un solo día; el máximo desde hace 3 años",
    media: {
      principalContent: "https://c.tenor.com/eGqAkVtyhuoAAAAd/television-news.gif"
    },
    categorie: "Noticias",
    type: 1,
    description: "En las últimas 24 horas, México registró 20 mil 959 contagios y 42 muertes por COVID-19. \n De acuerdo con el informe técnico de la Secretaría de Salud, al corte de este martes 28 de junio, el país acumula 5 millones 986 mil 917 casos positivos y 325 mil 638 defunciones por COVID-19. \nLa dependencia detalló que, hasta este día, se tienen detectados 117 mil 847 casos activos de COVID-19, mismos que se encuentran de manera predominante en las siguientes entidades: Ciudad de México, Baja California Sur, Quintana Roo, Sinaloa, Yucatán, Colima, Nuevo León, San Luis Potosí, Querétaro y Campeche.\nEntre el lunes y este martes, México reportó un aumento de más de 13 mil casos activos, pasando de 104 mil a 117 mil en tan solo 24 horas.\nAdemás, la Ciudad de México se consolidó como la entidad con mayor concentración de casos activos por cada 100 mil habitantes durante el fin de semana."
  }

  constructor(private _location: Location) { }

  ngOnInit(): void {

  }

  goBackNavigate(): void {
    this._location.back();
  }


}
