import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import 'lodash';
import 'd3';
import 'nvd3';
import { NvD3Component } from 'ng2-nvd3';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardGraphsComponent } from './dashboard-graphs/dashboard-graphs.component';
import { DashboardGraphService } from './dashboard-graphs/dashboard-graphs.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { TemplatesComponent } from './templates/templates.component';
import { CommunitiesComponent } from './communities/communities.component';
import { CommunitiesService } from './communities/communities.service';
import { TemplatesService } from './templates/templates.service';
import { ToolsComponent } from './tools/tools.component';
import { ToolService } from './tools/tools.service';
import { ToolsGraphComponent } from './tools-graph/tools-graph.component';
import { ToolsGraphService } from './tools-graph/tools-graph.service';
import { CommunityPageService } from './community-page/community-page.service';
import { CommunityPageComponent } from './community-page/community-page.component';
import { FootNoteComponent } from './foot-note/foot-note.component';
import { NavigationComponent } from './navigation/navigation.component';
import {SocketService} from './notifications/socket.service';
/*import { GraphSocketService } from './dashboard-graphs/dashboard-graph-socket.service';
*/

@NgModule({
  declarations: [
  AppComponent,
  DashboardComponent,
  DashboardGraphsComponent,
  NotificationsComponent,
  TemplatesComponent,
  CommunitiesComponent,
  ToolsComponent,
  ToolsGraphComponent,
  NvD3Component,
  CommunityPageComponent,
  FootNoteComponent,
  NavigationComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    ChartsModule
    ],
  providers: [ToolService, TemplatesService,
  DashboardGraphService,CommunitiesService, CommunityPageService,SocketService/*GraphSocketService,*/],
  bootstrap: [AppComponent /*,SocketService*/],

})
export class AppModule { }
