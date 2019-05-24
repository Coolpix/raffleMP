import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {R} from 'apollo-angular/types';
import {Apollo, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class ProjectDashboardService
{
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param apollo
     */
    constructor(
        private _httpClient: HttpClient,
        private apollo: Apollo
    )
    {}

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
                    avatar
                    gift {
                        id
                        name
                        photo
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
                        photo
                        roller {
                            id
                            name
                            avatar
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
                            photo
                            roller {
                                id
                                name
                                avatar
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
