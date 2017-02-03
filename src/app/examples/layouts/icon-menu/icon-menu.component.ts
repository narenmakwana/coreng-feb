import {Component, OnInit, OnDestroy} from '@angular/core';
import {NavigationService} from '../../../navigation/navigation.service';

import {GithubService, Commit} from '../../../shared/services/github.service';
import {Response} from '../../../../../node_modules/@angular/http/src/static_response';

@Component({
  selector : 'c-icon-menu',
  templateUrl : '../../dashboard/dashboard.component.html', // Just show the dashboard
  styleUrls : ['../../dashboard/dashboard.component.scss']
})
export class IconMenuComponent implements OnInit, OnDestroy {
  private commits: Commit[];
  private contributors: any[] = [];
  private _previousStyle: {opened: string, closed: string} = {opened: 'side', closed: 'icon overlay'};

  constructor(private _navigation: NavigationService, private _github: GithubService) {
  }

  ngOnInit() {
    this._navigation.openSidenavStyle.take(1).subscribe(openStyle => {
      this._navigation.openSidenavStyle.take(1).subscribe(closedStyle => {
        this._previousStyle = {
          opened: openStyle,
          closed: closedStyle
        };
      });
    });
    this._navigation.setOpenSidenavStyle('icon');
    this._navigation.setClosedSidenavStyle('icon');
    this._github.recentCommits().subscribe(commits => {
      this.commits = commits.map(commit => {
        let index = commit.message.indexOf(':');
        if(index > -1) {
          commit.title = commit.message.substring(0, index + 1);
          commit.message = commit.message.substring(index + 1);
        } else {
          commit.title = commit.message;
          commit.message = '';
        }
        return commit;
      });
    });
    this._github.contributors().subscribe(contrib => {
      for (let i = 0; i < contrib.length && i < 10; i++) {
        this._github.get(contrib[i][0]).map((res: Response) => {
          let data: any = res.json();
          return {contributions : contrib[i][0], avatarUrl : data.avatar_url, username : data.login, bio : data.bio || 'No Bio', email : data.email || 'No Public Email', location : data.location || 'No Public Location', url : data.html_url};
        }).subscribe(author => {
          this.contributors.push(author);
        });
      }
    });
  }

  ngOnDestroy() {
    this._navigation.setOpenSidenavStyle(this._previousStyle.opened);
    this._navigation.setClosedSidenavStyle(this._previousStyle.closed);
  }

}
