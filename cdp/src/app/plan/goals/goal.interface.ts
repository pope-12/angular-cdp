interface GoalInterface {
  id?: number;
  createdAt: Date;
  goalDate: Date;
  completedDate?: Date;
  commitment: string;
  comments?: string;
}
