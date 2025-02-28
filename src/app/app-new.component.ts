// import { Component, OnInit, Inject, NgZone } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { DOCUMENT } from '@angular/common';

// import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   standalone: false
// })
// export class AppComponent implements OnInit {

//   authEndpoint = 'http://localhost:4000'
// sdkKey = 'DnLnVTpYQRKSImN5RCIZnQ'
// meetingNumber = '83150982700'
// passWord = 'Zoom123'
// role = 0
// userName = 'Angular'
// userEmail = 'contactnaren@gmail.com'
// registrantToken = ''
// zakToken = 'eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6IlRPUlJfRk5TUVBhSmVTNkZoTDEtYVEiLCJ6aWQiOiI4NWEwNmQ0NDg1MWE0NjI1ODhmZGE0NzQ2NjcwYjdmYSIsImlzcyI6IndlYiIsInNrIjoiMCIsInN0eSI6MTAwLCJ3Y2QiOiJ1czA2IiwiY2x0IjowLCJleHAiOjE3NDAwNjMwODksImlhdCI6MTc0MDA1NTg4OSwiYWlkIjoiVlE3aWZUWURScDZVOHdMMUtGQS1PZyIsImNpZCI6IiJ9.GMhHqwUsWxUict7La2Hio0bDtgTbAtQ3sxSLdrBLlzM'

//   client = ZoomMtgEmbedded.createClient();

//   constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document: any, private ngZone: NgZone) {

//   }

//   ngOnInit() {
    
//   }

//   getSignature() {
//     this.httpClient.post(this.authEndpoint, {
// 	    meetingNumber: this.meetingNumber,
// 	    role: this.role
//     }).toPromise().then((data: any) => {
//       if(data.signature) {
//         console.log(data.signature)
//         this.startMeeting(data.signature)
//       } else {
//         console.log(data)
//       }
//     }).catch((error) => {
//       console.log(error)
//     })
//   }

//   startMeeting(signature: any) {

//     let meetingSDKElement = document.getElementById('meetingSDKElement')!;

//     this.ngZone.runOutsideAngular(() => {
//       this.client.init({zoomAppRoot: meetingSDKElement, language: 'en-US', patchJsMedia: true, leaveOnPageUnload: true}).then(() => {
//         this.client.join({
//           signature: signature,
//           sdkKey: this.sdkKey,
//           meetingNumber: this.meetingNumber,
//           password: this.passWord,
//           userName: this.userName,
//           userEmail: this.userEmail,
//           tk: this.registrantToken,
//           zak: this.zakToken
//         }).then(() => {
//           console.log('joined successfully')
//         }).catch((error) => {
//           console.log(error)
//         })
//       }).catch((error) => {
//         console.log(error)
//       })
//     })
//   }
// }
