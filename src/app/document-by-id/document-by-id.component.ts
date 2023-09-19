import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-document-by-id',
  templateUrl: './document-by-id.component.html',
  styleUrls: ['./document-by-id.component.css'],
})
export class DocumentByIdComponent {
  userName: string = '';
  documents: any[] = []; // Replace with your actual document model
  uploadMessage: string = '';
  userId: string = '';
  user: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Fetch user data and documents from your backend API
    // Replace with actual API calls
    this.fetchUserData();
    this.fetchDocuments();
  }

  fetchUserData() {
    // Simulate fetching user data from the backend (replace with actual API call)
    // Replace with actual user data
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
      // Now you have the user ID and can load the user's documents accordingly
      console.log(this.userId);
    });
    this.http
      .get(`http://localhost:8094/employees/${this.userId}`)
      .subscribe((res) => {
        this.user = res;
      });
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
      console.log(response);
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
          (error: any) => {
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
  }
  uploadDocument() {}
}
