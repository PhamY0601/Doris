import {Component, OnInit} from '@angular/core';
import {IconService} from "../../../services/icon.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private iconService: IconService
    ) {
        iconService.init();
    }

    ngOnInit(): void {
    }

}
