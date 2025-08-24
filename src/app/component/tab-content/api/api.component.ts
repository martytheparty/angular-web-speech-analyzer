import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { SpeechService } from '../../../speech-service.service';
import { ApiProperty, ExpectedType } from '../../../interfaces/api';

@Component({
    selector: 'app-api',
    imports: [
        CommonModule,
        MatIconModule,
        MatTableModule
    ],
    templateUrl: './api.component.html',
    styleUrl: './api.component.scss'
})
export class ApiComponent {

    speechService: SpeechService = inject(SpeechService);
    api: Record<string, string> = {};
    foundProperties: string[] = [];

    expectedProperties: string[] = ['grammars', 'lang', 'continuous', 
        'interimResults', 'maxAlternatives', 'onaudiostart', 'onsoundstart', 
        'onspeechstart', 'onspeechend', 'onsoundend', 'onaudioend', 'onresult', 
        'onnomatch', 'onerror', 'onstart', 'onend', 'abort', 'start', 'stop', 
        'addEventListener', 'dispatchEvent', 'removeEventListener', 'constructor', 
        'when', '__zone_symbol__addEventListener', 
        '__zone_symbol__removeEventListener', '__zone_symbol__eventListeners', 
        '__zone_symbol__removeAllListeners', 'eventListeners', 
        'removeAllListeners', '__defineGetter__', '__defineSetter__', 
        'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 
        'propertyIsEnumerable', 'toString', 'valueOf', '__proto__', 
        'toLocaleString'];

    apiProperties: ApiProperty[] = [];

    // table columns
    displayedColumns: string[] = [
        'property',
        'type'
    ];

    constructor() {
        this.api = this.speechService.propertyMap;
        this.foundProperties = this.speechService.foundProperties;

        const dict: Record<string, ExpectedType> = {};
        this.expectedProperties.forEach(
            (property: string) => {
                dict[property] = 'expectedAndNotFound'; // init to not found for now
            }
        );

        this.foundProperties.forEach(
            (property: string) => {
                if (dict[property] === 'expectedAndNotFound') {
                    dict[property] = 'expectedAndFound';
                } else {
                    dict[property] = 'notExpected';
                }
            }
        );

        Object.keys(dict).sort().forEach(
            (key: string) => {
                this.apiProperties.push( 
                    { 
                        property: key, 
                        type: dict[key] 
                    } 
                ); 
            }
        )        
    }
}
