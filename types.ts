
export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  codeUrl?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  readMoreUrl: string;
}

export interface Skill {
  id: number;
  name: string;
  imageUrl: string;
}
