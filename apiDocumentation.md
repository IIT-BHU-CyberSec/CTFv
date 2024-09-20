Here's the documentation formatted in Markdown:

```markdown
# Challenges Routes Documentation

## Overview

The `challenges` routes handle the management of CTF challenges. These routes are protected by **JWT Authentication** and specific actions (such as creating, updating, and deleting challenges) are restricted to admins only. All requests must be authenticated with a valid JWT token.

## Authentication & Authorization

1. **JWT Authentication** is required for all routes. The token must be included in the request headers as:
```

Authorization: Bearer <token>

````

2. **Admin Authorization** is required for routes that modify challenges (create, update, delete). This is handled by the `adminMiddleware`, which checks if the authenticated user has admin privileges.

## Routes

### 1. Create a New Challenge

- **URL**: `/challenges/create`
- **Method**: `POST`
- **Authentication**: Required (Admin only)
- **Description**: Creates a new challenge. Only admins can perform this action.

- **Request Body**:
```json
{
 "name": "Challenge Name",
 "description": "Detailed description of the challenge",
 "url": "http://challenge.url",
 "points": 100,
 "author": "Author Name",
 "category": "Category Name",
 "flag": "challenge_flag"
}
````

- **Response**: Returns the created challenge.

  ```json
  {
    "id": 1,
    "name": "Challenge Name",
    "description": "Detailed description of the challenge",
    "url": "http://challenge.url",
    "points": 100,
    "author": "Author Name",
    "category": "Category Name",
    "flag": "challenge_flag"
  }
  ```

- **Errors**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `403 Forbidden`: If the user is not an admin.
  - `400 Bad Request`: If any required fields are missing.

---

### 2. Get All Challenges

- **URL**: `/challenges/read`
- **Method**: `POST`
- **Authentication**: Required
- **Description**: Retrieves all challenges, grouped by category. Non-admin users will not see the challenge flags.

- **Response**:

  ```json
  {
    "challenges": [
      {
        "category": "Category 1",
        "challenges": [
          {
            "id": 1,
            "name": "Challenge Name",
            "description": "Description",
            "url": "http://challenge.url",
            "points": 100,
            "author": "Author Name",
            "flag": null
          }
        ]
      },
      {
        "category": "Category 2",
        "challenges": [
          {
            "id": 2,
            "name": "Another Challenge",
            "description": "Description",
            "url": "http://another.url",
            "points": 200,
            "author": "Author Name",
            "flag": null
          }
        ]
      }
    ]
  }
  ```

- **Errors**:
  - `401 Unauthorized`: If the user is not authenticated.

---

### 3. Update a Challenge

- **URL**: `/challenges/update/:id`
- **Method**: `PUT`
- **Authentication**: Required (Admin only)
- **Description**: Updates an existing challenge by `id`. Only admins can perform this action.

- **Request Body**:

  ```json
  {
    "name": "Updated Challenge Name",
    "description": "Updated description",
    "url": "http://updated.url",
    "points": 150,
    "author": "Updated Author",
    "category": "Updated Category"
  }
  ```

- **Response**: Returns the updated challenge.

  ```json
  {
    "id": 1,
    "name": "Updated Challenge Name",
    "description": "Updated description",
    "url": "http://updated.url",
    "points": 150,
    "author": "Updated Author",
    "category": "Updated Category",
    "flag": "challenge_flag"
  }
  ```

- **Errors**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `403 Forbidden`: If the user is not an admin.
  - `404 Not Found`: If the challenge does not exist.

---

### 4. Delete a Challenge

- **URL**: `/challenges/delete/:id`
- **Method**: `DELETE`
- **Authentication**: Required (Admin only)
- **Description**: Deletes a challenge by `id`. Only admins can perform this action.

- **Response**: Returns the deleted challenge.

  ```json
  {
    "id": 1,
    "name": "Challenge Name",
    "description": "Description",
    "url": "http://challenge.url",
    "points": 100,
    "author": "Author Name",
    "category": "Category Name",
    "flag": "challenge_flag"
  }
  ```

- **Errors**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `403 Forbidden`: If the user is not an admin.
  - `404 Not Found`: If the challenge does not exist.

---

### 5. Submit a Flag for a Challenge

- **URL**: `/challenges/submit/:id`
- **Method**: `POST`
- **Authentication**: Required
- **Description**: Submits a flag for a specific challenge identified by `id`. Users can only submit a flag once per challenge.

- **Request Body**:

  ```json
  {
    "flag": "submitted_flag"
  }
  ```

- **Response**:

  ```json
  {
    "submission": {
      "id": 1,
      "timestamp": "2024-01-01T00:00:00Z",
      "isCorrect": true
    }
  }
  ```

- **Errors**:
  - `401 Unauthorized`: If the user is not authenticated.
  - `404 Not Found`: If the challenge does not exist.
  - `400 Bad Request`: If the user has already submitted a correct flag for this challenge.

---

### 6. Get User Submissions

- **URL**: `/challenges/submissions`
- **Method**: `GET`
- **Authentication**: Required
- **Description**: Retrieves all submissions made by the authenticated user. Admins will see all submissions.

- **Response**:

  ```json
  {
    "submissions": [
      {
        "id": 1,
        "userId": "user_id",
        "challengeId": "challenge_id",
        "input": "submitted_flag",
        "timestamp": "2024-01-01T00:00:00Z",
        "isCorrect": true
      }
    ]
  }
  ```

- **Errors**:
  - `401 Unauthorized`: If the user is not authenticated.

---

### 7. Get Leaderboard

- **URL**: `/challenges/leaderboard`
- **Method**: `GET`
- **Authentication**: Required
- **Description**: Retrieves the leaderboard showing users and their total points based on correct submissions.

- **Response**:

  ```json
  {
    "leaderboard": [
      {
        "userId": "user_id",
        "username": "user123",
        "totalPoints": 300
      }
    ]
  }
  ```

- **Errors**:
  - `401 Unauthorized`: If the user is not authenticated.

---
