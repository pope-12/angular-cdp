import { UserInterface } from '../core/auth/user.interface';

export interface PlanInterface {
  id: number;
  createdAt: Date;
  assessorId: number;
  assessor: UserInterface;
  userId: number;
  overview: {
    technicalSkills: string;
    softSkills: string;
  };
}
