import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {Apollo, gql, QueryRef} from 'apollo-angular-boost';
import {R} from 'apollo-angular/types';

@Injectable()
export class ProjectDashboardService
{
    projects: QueryRef<any, R>;
    widgets: any[];

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private apollo: Apollo
    )
    {
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
     * Get Rollers
     *
     * @returns {QueryRef<any, R>;}
     */
    getRollers(): QueryRef<any, R> {
        return this.apollo.watchQuery<any>({
            // language=GraphQL
            query: gql`
            query {
                rollers {
                    id
                    name
                    gift {
                        id
                        name
                    }
                }
            }`,
        });
    }

    /**
     * Get Gifts
     *
     * @returns {QueryRef<any, R>;}
     */
    getGifts(): QueryRef<any, R> {
        return this.apollo.watchQuery<any>({
            // language=GraphQL
            query: gql`
                query {
                    gifts {
                        id
                        name
                        roller {
                            name
                        }
                    }
                }`,
        });
    }

    /**
     * Get Gifts
     *
     * @returns {QueryRef<any, R>;}
     */
    setGifts(id, rollerID): Observable<any> {
        return this.apollo.mutate({
            // language=GraphQL
            mutation: gql`
                mutation updateGift(
                        $id: ID!,
                        $rollerID: ID!
                    ){
                        updateGift(id: $id, rollerID: $rollerID) {
                            id
                            name
                            roller {
                                name
                            }
                        }
                    }`,
            variables: {
                id: id,
                rollerID: rollerID
            }
        });
    }
}
