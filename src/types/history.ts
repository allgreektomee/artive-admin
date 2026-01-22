

/** 🚀 히스토리 생성 요청 규격 (DTO 대응) */
export interface HistoryCreateRequest {
  artworkId: number;
  imageUrl?: string;
  type: "MANUAL" | "YOUTUBE"|"INSTAGRAM"; // HistoryType Enum
  visibility: "PUBLIC" | "PRIVATE";
  
  // 다국어 필드 (서버 컨버터가 처리할 수 있도록 평면화)
  koTitle: string;
  koContent: string;
  enTitle?: string;
  enContent?: string;
}

/** 🚀 폼에서 사용할 타입 */
export type HistoryFormValues = Omit<HistoryCreateRequest, "imageUrl" | "visibility"> & {
  isPublic: boolean;
  imageFile?: any; // 업로드용
};


export interface HistoryDetailResponse { 
  id: number;
  imageUrl?: string;
  type: "MANUAL" | "YOUTUBE"|"INSTAGRAM";
  title:string;
  description: string;
  createdAt: string;
}
