
# TruthSeeker News Verification App

A modern application for verifying the accuracy of news and information using the MERN stack (MongoDB, Express, React, and Node.js).

## Frontend (Current Implementation)

The current implementation includes a fully functional React frontend with:

- A clean, user-friendly interface for submitting text for verification
- Result display with visual indicators for true/false/unverified information
- Confidence scoring and explanation display
- Placeholder verification logic (frontend only)

## Backend Implementation (Next Steps)

To complete the MERN stack implementation, you'll need to:

1. **Set up MongoDB**
   - Create a MongoDB Atlas account or run MongoDB locally
   - Set up a database for storing verification results and user data
   - Create collections for `verifications`, `users`, and `sources`

2. **Create Express.js Backend**
   - Create a new Node.js project with Express
   - Set up middleware for CORS, body parsing, etc.
   - Implement authentication (optional)
   - Create API routes for verification

3. **Backend API Endpoints**
   - `POST /api/verify` - Submit text for verification
   - `GET /api/verifications` - Get past verifications
   - `GET /api/sources` - Get trusted sources

4. **Integration with AI/ML Services**
   - Connect to fact-checking APIs (e.g., Google Fact Check Tools)
   - Implement NLP for text analysis
   - Train/use ML models for verification

## Connecting Frontend to Backend

To connect this frontend to your backend:

1. Update the `apiService.ts` file to make real API calls to your Express backend
2. Replace the placeholder verification logic in `verificationService.ts` with calls to your API
3. Add environment variables for your API URL

## Getting Started with the Frontend

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

## Technologies Used

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend (to be implemented)**: Node.js, Express.js
- **Database (to be implemented)**: MongoDB
- **Authentication (optional)**: JWT

## Future Enhancements

- User accounts and history
- Browser extension for real-time verification
- Source reliability scoring
- Social media integration
