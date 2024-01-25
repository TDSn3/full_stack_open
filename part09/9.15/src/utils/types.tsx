export interface CourseName {
    name: string,
}




export interface Description {
  description: string;
}

export interface CoursePartBase extends Description {
  name: string;
  exerciseCount: number;
}




export interface CoursePartBasic extends CoursePartBase {
  kind: "basic"
}

export interface CoursePartGroup extends Omit<CoursePartBase, 'description'> {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: "background"
}

export interface CoursePartSpecial extends CoursePartBase {
  requirements: string[];
  kind: "special"
}



export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
