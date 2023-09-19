import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  userName: string = '';
  documents: any[] = []; // Replace with your actual document model
  uploadMessage: string = '';
  userId: string = '';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch user data and documents from your backend API
    // Replace with actual API calls
    this.fetchUserData();
    this.fetchDocuments();
  }

  fetchUserData() {
    // Simulate fetching user data from the backend (replace with actual API call)
    // Replace with actual user data
    const token: any = localStorage.getItem('token');
    console.log(token);
    const decodedToken: any = jwt_decode(token);
    console.log('decoded', decodedToken);
    this.userId = decodedToken.userId;
    console.log(this.userId);
    this.userName = decodedToken.sub;
  }
  getFileExtension(filename: string): string | null {
    const lastIndex = filename.lastIndexOf('.');
    if (lastIndex === -1) {
      return null; // No file extension found
    }
    return filename.slice(lastIndex + 1);
  }
  fetchDocuments() {
    // Simulate fetching user's documents from the backend (replace with actual API call)
    // Here, you can extract the user ID from the token and use it in the API request
    const documentsApiUrl = `http://localhost:8094/documents/user/${this.userId}`;

    this.http.get<any[]>(documentsApiUrl).subscribe((response) => {
      this.documents = response;
    });
  }

  // Function to handle file selection and upload
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);
      console.log(file, this.userId);
      formData.append('userId', this.userId.toString()); // Include the userId

      // Send a POST request to upload the file
      this.http
        .post('http://localhost:8094/documents/upload', formData)
        .subscribe(
          (response: any) => {
            // Handle a successful upload response
            this.uploadMessage = 'File uploaded successfully.';
            // You can update the UI or display a success message here
            this.fetchDocuments(); // Refresh the document list after upload
          },
          (error) => {
            // Handle errors, such as network issues or server errors
            this.uploadMessage = 'Error uploading file.';
            console.log(error);
            // You can display an error message to the user here
          }
        );
    }
  }

  downloadDocument(documentId: number) {
    // Implement logic to download the selected document
    this.http
      .get('http://localhost:8094/documents/download/' + documentId, {
        responseType: 'arraybuffer', // Specify response type as array buffer
      })
      .subscribe(
        (response: ArrayBuffer) => {
          // Handle the downloaded document content
          this.handleDownloadedDocument(response, documentId);
        },
        (error) => {
          // Handle errors, e.g., display an error message
          console.error('Error downloading document:', error);
        }
      );
  }
  handleDownloadedDocument(content: ArrayBuffer, documentId: number) {
    const blob = new Blob([content], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'document_' + documentId + '.pdf'; // Set the desired filename
    a.click();
    window.URL.revokeObjectURL(url); // Release the object URL
  }

  uploadDocument() {}
}
