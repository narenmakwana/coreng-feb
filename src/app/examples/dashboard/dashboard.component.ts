import {Component, OnInit} from '@angular/core';
import {Commit, GithubService} from '../../shared/services/github.service';
import {Response} from '@angular/http';
import {SearchService} from '../../shared/services/search.service';

@Component({
  selector : 'c-dashboard',
  templateUrl : './dashboard.component.html',
  styleUrls : ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private commits: Commit[];
  private contributors: any[] = [];

  constructor(private _github: GithubService, private _search: SearchService) {
  }

  ngOnInit() {
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
}
