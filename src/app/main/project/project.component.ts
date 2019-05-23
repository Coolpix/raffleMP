import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ProjectDashboardService } from './project.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import {FuseConfigService} from '../../../@fuse/services/config.service';
import {QueryRef} from 'apollo-angular/QueryRef';
import {R} from 'apollo-angular/types';
import {Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
    selector     : 'project-dashboard',
    templateUrl  : './project.component.html',
    styleUrls    : ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProjectDashboardComponent implements OnInit, OnDestroy
{

    fuseConfig: any;

    widgets: any;
    private gifts: Observable<any>;
    private data: Observable<any>;
    private roller: Observable<any>;
    private $roller: Subscription;

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ProjectDashboardService} _projectDashboardService
     * @param _fuseConfigService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _projectDashboardService: ProjectDashboardService,
        private _fuseConfigService: FuseConfigService
    )
    {
        this._fuseConfigService.config = {
            colorTheme      : 'theme-pink-dark',
            customScrollbars: true,
            layout: {
                style    : 'vertical-layout-1',
                width    : 'fullwidth',
                navbar   : {
                    primaryBackground  : 'fuse-navy-700',
                    secondaryBackground: 'fuse-navy-900',
                    folded             : false,
                    hidden             : true,
                    position           : 'left',
                    variant            : 'vertical-style-1'
                },
                footer   : {
                    customBackgroundColor: true,
                    background           : 'fuse-navy-900',
                    hidden               : true,
                    position             : 'below-fixed'
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to config change
        this._fuseConfigService.config.subscribe((config) => {
            this.fuseConfig = config;
        });
        this.getGifts();
        this.widgets = this._projectDashboardService.widgets[0];
    }

    // tslint:disable-next-line:typedef
    private getGifts() {
        this.gifts = this._projectDashboardService.getGifts().valueChanges.pipe(
            map(({data}) => data.gifts));
    }

// tslint:disable-next-line:typedef
    getRoller(id: any) {
       this.roller = this._projectDashboardService.getRollers().valueChanges.pipe(
            map(({data}) => {
                const result = data.rollers.filter(roller => roller.gift === null);
                const winner = result[this.getRandomArbitrary(0, result.length - 1)];
                // tslint:disable-next-line:no-shadowed-variable
                this._projectDashboardService.setGifts(id, winner.id).subscribe(({data}) => {
                    console.log(data);
                });
                this.$roller.unsubscribe();
            })
        );
       this.$roller = this.roller.subscribe();
    }

    ngOnDestroy(): void {
        this.$roller.unsubscribe();
    }

    // tslint:disable-next-line:typedef
    private getRandomArbitrary(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

