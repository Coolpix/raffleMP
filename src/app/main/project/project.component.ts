import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ProjectDashboardService } from './project.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import {FuseConfigService} from '../../../@fuse/services/config.service';

@Component({
    selector     : 'project-dashboard',
    templateUrl  : './project.component.html',
    styleUrls    : ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProjectDashboardComponent implements OnInit
{
    projects: any[];
    selectedProject: any;

    widgets: any;

    fuseConfig: any;

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ProjectDashboardService} _projectDashboardService
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
        this.projects = this._projectDashboardService.projects;
        this.selectedProject = this.projects[0];
        this.widgets = this._projectDashboardService.widgets[0];
        // Subscribe to config change
        this._fuseConfigService.config
            .subscribe((config) => {
                this.fuseConfig = config;
            });
    }
}

