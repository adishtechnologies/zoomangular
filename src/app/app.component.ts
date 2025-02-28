import { Component, OnInit } from '@angular/core';
import { ZoomMtg } from '@zoom/meetingsdk';
import { environment } from '../environments/environment';
import { ZoomService } from '../app/services/zoom/zoom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  meetings: any[] = [];
  meeting: any = {};

  constructor(private zoom: ZoomService) {}

  ngOnInit() {
   
    this.getMeetings();
  }

  async getMeetings() {
    try {
      const data: any = await this.zoom.getMeetings();
      console.log('Meetings data:', data);
      this.meetings = data?.meetings || [];
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  }

  async createMeeting() {
    try {
      const meetingData = {
        topic: 'Coding @Nagesh',
        type: 2, // Scheduled meeting
        startTime: new Date().toISOString(),
        duration: 10,
        timezone: 'UTC',
        settings: {
          host_video: true,
          participant_video: true,
        },
      };
      const role = 1; // 0 for attendee, 1 for host

      const data: any = await this.zoom.createMeeting(meetingData, role);
      console.log('Meeting created:', data);

      this.meeting = {
        meeting_id: data?.id,
        passcode: data?.password,
      };

      this.getMeetings();
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  }

  joinMeeting(meeting: any) {
    try {
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareWebSDK();

      const password = "Zoom123"
      this.meeting = {
        meeting_id: meeting?.id,
        passcode: password,
      };

      this.genSignature();
    } catch (error) {
      console.error('Error joining meeting:', error);
    }
  }

  

  genSignature(role: string = '0') {
    ZoomMtg.generateSDKSignature({
      meetingNumber: this.meeting.meeting_id,
      role: role, // 1 for hosting
      sdkKey: environment.zoom.client_id,
      sdkSecret: environment.zoom.client_secret,
      success: (signature: any) => {
        console.log('Generated Signature:', signature);
        this.startMeeting(signature);
      },
      error: (error: any) => {
        console.error('Signature Generation Error:', error);
      },
    });
  }

  startMeeting(signature: any) {
    const zoomRoot = document.getElementById('zmmtg-root');
    if (zoomRoot) {
      zoomRoot.style.display = 'block';
    }
    ZoomMtg.init({
      leaveUrl: 'http://localhost:4200',
      patchJsMedia: true,
      success: () => {
        ZoomMtg.join({
          signature: signature,
          sdkKey: environment.zoom.client_id,
          meetingNumber: this.meeting.meeting_id,
          passWord: "Zoom123",
          userName: 'Nagesh',
          userEmail: environment.zoom.userId,
          success: (result: any) => {
            console.log('Meeting joined:', result);
          },
          error: (error: any) => {
            console.error('Error joining meeting:', error);
          },
        });
      },
      error: (error: any) => {
        console.error('Zoom Initialization Error:', error);
      },
    });
  }
}
