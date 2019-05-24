import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ProjectDashboardService } from './project.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import {FuseConfigService} from '../../../@fuse/services/config.service';
import { Observable, Subscription} from 'rxjs';
import { map} from 'rxjs/operators';

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
    private gifts: Subscription;
    private rollers: Observable<any>;
    private roller: Observable<any>;
    private $roller: Subscription;
    private arrayGifts: Observable<any>;

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
        this.getRollers();
    }

    // tslint:disable-next-line:typedef
    private getGifts() {
        this.gifts = this._projectDashboardService.getGifts().valueChanges.pipe(
            map(({data}) => data.gifts)).subscribe((gifts) => {
            console.log(gifts);
            this.arrayGifts = gifts;
        });
    }

    /*// tslint:disable-next-line:typedef
    private getGifts() {
        this.gifts = this._projectDashboardService.getGifts().valueChanges;
    }*/

    // tslint:disable-next-line:typedef
    private getRollers() {
        this.rollers = this._projectDashboardService.getRollers().valueChanges.pipe(
            map(({data}) => data.rollers));
    }

    // tslint:disable-next-line:typedef
    getRoller(id: any) {
       this.roller = this._projectDashboardService.getRollers().valueChanges.pipe(
            map(({data}) => {
                const result = data.rollers.filter(roller => roller.gift === null);
                const winner = result[this.getRandomInt(0, result.length)];
                // tslint:disable-next-line:no-shadowed-variable
                this._projectDashboardService.setGifts(id, winner.id).subscribe(({data}) => {
                    console.log(data, this.arrayGifts);
                    const index = this.searchInArray(this.arrayGifts, data.updateGift.id);
                    this.arrayGifts[index].roller = data.updateGift.roller;
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
    private getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // tslint:disable-next-line:typedef
    private searchInArray(obj, needle) {
        for (let i = 0; i < obj.length; i++){
            // tslint:disable-next-line:triple-equals
            if (obj[i].id == needle){
                return i;
            }
        }
    }
}

