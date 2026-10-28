export interface ExifData {
  make?: string;
  model?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  exposureTime?: string;
  iso?: number;
}

export interface IUserSummary {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  profileImageUrl?: string;
  role: 'user' | 'admin';
  createdAt?: string | Date;
}

export interface IPhotographSummary {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  imagePublicId?: string;
  owner: IUserSummary | string;
  exifData?: ExifData;
  createdAt: string | Date;
}

export interface PaginatedPhotosResponse {
  photos: IPhotographSummary[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  error?: string;
  data?: T;
}
