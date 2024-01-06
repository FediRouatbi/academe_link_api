import { MailTemplateEnum } from '../enums/mail-template.enum';

export interface ISendMail {
  to: string[] | string;

  subject: string;

  context?: any;

  template: MailTemplateEnum | string;
}
