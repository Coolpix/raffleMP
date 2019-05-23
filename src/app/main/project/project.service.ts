import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Apollo, gql, QueryRef} from 'apollo-angular-boost';
import {R} from 'apollo-angular/types';

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
                                id
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
