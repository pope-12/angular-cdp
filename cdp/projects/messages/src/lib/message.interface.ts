export interface MessageInterface {
 title?: string;
 body: string;
 duration?: number;
 class: 'warning' | 'danger' | 'success' | 'info';
 hidden?: boolean;
}
