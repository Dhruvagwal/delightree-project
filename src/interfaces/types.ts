import { Audit } from "./audit";

export type RootStackParamList = {
  Home: undefined;
  CreateAudit: undefined;
  AuditDetail: { audit: Audit };
};
