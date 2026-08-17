# Engineering Document - Part 3: API Integrations

## 1. External API Endpoints
The application integrates with the following external endpoints hosted on `https://dummyjson.com`. 

*(Note: All Axios API calls must be wrapped in RTK `createAsyncThunk` functions to map network states to the Redux store).*

* **Authentication API (Auth Feature):**
  * `POST https://dummyjson.com/auth/login`
  * Headers: `Content-Type: application/json`
  * Request Body: `{ "username": "...", "password": "...", "expiresInMins": 60 }`
* **Products Catalog API (Products Feature):**
  * `GET https://dummyjson.com/products?limit=30`
* **Product Detail API (Products Feature):**
  * `GET https://dummyjson.com/products/{id}`
* **Category Query API (Optional / Extensible):**
  * `GET https://dummyjson.com/products/categories`