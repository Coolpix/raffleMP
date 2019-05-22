import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectDashboardService
{
    projects: any[];
    widgets: any[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        this.projects = [
            {
                'name': 'ACME Corp. Backend App'
            },
            {
                'name': 'ACME Corp. Frontend App'
            },
            {
                'name': 'Creapond'
            },
            {
                'name': 'Withinpixels'
            }
        ];
        this.widgets = [{
            'widget1'      : {
                'title' : 'Overdue',
                'data'  : {
                    'label': 'Mochila Powerslide',
                    'count': 4,
                    'extra': {
                        'label': 'Yesterday\'s overdue',
                        'count': 2
                    }
                },
                'detail': 'Laura Campos'
            },
            'widget2'      : {
                'title' : 'Overdue',
                'data'  : {
                    'label': 'Rodamientos Rollerblade',
                    'count': 4,
                    'extra': {
                        'label': 'Yesterday\'s overdue',
                        'count': 2
                    }
                },
                'detail': 'Laura Campos'
            },
            'widget3'      : {
                'title' : 'Issues',
                'data'  : {
                    'label': 'OPEN',
                    'count': 32,
                    'extra': {
                        'label': 'Closed today',
                        'count': 0
                    }
                },
                'detail': 'You can show some detailed information about this widget in here.'
            },
            'widget4'      : {
                'title' : 'Features',
                'data'  : {
                    'label': 'PROPOSALS',
                    'count': 42,
                    'extra': {
                        'label': 'Implemented',
                        'count': 8
                    }
                },
                'detail': 'You can show some detailed information about this widget in here.'
            }
        }];
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    /*resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProjects(),
                this.getWidgets()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }*/

    /**
     * Get projects
     *
     * @returns {Promise<any>}
     */
    getProjects(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/project-dashboard-projects')
                .subscribe((response: any) => {
                    this.projects = response;
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get widgets
     *
     * @returns {Promise<any>}
     */
    getWidgets(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/project-dashboard-widgets')
                .subscribe((response: any) => {
                    this.widgets = response;
                    resolve(response);
                }, reject);
        });
    }
}
