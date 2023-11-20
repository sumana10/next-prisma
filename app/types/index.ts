export type TCategory = {
  id: string;
  catName: string;
};

export type TPost = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publicId?: string;
  catName?: string;
  links: null | string[];
  createdAt: string;  // Corrected from createAt
  author: {
    name: string;
  };
  authorEmail: string;
};
