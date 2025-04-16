
// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Cryptocurrency types
export interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  image: string;
}

// AI Model types
export interface AIModel {
  id: string;
  name: string;
  description: string;
}

// Prediction types
export interface Prediction {
  cryptocurrency: string;
  model: string;
  predictedPrice: number;
  confidence: number;
  timestamp: Date;
}

// Form types
export interface PredictionFormData {
  cryptocurrencyId: string;
  modelId: string;
}
