import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IStream } from 'src/app/streams/models/stream.model'
import { mockStreams } from 'src/app/streams/models/stream.mock'
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  streams: IStream[];
  hello: string = "howdy";
  twitch_urls: string;

  constructor(
    // private streamService: StreamService
    private sanitizer: DomSanitizer
  ) { 
    this.sanitizer = sanitizer;
    this.streams = mockStreams;
    this.streams.forEach(stream => {
      // stream.streamUrl = "https://player.twitch.tv/?channel=" + stream.twitchUserName;
      console.log("stream.streamUrl is: " + `${stream.streamUrl}`)
      stream.href = "https://www.twitch.tv/" + stream.twitchUserName + "?tt_content=text_link&tt_medium=live_embed"
    });
    this.streams.forEach(stream => {
      stream.safeUrl = sanitizer.bypassSecurityTrustUrl(stream.streamUrl);
      stream.safeHref = sanitizer.bypassSecurityTrustUrl(stream.href);
    });
  }

  async ngOnInit() {
    // console.log("logging to console: hello");
    // this.streamService.getStreams()
    //   .then(streams => this.streams = streams)
  }

  // sanitizeUrl() {
    // return this.sanitizer.bypassSecurityTrustUrl(this.stream.streamUrl);
  // }
}


@Injectable({
  providedIn: 'root'
})
export class StreamService {
  private streamBaseUrl: string = `${environment.baseUrl}/streams`;

  constructor(
    private http: HttpClient
  ) { }

  async getStreams() : Promise<IStream[]>{
    const url = this.streamBaseUrl;
    try {
      return await this.http.get<IStream[]>(url).toPromise<IStream[]>();
    } catch {
      return Promise.resolve([]);
    }
  }

}