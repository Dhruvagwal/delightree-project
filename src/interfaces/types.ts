import { Audit } from './audit';

export type RootStackParamList = {
  Home: undefined;
  Audits: undefined;
  AuditDetail: { audit: Audit };
  CreateAudit: { audit?: Audit }; // Add audit property to CreateAudit route params
};
